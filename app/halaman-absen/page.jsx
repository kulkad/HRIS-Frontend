"use client";

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const HalamanAbsen = () => {
  const webcamRef = useRef(null);
  const [location, setLocation] = useState({ lat: null, long: null });
  const [photo, setPhoto] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Select an option");

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);

    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, long: longitude });
      },
      (error) => {
        console.error("Error getting location:", error.message);
      },
      options
    );
  };

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:5000/absensi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ photo, location }),
    });
    const data = await response.json();
    console.log(data);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const items = ["Izin", "Sakit", "Bekerja di Luar"];

  return (
    <div className="bg-white rounded-lg mx-4 p-4 text-xl dark:bg-gray-800">
      <div className="grid grid-cols-3 gap-4">
        <p className="px-6 py-10 font-semibold dark:text-white">Halaman Absen</p>
      </div>
      <div className="mt-5 place-content-center">
        <div className="flex justify-center">
          <div className="flex flex-row items-start">
            <div className="rounded-md overflow-hidden border border-gray-900" style={{ width: "260px", height: "200px" }}>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                width="260"
                height="200"
                videoConstraints={{ width: 260, height: 200 }}
              />
            </div>
            {photo && (
              <div className="ml-20 border rounded border-gray-900"> 
                <img src={photo} alt="Foto Karyawan" />
                <p>Latitude: {location.lat}</p>
                <p>Longitude: {location.long}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-16 ">
          <button
            onClick={capture}
            className="flex self-start mt-3 w-30 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Ambil Foto
          </button>
          {photo && (
            <button
              onClick={handleSubmit}
              className="mt-3 w-30 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Kirim Data
            </button>
          )}
        </div>

        {/* dropdown */}
        <hr className="mt-10 mb-3 border-black border-1"/>
        <p className="text-left text-sm font-sans font-semibold text-red-500 mb-10">*Mohon mengisi kolum jika sedang berhalangan hadir.</p>
        <div className="relative inline-block text-left w-full">
          <div>
            <button
              type="button"
              className="inline-flex justify-between w-30 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
              onClick={toggleDropdown}
            >
              {selectedItem}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {isOpen && (
            <div className="origin-top-right absolute left-0 mt-2 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {items.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                    onClick={() => handleItemClick(item)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HalamanAbsen;
