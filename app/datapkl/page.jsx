import React from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BiSolidUserDetail } from "react-icons/bi";

const DataPKL = () => {
  return (
    <div className="bg-white rounded-lg mx-4 p-4 text-xl">
      <p className="mt-1 mb-4 font-semibold">DATA PKL</p>

      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Nama
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Jenis Kelamin
              </th>
              <th scope="col" class="px-6 py-3">
                Password
              </th>
              <th scope="col" class="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white dark:bg-gray-800">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Udin LinkedIn
              </th>
              <td class="px-6 py-4">Udin@gmail.com</td>
              <td class="px-6 py-4">Laki-Laki</td>
              <td class="px-6 py-4">test123#</td>
              <td class="px-6 py-4">
                <li className="flex justify-start items-center hover:bg-green-200 hover:text-gray-800 rounded-xl p-2">
                  <MdEdit className="mr-1" />
                  <a href="/">Edit</a>
                </li>
                <li className="flex justify-start items-center hover:bg-red-300 hover:text-gray-800 rounded-xl p-2">
                  <MdDelete className="mr-1" />
                  <a href="/">Delete</a>
                </li>
                <li className="flex justify-start items-center hover:bg-blue-200 hover:text-gray-800 rounded-xl p-2">
                  <BiSolidUserDetail te className="mr-1" />
                  <a href="/">Detail</a>
                </li>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataPKL;
