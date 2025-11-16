"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import Link from "next/link";

export function SearchBar() {
  const [q, setQ] = useState("");
  const [suggests, setSuggests] = useState<{ label: string; href: string }[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(async () => {
      if (!q) {
        setSuggests([]);
        return;
      }
      // TODO: Replace with real API
      const demo = [
        { label: "Men T-Shirts", href: "/c/men-tshirts" },
        { label: "Marvel Collection", href: "/f/marvel" },
        { label: "Oversized Tees", href: "/c/oversized" },
      ];
      setSuggests(demo.filter((d) => d.label.toLowerCase().includes(q.toLowerCase())));
    }, 200);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="relative w-64">
      <input
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
        placeholder="Search products..."
        className="w-full border rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
      />
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      {open && suggests.length > 0 && (
        <div className="absolute mt-2 w-full bg-white shadow-xl rounded-lg p-2 border">
          {suggests.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="block px-3 py-2 hover:bg-gray-50 rounded text-sm"
            >
              {s.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
