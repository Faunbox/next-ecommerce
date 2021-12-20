import { useContext, createContext, useReducer } from "react";

const CardContext = createContext();

export function useCard() {
  return useContext(CardContext);
}

export const ACTION = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
};

const initialState = {
  cart: {
    cartItems: [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newItemToCart = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.name === newItemToCart.name
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItemToCart : item
          )
        : [...state.cart.cartItems, newItemToCart];
      return { ...state, cart: { ...state.cart.cartItems, cartItems } };
    case "REMOVE_FROM_CARD":
      return { ...state };
    default:
      return state;
  }
};

export function CardProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}
