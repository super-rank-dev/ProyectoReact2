import { createContext, useState } from "react";

export const Context = createContext();
export function CustomProvider({ children }) {
  const [productsAdded, setProductsAdded] = useState([]);

  function onAdd(product, quantity) {
    const isAlreadyAdded = isInCart(product);

    if (isAlreadyAdded) {
      const productToModify = productsAdded.find(
        (productsAdded) => productsAdded.id === product.id
      );

      const productModified = {
        ...productToModify,
        quantity: productToModify.quantity + quantity,
      };

      setProductsAdded((prevState) =>
        prevState.map((productsAdded) =>
          productsAdded.id === product.id ? productModified : productsAdded
        )
      );
    } else {
      setProductsAdded((prevState) =>
        prevState.concat({ ...product, quantity })
      );
    }
  }

  function removeItem(itemId) {
    setProductsAdded(productsAdded.filter(product => product.id !== itemId));
  }


  function clear() {
    setProductsAdded([]);
  }

  function isInCart(product) {
    return productsAdded.some((productAdded) => productAdded.id === product.id);
  }

  return (
    <Context.Provider value={{ productsAdded, onAdd, removeItem, clear }}>
      {children}
    </Context.Provider>
  );
}
