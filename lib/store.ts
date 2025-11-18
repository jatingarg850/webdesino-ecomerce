import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(
          (i) => i.id === item.id && i.size === item.size && i.color === item.color
        );
        
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id && i.size === item.size && i.color === item.color
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          };
        }
        
        return { items: [...state.items, item] };
      }),
      
      removeItem: (id, size, color) => set((state) => ({
        items: state.items.filter(
          (item) => !(item.id === id && item.size === size && item.color === color)
        ),
      })),
      
      updateQuantity: (id, size, color, quantity) => set((state) => ({
        items: state.items.map((item) =>
          item.id === id && item.size === size && item.color === color
            ? { ...item, quantity }
            : item
        ),
      })),
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      
      getItemCount: () => {
        const state = get();
        return state.items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

interface WishlistStore {
  items: string[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (id) => set((state) => {
        if (state.items.includes(id)) return state;
        return { items: [...state.items, id] };
      }),
      
      removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item !== id),
      })),
      
      isInWishlist: (id) => {
        const state = get();
        return state.items.includes(id);
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
