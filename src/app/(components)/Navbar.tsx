"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <div className="px-8 py-5 bg-white shadow flex items-center justify-end">
      <Link href="/cart">Корзина (1)</Link>
    </div>
  );
};

export default Navbar;
