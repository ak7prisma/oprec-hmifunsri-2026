"use client";

import Link from "next/link";

type NavLinkProps = {
  links: { name: string; href: string }[];
  className?: string;
};

export default function NavButton({ links, className }: Readonly<NavLinkProps>) {
  return (
    <div className={`${className} flex items-center gap-8`}>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className="relative group py-2 px-1"
        >
          <span className="text-sm font-medium text-slate-600 transition-colors duration-300 group-hover:text-primary">
            {link.name}
          </span>

          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
        </Link>
      ))}
    </div>
  );
}