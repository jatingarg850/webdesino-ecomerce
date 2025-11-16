import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartItem {
  productId: string;
  variantSku: string;
  title: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existing = state.items.find(i => i.variantSku === item.variantSku);
        if (existing) {
          return {
            items: state.items.map(i =>
              i.variantSku === item.variantSku
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          };
        }
        return { items: [...state.items, item] };
      }),
      removeItem: (sku) => set((state) => ({
        items: state.items.filter(i => i.variantSku !== sku)
      })),
      updateQuantity: (sku, quantity) => set((state) => ({
        items: state.items.map(i =>
          i.variantSku === sku ? { ...i, quantity } : i
        )
      })),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }),
    { 
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
