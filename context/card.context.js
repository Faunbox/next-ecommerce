import { useContext, createContext, useReducer } from "react";
import Cookies from "js-cookie";

const CardContext = createContext();

export function useCard() {
  return useContext(CardContext);
}

export const ACTION = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CARD",
  SET_STRIPE_SESSION_ID: "SET_STRIPE_SESSION_ID",
  SET_STRIPE_PUCHARSED_ITEMS: "SET_STRIPE_PUCHARSED_ITEMS",
  CLEAR_CARD_ITEMS: "CLEAR_CARD_ITEMS",
};
const getCartItemsCookie = Cookies.get("cartItems");
const setCartItemsCookie = (cartItems) => {
  return Cookies.set("cartItems", JSON.stringify(cartItems), {
    sameSite: "strict",
    expires: 14,
  });
};
const getSessionId = Cookies.get("sessionId");
const setSessionIdCookie = (id) => {
  return Cookies.set("sessionId", id, {
    sameSite: "strict",
    expires: 1,
  });
};

const initialState = {
  cart: {
    cartItems: getCartItemsCookie ? JSON.parse(getCartItemsCookie) : [],
  },
  checkout: {
    id: getSessionId ? getSessionId : "",
    pucharsedItems: null,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newItemToCart = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItemToCart._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItemToCart : item
          )
        : [...state.cart.cartItems, newItemToCart];
      setCartItemsCookie(cartItems);
      return { ...state, cart: { ...state.cart.cartItems, cartItems } };
    case "REMOVE_FROM_CARD": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      setCartItemsCookie(cartItems);
      return { ...state, cart: { ...state.cart.cartItems, cartItems } };
    }
    case "CLEAR_CARD_ITEMS": {
      Cookies.set("cartItems", []);
      return { ...state, cart: { cartItems: [] } };
    }
    case "SET_STRIPE_SESSION_ID": {
      const sessionId = action.payload;
      setSessionIdCookie(sessionId);
      return { ...state, checkout: { ...state.checkout, id: sessionId } };
    }
    case "SET_STRIPE_PUCHARSED_ITEMS": {
      const pucharsedItems = action.payload;
      return {
        ...state,
        checkout: { ...state.checkout, pucharsedItems: pucharsedItems },
      };
    }
    default:
      return state;
  }
};

export function CardProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}
