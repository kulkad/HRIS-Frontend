"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { SlOptionsVertical } from "react-icons/sl";

const DetailUser = () => {
  return (
    <div className="bg-white rounded-lg mx-4 p-4 text-xl">
      <p className="px-6 py-10 font-semibold">DETAIL USER</p>

      {/* Tampilan Untuk Laptop */}
      <div className="relative overflow-x-auto hidden sm:block">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
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
            <tr className="bg-white dark:bg-gray-800">
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
              <td className="px-6 py-4 font-medium text-gray-900">PKL</td>
              <td className="px-6 py-4 font-medium text-gray-900">
                jahdankopling@gmail.com
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">Laki-Laki</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tampilan Untuk Hp */}

      <div class="relative overflow-x-auto w-full flex sm:hidden">
        <div class=" p-4 leading-normal">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Ang Badarudin
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            angbadarudin@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailUser;
