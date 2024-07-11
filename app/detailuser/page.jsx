import React from "react";
import Image from "next/image";

const DetailUser = () => {
  return (
    <div className="bg-white rounded-lg mx-4 p-4 text-xl">
      <p className="px-6 py-10 font-semibold">DETAIL USER</p>

      <div className="relative overflow-x-auto">
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
                  className="w-8 h-8"
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
              <td className="px-6 py-4 font-medium text-gray-900">
                PKL
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">
                jahdankopling@gmail.com
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">
                Laki-Laki
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailUser;
