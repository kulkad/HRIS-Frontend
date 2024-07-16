"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";

const DetailUser = () => {
  return (
    <div className="bg-white rounded-lg mx-4 p-4 text-xl dark:bg-slate-900 dark:text-white">
      

      {/* Tampilan Untuk Laptop */}
      
      <div className="relative overflow-x-auto hidden sm:block">
      <p className="px-6 py-10 font-semibold">DETAIL USER</p>
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-gray-900 uppercase dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto
              </th>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Jenis Kelamin
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-slate-900">
              <td className="px-6 py-4">
                <img
                  className="w-24 h-18"
                  src="/assets/images/windah.jpg"
                  alt="user photo"
                />
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Jahdan Kopling
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">PKL</td>
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                jahdankopling@gmail.com
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Laki-Laki</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tampilan Untuk Hp */}

      <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 sm:hidden">
        <div class="flex justify-start px-4 pt-4">
        <Link href="/profile">
            <li className="flex items-center py-3">
              <IoIosArrowBack className="mr-1"/>
            </li>
          </Link>
        </div>
        <div class="flex flex-col items-center pb-10">
          <img
            class="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="/assets/images/windah.jpg"
            alt="Bonnie image"
          />
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Jahdan Kopling
          </h5>
          <span class="text-lg text-gray-500 dark:text-gray-400">
            PKL
          </span>
          <div class="mt-4 md:mt-6">
            <div className="mb-5">
            <label className="font-semibold text-sm">Email  : </label>
            <p className="font-semibold">Jahdankopling@gmail.com</p>
            </div>
            <div> 
            <label className="font-semibold text-sm">Gender  :</label>
            <p className="font-semibold">Laki-laki</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailUser;
