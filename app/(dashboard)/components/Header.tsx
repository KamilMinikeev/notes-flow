"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { StickyNote, Home, BarChart3, Icon } from "lucide-react";

const Header = () => {
  const pathname = usePathname();

  const links = [
    { href: "/home", label: "Главная", icon: Home },
    { href: "/emotions", label: "Эмоции", icon: BarChart3 },
  ];

  return (
    <header className="flex justify-between items-center py-4 px-8 border-b border-gray-400">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
            <StickyNote className="w-5 h-5 text-white" />
          </div>
          <h2 className="font-semibold text-lg">NotesFlow</h2>
        </div>
        <nav className="flex gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:text-white hover:bg-violet-500  ${
                  pathname === link.href ? "bg-violet-500 text-white" : ""
                } `}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
