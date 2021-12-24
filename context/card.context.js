import { useContext, createContext, useReducer } from "react";
import Cookies from "js-cookie";

const CardContext = createContext();

export function useCard() {
  return useContext(CardContext);
}

export const ACTION = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CARD",
};
const getCartItemsCookie = Cookies.get("cartItems");
const setCartItemsCookie = (cartItems) => {
  return Cookies.set("cartItems", JSON.stringify(cartItems));
};

const initialState = {
  cart: {
    cartItems: getCartItemsCookie ? JSON.parse(getCartItemsCookie) : [],
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
    default:
      return state;
  }
};

export function CardProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}
