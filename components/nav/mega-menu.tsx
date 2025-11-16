"use client";

import Link from "next/link";
import { useState } from "react";

export function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menCategories = {
    topwear: [
      { name: "T-Shirts", href: "/c/men-tshirts" },
      { name: "Oversized T-Shirts", href: "/c/men-oversized" },
      { name: "Shirts", href: "/c/men-shirts" },
      { name: "Hoodies", href: "/c/men-hoodies" },
      { name: "Sweatshirts", href: "/c/men-sweatshirts" },
      { name: "Jackets", href: "/c/men-jackets" },
    ],
    bottomwear: [
      { name: "Joggers", href: "/c/men-joggers" },
      { name: "Shorts", href: "/c/men-shorts" },
      { name: "Pants", href: "/c/men-pants" },
    ],
    winterwear: [
      { name: "Hoodies", href: "/c/men-hoodies" },
      { name: "Sweatshirts", href: "/c/men-sweatshirts" },
      { name: "Jackets", href: "/c/men-jackets" },
      { name: "Shackets", href: "/c/men-shackets" },
    ],
  };

  const womenCategories = {
    topwear: [
      { name: "T-Shirts", href: "/c/women-tshirts" },
      { name: "Oversized T-Shirts", href: "/c/women-oversized" },
      { name: "Crop Tops", href: "/c/women-crop-tops" },
      { name: "Hoodies", href: "/c/women-hoodies" },
      { name: "Sweatshirts", href: "/c/women-sweatshirts" },
    ],
    bottomwear: [
      { name: "Joggers", href: "/c/women-joggers" },
      { name: "Shorts", href: "/c/women-shorts" },
      { name: "Pants", href: "/c/women-pants" },
    ],
    dresses: [
      { name: "Dresses", href: "/c/women-dresses" },
      { name: "Co-ord Sets", href: "/c/women-coord" },
    ],
  };

  return (
    <div className="hidden lg:block border-b bg-gray-50">
      <div className="container">
        <div className="flex items-center justify-center gap-8 py-3 text-sm">
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("men")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <Link href="/c/men" className="font-medium hover:text-red-600">
              MEN
            </Link>
            {activeMenu === "men" && (
              <div className="absolute left-0 top-full mt-3 bg-white shadow-xl rounded-lg p-6 w-[600px] z-50">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-bold mb-3 text-xs uppercase tracking-wide text-gray-900">
                      Topwear
                    </h4>
                    <ul className="space-y-2">
                      {menCategories.topwear.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="text-sm text-gray-600 hover:text-red-600"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3 text-xs uppercase tracking-wide text-gray-900">
                      Bottomwear
                    </h4>
                    <ul className="space-y-2">
                      {menCategories.bottomwear.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="text-sm text-gray-600 hover:text-red-600"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3 text-xs uppercase tracking-wide text-gray-900">
                      Winterwear
                    </h4>
                    <ul className="space-y-2">
                      {menCategories.winterwear.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="text-sm text-gray-600 hover:text-red-600"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setActiveMenu("women")}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <Link href="/c/women" className="font-medium hover:text-red-600">
              WOMEN
            </Link>
            {activeMenu === "women" && (
              <div className="absolute left-0 top-full mt-3 bg-white shadow-xl rounded-lg p-6 w-[600px] z-50">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-bold mb-3 text-xs uppercase tracking-wide text-gray-900">
                      Topwear
                    </h4>
                    <ul className="space-y-2">
                      {womenCategories.topwear.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="text-sm text-gray-600 hover:text-red-600"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3 text-xs uppercase tracking-wide text-gray-900">
                      Bottomwear
                    </h4>
                    <ul className="space-y-2">
                      {womenCategories.bottomwear.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="text-sm text-gray-600 hover:text-red-600"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-3 text-xs uppercase tracking-wide text-gray-900">
                      Dresses & Sets
                    </h4>
                    <ul className="space-y-2">
                      {womenCategories.dresses.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="text-sm text-gray-600 hover:text-red-600"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href="/c/sneakers" className="font-medium hover:text-red-600">
            SNEAKERS
          </Link>
          <Link href="/new" className="font-medium text-red-600 hover:text-red-700">
            NEW ARRIVALS
          </Link>
          <Link href="/bestsellers" className="font-medium hover:text-red-600">
            BESTSELLERS
          </Link>
          <Link href="/official-merch" className="font-medium hover:text-red-600">
            OFFICIAL MERCH
          </Link>
        </div>
      </div>
    </div>
  );
}
