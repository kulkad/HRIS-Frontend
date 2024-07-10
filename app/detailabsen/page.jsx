import React from "react";

const DetailAbsen = () => {
  return (
    <div className="bg-white rounded-lg mx-4 p-4 text-xl">
      <p className="px-6 py-10 font-semibold text-center">DETAIL ABSENSI</p>
      <div className="flex justify-end col-span-2 bg-white p-2 rounded-lg mb-2 dark:bg-gray-600">
      </div>
      <div className="relative overflow-x-auto mt-5 border">
        <table className="w-full text-sm text-left rtl:text-right border-collapse border border-gray-200 dark:border-gray-600">
          <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 border-b">
                Foto
              </th>
              <th scope="col" className="px-6 py-3 border-b">
                Nama
              </th>
              <th scope="col" className="px-6 py-3 border-b">
                Role
              </th>
              <th scope="col" className="px-6 py-3 border-b">
                Waktu Masuk
              </th>
              <th scope="col" className="px-6 py-3 border-b">
                Keterangan
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:bg-gray-800">
              <td className="px-6 py-4 border-b"><img src="/assets/img/login.png" alt="" width={80} height={50}/></td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white border-b"
              >
                Jahdan Paku Bumi
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 border-b">PKL</td>
              <td className="px-6 py-4 font-medium text-gray-900 border-b">08.00</td>
              <td className="px-6 py-4 font-medium text-gray-900 border-b">Tepat waktu</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailAbsen;
