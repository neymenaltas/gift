import React, { useContext } from "react";
import { productsReducer, initialState } from "../reducers/Products";

const ProductsContext = React.createContext({
  state: initialState,
  dispatch: () => initialState,
});

export function ProductsProvider(props) {
  const [state, dispatch] = React.useReducer(productsReducer, initialState);
  return <ProductsContext.Provider value={{ state, dispatch }} {...props} />;
}

export default function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error(`useProducts must be used within an ProductsProvider`);
  }
  return context;
}
