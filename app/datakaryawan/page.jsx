"use client";

import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { BiSolidUserDetail } from "react-icons/bi";
import { SlOptionsVertical } from "react-icons/sl";
import { MdInsertEmoticon } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DataMagang = () => {
  const [user, setUser] = useState(null);
  const [usersByRole, setUsersByRole] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const role = "Karyawan";
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [userToDelete, setUserToDelete] = useState(null); // State for the user to delete

  const openDeleteModal = (uuid) => {
    setUserToDelete(uuid);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setUserToDelete(null);
    setShowModal(false);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteProduk(userToDelete);
      closeDeleteModal();
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      window.location.href = "http://localhost:3000/login";
    } else {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const fetchUsersByRole = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/userbyrole/${role}`,
          {
            withCredentials: true,
          }
        );
        setUsersByRole(response.data);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsersByRole();
  }, []);

  const deleteProduk = async (uuid) => {
    try {
      await axios.delete(`http://localhost:5001/users/${uuid}`);
      const response = await axios.get(
        `http://localhost:5001/userbyrole/${role}`,
        {
          withCredentials: true,
        }
      );
      setUsersByRole(response.data);
      setSuccessMessage("User berhasil dihapus.");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDropdown = (uuid) => {
    setOpenDropdown((prevOpenDropdown) =>
      prevOpenDropdown === uuid ? null : uuid
    );
  };

  const closeDropdownHandler = () => {
    setOpenDropdown(null);
  };

  if (!user) {
    return (
      <div className="w-full bg-white dark:bg-slate-900 dark:text-white max-w-md mx-auto rounded-lg shadow-md overflow-hidden md:max-w-2xl p-4">
        <Skeleton height={40} count={1} className="mb-4" />
        <Skeleton height={20} count={1} className="mb-4" />
        <Skeleton height={20} count={1} className="mb-4" />
        <Skeleton height={50} width={150} className="mb-4" />
        <Skeleton height={50} width={150} className="mb-4" />
      </div>
    );
  }

  // Calculating the users to be displayed on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersByRole.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white dark:bg-slate-900 dark:text-white rounded-lg mx-4 p-4 text-xl sm:block ">
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      {/* Tampilkan pesan jika ada */}
      <div className="relative overflow-x-auto hidden sm:block">
        <div className="grid grid-cols-3 gap-4">
          <p className="px-4 py-6 font-semibold">DATA KARYAWAN</p>
          <div className="flex justify-end col-span-2 bg-white p-5 rounded-lg mb-2 dark:bg-slate-90">
            <Link
              key={user.uuid}
              href={`/tambahdata/?role=Manager`}
              className="bg-green-400 hover:bg-green-600 rounded-xl w-36 h-11 text-center py-1"
            >
              Tambah Data
            </Link>
          </div>
        </div>
        {usersByRole.length === 0 ? (
          <p className="text-center py-4">Tidak ada data</p>
        ) : (
          <table className="w-full text-sm text-left text-gray-500 dark:bg-slate-900 dark:text-white">
            <thead className="text-xs text-gray-900 uppercase">
              <tr>
                <th className="px-6 py-3">Nama</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.uuid} className="bg-white dark:bg-gray-800">
                  <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/edit-data/${user.uuid}`}
                      className="flex items-center hover:bg-green-200 hover:text-gray-800 rounded-xl p-2 w-full"
                    >
                      <MdEdit className="mr-1" /> Edit
                    </Link>
                    <button
                      onClick={() => {
                        openDeleteModal(user.uuid);
                        closeDropdownHandler();
                      }}
                      className="flex items-center hover:bg-red-300 hover:text-gray-800 rounded-xl p-2 w-full"
                    >
                      <MdDelete className="mr-1" /> Delete
                    </button>
                    <Link
                      href={`/detailuser/${user.uuid}`}
                      className="flex items-center hover:bg-blue-200 hover:text-gray-800 rounded-xl p-2 w-full"
                    >
                      <BiSolidUserDetail className="mr-1" /> Detail
                    </Link>
                    <Link
                      key={user.uuid}
                      href={`/daftarabsen/${user.uuid}?role=${user.role}`}
                      className="flex items-center hover:bg-blue-200 hover:text-gray-800 rounded-xl p-2 w-full"
                    >
                      {user.url_foto_absen == null ? (
                        <>
                          <MdInsertEmoticon className="mr-1" /> Daftar Muka
                        </>
                      ) : (
                        <span>Muka Sudah Terdaftar</span>
                      )}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <nav>
            <ul className="inline-flex items-center -space-x-px">
              {[
                ...Array(Math.ceil(usersByRole.length / usersPerPage)).keys(),
              ].map((number) => (
                <li key={number} className="px-2">
                  <button
                    onClick={() => paginate(number + 1)}
                    className={`px-3 py-2 leading-tight text-gray-500 bg-gray-100 border border-gray-300 hover:bg-sky-100 hover:text-gray-700 rounded-xl dark:hover:bg-sky-200 dark:bg-gray-50 ${
                      currentPage === number + 1 ? "bg-gray-300" : ""
                    }`}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Tampilan untuk layar kecil */}
      <div className="bg-white min-h-screen flex flex-col rounded-lg mx-2 p-3 text-xl dark:bg-slate-900 sm:hidden">
        <div className="flex gap-4">
          <Link href="/halaman-data">
            <li className="flex py-10 items-center sm:hidden">
              <IoIosArrowBack className="mr-1 ml-1" />
            </li>
          </Link>
          <p className="py-6 font-semibold">DATA KARYAWAN</p>
          <div className="flex justify-end bg-white p-5 rounded-lg mb-2 dark:bg-slate-900 mt-3">
            <Link
              key={user.uuid}
              href={`/tambahdata/?role=Manager`}
              className="bg-green-400 hover:bg-green-600 rounded-xl w-36 h-11 text-center py-1"
            >
              Tambah Data
            </Link>
          </div>
        </div>
        {usersByRole.length === 0 ? (
          <p className="text-center py-4 sm:hidden">Tidak ada data</p>
        ) : (
          currentUsers.map((user) => (
            <div
              key={user.uuid}
              className="flex justify-between items-center mt-5 border border-gray-500 p-5 rounded-xl relative"
            >
              <div>
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {user.name}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
              <div>
                <button
                  onClick={() => toggleDropdown(user.uuid)}
                  className="flex justify-end items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2"
                >
                  <SlOptionsVertical className="mr-2" />
                </button>
                {openDropdown === user.uuid && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl z-10 dark:bg-gray-800">
                    <ul className="py-1">
                      <li className="flex justify-start items-center hover:bg-teal-100 hover:text-black rounded-xl p-2">
                        <MdEdit className="mr-2" />
                        <Link
                          href={`/edit-data/${user.uuid}`}
                          onClick={closeDropdownHandler}
                        >
                          Edit
                        </Link>
                      </li>
                      <li className="flex justify-start items-center hover:bg-teal-100 hover:text-black rounded-xl p-2">
                        <MdDelete className="mr-2" />
                        <button
                          onClick={() => {
                            openDeleteModal(user.uuid);
                            closeDropdownHandler();
                          }}
                        >
                          Delete
                        </button>
                      </li>
                      <li className="flex justify-start items-center hover:bg-teal-100 hover:text-black rounded-xl p-2">
                        <BiSolidUserDetail className="mr-2" />
                        <Link
                          href={`/detailuser/${user.uuid}`}
                          onClick={closeDropdownHandler}
                        >
                          Detail
                        </Link>
                      </li>
                      <li className="flex justify-start items-center hover:bg-teal-100 hover:text-black rounded-xl p-2">
                        {user.url_foto_absen == null ? (
                          <>
                            <MdInsertEmoticon className="mr-2" />
                            <Link
                              href={`/daftarabsen/${user.uuid}`}
                              onClick={closeDropdownHandler}
                            >
                              Daftar Muka
                            </Link>
                          </>
                        ) : (
                          <span>Muka Sudah Terdaftar</span>
                        )}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        {/* Pagination Controls */}
        <div className="flex justify-center mt-4 sm:hidden">
          <nav>
            <ul className="inline-flex items-center -space-x-px">
              {[
                ...Array(Math.ceil(usersByRole.length / usersPerPage)).keys(),
              ].map((number) => (
                <li key={number} className="px-2">
                  <button
                    onClick={() => paginate(number + 1)}
                    className={`px-3 py-2 leading-tight text-gray-500 bg-gray-100 border border-gray-300 hover:bg-sky-100 hover:text-gray-700 rounded-xl dark:hover:bg-sky-200 dark:bg-gray-50 ${
                      currentPage === number + 1 ? "bg-gray-300" : ""
                    }`}
                  >
                    {number + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Konfirmasi Hapus</h2>
            <p className="mb-4">Apakah Anda yakin ingin menghapus item ini?</p>
            <div className="flex justify-center">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Hapus
              </button>
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataMagang;
