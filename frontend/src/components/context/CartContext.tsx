import React, { useState, createContext, ReactNode } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cart: Product[];
  isInCart: (id: number) => boolean;
  removeItem: (id: number) => void;
  clearCart: () => void;
  addItem: (item: Product, quantity: number) => void;
  totalPrice: () => number;
  totalProducts: () => number;
};

export const CartContext = createContext<CartContextType>({
  cart: [],
  isInCart: () => false,
  removeItem: () => {},
  clearCart: () => {},
  addItem: () => {},
  totalPrice: () => 0,
  totalProducts: () => 0,
});

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addItem = (item: Product, quantity: number) => {
    if (isInCart(item.id)) {
      setCart((prevCart) =>
        prevCart.map((product) =>
          product.id === item.id ? { ...product, quantity: product.quantity + quantity } : product
        )
      );
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const removeItem = (id: number) => {
    const cartUpdate = cart.filter((prod) => prod.id !== id);
    setCart(cartUpdate);
  };

  const isInCart = (id: number) => {
    return cart.some((prod) => prod.id === id);
  };

  const totalPrice = () => {
    return cart.reduce((prev, act) => prev + act.quantity * act.price, 0);
  };

  const totalProducts = () => {
    return cart.reduce((acc, productAct) => acc + productAct.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isInCart,
        removeItem,
        clearCart,
        addItem,
        totalPrice,
        totalProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
