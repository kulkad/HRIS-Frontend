'use client';

import React, { useContext } from 'react';
import MobileButtonNavigation from './leyout-sections/MobileButtonNavigation';
import MainSidebar from './leyout-sections/MainSidebar';
import MainHeader from './leyout-sections/MainHeader';
import { MenuContext } from '../context/MenuContext';
import { usePathname } from 'next/navigation';

const MainLayout = ({ children }) => {
  const { open } = useContext(MenuContext);
  const lessThanLg = typeof window !== 'undefined' ? window?.innerWidth < 1024 : false;
  const pathName = usePathname();

  return (
    <div className='min-h-screen bg-gray-200 dark:bg-slate-700'>
      {pathName !== '/login' && <MainSidebar />}
      {pathName !== '/login' && <MainHeader />}
      <div className={`${open && lessThanLg ? 'max-lg blur-xl pointer-events-none' : ''}`}>
        <main className='lg:ml-[280px]'>{children}</main>
      </div>
      <MobileButtonNavigation />
    </div>
  );
};

export default MainLayout;
