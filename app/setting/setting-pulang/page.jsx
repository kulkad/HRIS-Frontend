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
          <h1 className="text-xl font-semibold ml-2">Setting Jam Pulang</h1>
        </div>
        <div className="p-4">
          <ul className="space-y-4 dark:text-white">
            <div className="grid grid-rows-1">
              <label className="font-semibold">Karyawan : </label>
              <input type="text" name="" className="hover:border-sky-400" />
            </div>
            <div className="grid grid-rows-1">
              <label className="font-semibold">Magang : </label>
              <input type="text" name="" className="hover:border-sky-400"/>
            </div>
            <div className="grid grid-rows-1">
              <label className="font-semibold">PKL : </label>
              <input type="text" name="" className="hover:border-sky-400"/>
            </div>
            <input type="submit" value="Submit" className="bg-green-500 text-sky-50 hover:bg-green-700 focus:ring-2" />
          </ul>
        </div>
      </div>
  
);
};