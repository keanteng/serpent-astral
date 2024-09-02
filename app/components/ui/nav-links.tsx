'use client';

import {
  HomeIcon,
  ShoppingBagIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Employees',
    href: '/dashboard/employees',
    icon: UserGroupIcon,
  },
  {
    name: 'Products',
    href: '/dashboard/products',
    icon: ShoppingBagIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx("flex h-[45px] grow items-center justify-center gap-2 rounded-md bg-black p-3 text-white text-sm font-medium hover:bg-yellow-500 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3",
              {
                'bg-yellow-500 text-black': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}