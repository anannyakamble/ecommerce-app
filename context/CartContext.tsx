import React, { createContext, useState, ReactNode } from 'react';

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cartItems: Product[];
  wishlistItems: Product[];
  addToCart: (product: Omit<Product, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  toggleWishlist: (product: Omit<Product, 'quantity'>) => void;
  isInWishlist: (id: number) => boolean;
};

const defaultValue: CartContextType = {
  cartItems: [],
  wishlistItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  increaseQty: () => {},
  decreaseQty: () => {},
  toggleWishlist: () => {},
  isInWishlist: () => false,
};

export const CartContext = createContext<CartContextType>(defaultValue);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  const addToCart = (product: Omit<Product, 'quantity'>) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQty = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleWishlist = (product: Omit<Product, 'quantity'>) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const isInWishlist = (id: number) => {
    return wishlistItems.some((item) => item.id === id);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
