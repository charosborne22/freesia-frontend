import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  // State d'application
  const [showCart, setShowCart] = useState(false);
  const [qty, setQty] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantitites] = useState(0);

  // Augmenter la quantité de produit
  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  // Diminiuer la quantité de produit
  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 0) return 1;
      return prevQty - 1;
    });
  };

  // Ajouter produit au panier
  const onAdd = (produit, quantitie) => {
    // Prix total
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + produit.prix * quantitie
    );

    // Augmenter la quantité totale
    setTotalQuantitites(
      (prevTotalQuantities) => prevTotalQuantities + quantitie
    );

    // Verifier si le produit est déjà dans le panier
    const exist = cartItems.find((item) => item.slug === produit.slug);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.slug === produit.slug
            ? { ...exist, quantitie: exist.quantitie + quantitie }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...produit, quantitie: quantitie }]);
    }
  };

  //Retirer produit du panier
  const onRemove = (produit) => {
    //Prix total
    setTotalPrice((prevTotalPrice) => prevTotalPrice - produit.prix);

    //Retirer de quantité totale
    setTotalQuantitites((prevTotalQuantities) => prevTotalQuantities - 1);

    // Verifier si le produit est déjà dans le panier
    const exist = cartItems.find((item) => item.slug === produit.slug);
    if (exist.quantitie === 1) {
      setCartItems(cartItems.filter((item) => item.slug !== produit.slug));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.slug === produit.slug
            ? { ...exist, quantitie: exist.quantitie - 1 }
            : item
        )
      );
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        qty,
        setQty,
        increaseQty,
        decreaseQty,
        onAdd,
        onRemove,
        totalPrice,
        totalQuantities,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
