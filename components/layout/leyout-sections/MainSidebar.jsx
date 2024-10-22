import React, { useContext } from "react";
import { useState } from "react";
import Link from "next/link";

import { FaCamera } from "react-icons/fa";
import { FaUser, FaClock } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { AiOutlineHome, AiOutlineClose } from "react-icons/ai";
import { RiLogoutBoxLine } from "react-icons/ri";
import { SiHelpscout, SiSinglestore } from "react-icons/si";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";
import { MenuContext } from "@/context/MenuContext";

const MainSidebar = () => {
  const { open, toggle } = useContext(MenuContext);

  const closeSeideBarHandler = () => {
    toggle();
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdownHandler = () => {
    setIsOpen(false);
  };

  return (
    <aside
      className={`bg-white dark:bg-slate-600 dark:text-white top-4 left-4 lg:fixed lg:block lg:top-16 lg:left-8 rounded-lg overflow-hidden transition-all duration-200 ${
        open ? "w-60 p-4 block fixed" : "w-0 hidden"
      } lg:w-60 lg:p-4 max-lg:z-20 shadow-sm`}
    >
      <ul>
        <li className="flex justify-end items-center lg:hidden">
          <AiOutlineClose
            onClick={closeSeideBarHandler}
            className="text-red-500 hover:text-red-800 cursor-pointer"
          />
        </li>

        <Link href="/" onClick={closeSeideBarHandler}>
          <li className="flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2">
            <IoHome className="mr-2" />
            Beranda
          </li>
        </Link>

        <button
          onClick={toggleDropdown}
          className="flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2"
        >
          <FaUser className="mr-2" />
          Data Pengguna
          {isOpen ? (
            <AiOutlineCaretUp className="ml-2" />
          ) : (
            <AiOutlineCaretDown className="ml-2" />
          )}
        </button>

        {isOpen && (
          <div className="flex right-0 mt-2 w-32 bg-white shadow-lg rounded-xl z-10 dark:bg-gray-800">
            <ul className="py-1">
              <Link href="/datamanager" onClick={closeDropdownHandler}>
                <li className="flex justify-start items-center hover:bg-teal-100 hover:text-black rounded-xl p-2 w-full cursor-pointer">
                  <FaUser className="mr-2" />
                  Manager
                </li>
              </Link>
              <Link href="/datakaryawan" onClick={closeDropdownHandler}>
                <li className="flex justify-start items-center hover:bg-teal-100 hover:text-black rounded-xl p-2 w-full cursor-pointer">
                  <FaUser className="mr-2" />
                  Karyawan
                </li>
              </Link>
              <Link href="/datamagang" onClick={closeDropdownHandler}>
                <li className="flex justify-start items-center hover:bg-teal-100 hover:text-black rounded-xl p-2 w-full cursor-pointer">
                  <FaUser className="mr-2" />
                  Magang
                </li>
              </Link>
              <Link href="/datapkl" onClick={closeDropdownHandler}>
                <li className="flex justify-start items-center hover:bg-teal-100 hover:text-black rounded-xl p-2 w-full cursor-pointer">
                  <FaUser className="mr-2" />
                  PKL
                </li>
              </Link>
            </ul>
          </div>
        )}

        <Link href="data-absensi" onClick={closeSeideBarHandler}>
          <li className="flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2">
            <FaClock className="mr-2" />
            Data Absensi
          </li>
        </Link>

        <hr className="mt-5 mb-5 border-black border-1" />
        <Link href="/logout" onClick={closeSeideBarHandler}>
          <li className="flex justify-start items-center hover:bg-red-300 hover:text-gray-800 rounded-xl p-2">
            <RiLogoutBoxLine className="mr-2 shadow-lg" size={20} />
            Keluar
          </li>
        </Link>
      </ul>
    </aside>
  );
};

export default MainSidebar;
