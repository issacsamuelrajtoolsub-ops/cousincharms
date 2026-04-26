'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { toast } from 'sonner';

export type CartItem = { id: string; qty: number };

type StoreContext = {
  cart: CartItem[];
  cartCount: number;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  compareSet: Set<string>;
  toggleCompare: (id: string) => void;
};

const Ctx = createContext<StoreContext | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([
    { id: 'heart', qty: 1 },
    { id: 'moon', qty: 1 },
  ]);
  const [cartOpen, setCartOpen] = useState(false);
  const [compareSet, setCompareSet] = useState<Set<string>>(new Set(['heart', 'moon']));

  const addToCart = useCallback((id: string, qty = 1) => {
    setCart((prev) => {
      const ex = prev.find((x) => x.id === id);
      if (ex) return prev.map((x) => (x.id === id ? { ...x, qty: x.qty + qty } : x));
      return [...prev, { id, qty }];
    });
    toast.success("Added — it's in the bag.");
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleCompare = useCallback((id: string) => {
    setCompareSet((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }, []);

  const value = useMemo<StoreContext>(
    () => ({
      cart,
      cartCount: cart.reduce((a, x) => a + x.qty, 0),
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      addToCart,
      removeFromCart,
      clearCart,
      compareSet,
      toggleCompare,
    }),
    [cart, cartOpen, compareSet, addToCart, removeFromCart, clearCart, toggleCompare],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useStore must be used within StoreProvider');
  return v;
}
