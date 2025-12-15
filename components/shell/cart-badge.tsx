'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/store';

export function CartBadge() {
  const [mounted, setMounted] = useState(false);
  const cartCount = useCartStore((state) => state.getItemCount());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || cartCount === 0) {
    return null;
  }

  return (
    <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold">
      {cartCount}
    </span>
  );
}
