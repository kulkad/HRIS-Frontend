import React from 'react';
import { usePathname } from 'next/navigation';

// icons
import { BiHeart } from 'react-icons/bi';
import { FiSearch, FiUser } from 'react-icons/fi';
import { MdHome, MdOutlineAddBox } from 'react-icons/md';
import { HiDocumentAdd } from "react-icons/hi";
import { FaUserCheck } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import Link from 'next/link';

const navButtonsList = [
  { id: 1, label: 'Home', icon: < HiDocumentAdd />, path: '/daftarabsen' },
  { id: 2, label: 'Search', icon: <FaUserCheck />, path: '/halaman-absen' },
  { id: 3, label: 'Add', icon: <MdHome/>, path: '/' },
  { id: 4, label: 'Favorites', icon: <FaTasks />, path: '/data-absensi' },
  { id: 5, label: 'User Area', icon: <FiUser />, path: '/profile' },
];

const MobileButtonNavigation = () => {
  const path = usePathname();

  return (
    <div className='fixed bottom-0 left-0 right-0 w-full h-12 bg-white sm:hidden dark:bg-gray-800'>
      <div className='flex justify-around items-center h-12 gap-x-3 border-t-2 border-t-gray-200'>
        {navButtonsList.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className={`text-3xl ${path === item.path ? 'text-gray-800' : 'text-gray-400'}`}
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileButtonNavigation;
