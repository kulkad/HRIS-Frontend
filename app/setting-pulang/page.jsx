"use client";

import { FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import AOS from "aos";
import { FaUser } from "react-icons/fa";
import "aos/dist/aos.css";

export default function HalamanData() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
    });
  }, []);

  const menuItems = [
    { icon: FaUser, text: "Data Manager", link: "/datamanager" },
    { icon: FaUser, text: "Data Karyawan", link: "/datakaryawan" },
    { icon: FaUser, text: "Data Magang", link: "/datamagang" },
    { icon: FaUser, text: "Data PKL", link: "/datapkl" },
  ];

return (
  <div
    className="w-full dark:bg-slate-900 dark:text-white max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
    data-aos="fade-up"
  >
        <div className="p-4 border-b flex items-center">
          <Link href="/">
            <li className="flex items-center py-3">
              <IoIosArrowBack className="mr-1"/>
            </li>
          </Link>
          <h1 className="text-xl font-semibold">Data Pengguna</h1>
        </div>
        <div className="p-4">
          <ul className="space-y-4 dark:text-white">
            {menuItems.map((item, index) => (
              <li key={index} className="flex items-center justify-between">
                <Link href={item.link || "#"} passHref>
                  <div className="flex items-center space-x-4">
                    <item.icon className="text-2xl text-gray-700 dark:text-white" />
                    <div>
                      <p className="font-semibold">{item.text}</p>
                      {item.description && (
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
                {!item.new && <FaChevronRight className="text-gray-400" />}
              </li>
            ))}
          </ul>
        </div>
      </div>
  
);
};