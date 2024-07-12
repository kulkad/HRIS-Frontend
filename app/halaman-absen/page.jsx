"use client";

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { LuImagePlus } from "react-icons/lu";
import { VscSend } from "react-icons/vsc";

const HalamanAbsen = () => {
  // State variables and references
  const webcamRef = useRef(null); 
  const [location, setLocation] = useState({ lat: null, long: null }); 
  const [photo, setPhoto] = useState(null); 
  const [isOpen, setIsOpen] = useState(false); 
  const [selectedItem, setSelectedItem] = useState("Alasan");
  const [isAbsent, setIsAbsent] = useState(false); 
  const [showWebcam, setShowWebcam] = useState(true); 
  const locationRef = useRef(null); 

  // Function to capture a photo and retrieve the user's current location
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot(); // Capture the photo
    setPhoto(imageSrc);
    setShowWebcam(false); 

    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    };

    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (!locationRef.current) {
          locationRef.current = { lat: latitude, long: longitude };
          setLocation({ lat: latitude, long: longitude });
        }
      },
      (error) => {
        console.error("Error getting location:", error.message);
      },
      options
    );
  };

  // Function untuk kirim foto dan lokasi ke server
  const handleSubmit = async () => {
    const response = await fetch("http://localhost:5000/absensi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ photo, location: locationRef.current }),
    });
    const data = await response.json();
    console.log(data);
  };

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle item click in the dropdown and set the selected item
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  // Function to toggle the absence state and show/hide the absence form
  const toggleAbsent = () => {
    setIsAbsent(!isAbsent);
  };

  // Function to retake the photo by resetting the photo state and showing the webcam
  const retakePhoto = () => {
    setPhoto(null);
    setShowWebcam(true);
  };

  return (
    <div className="bg-white rounded-lg mx-4 p-4 text-xl dark:bg-gray-800">
      {/* Title Section */}
      <div className="grid grid-cols-3 gap-4">
        <p className="px-6 py-10 font-semibold dark:text-white">Halaman Absen</p>
      </div>

      {/* Webcam and Photo Section */}
      <div className="mt-5 place-content-center">
        <div className="flex justify-center">
          <div className="flex flex-row items-start">
            {showWebcam && (
              <div
                className="rounded-md overflow-hidden border border-gray-900"
                style={{ width: "100%", maxWidth: "400px", height: "auto", background: "gray" }}
              >
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/png"
                  mirrored={false} // Disable mirroring
                  style={{ width: "100%", height: "auto" }} // Responsive design
                />
              </div>
            )}
            {photo && (
              <div className="ml-20 border rounded border-gray-900">
                <img src={photo} alt="Foto Karyawan" />
                <p>Latitude: {location.lat}</p>
                <p>Longitude: {location.long}</p>
              </div>
            )}
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-center gap-16 ">
          {showWebcam && (
            <button
              onClick={capture}
              className="flex self-start mt-3 w-30 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Ambil Foto
            </button>
          )}
          {photo && (
            <>
              <button
                onClick={retakePhoto}
                className="mt-3 w-30 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Ambil Ulang Foto
              </button>
              <button
                onClick={handleSubmit}
                className="mt-3 w-30 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Kirim Data
              </button>
            </>
          )}
        </div>

        {/* Absen button section */}
        <div className="flex justify-center mt-5">
          <button
            onClick={toggleAbsent}
            className={`mt-3 w-30 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isAbsent ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${isAbsent ? "red" : "green"}-500`}
          >
            {isAbsent ? "Tidak Hadir" : "Hadir"}
          </button>
        </div>

        {/* Form absen section */}
        {isAbsent && (
          <>
            <hr className="mt-10 mb-2 border-black border-1" />
            <p className="text-left text-sm font-sans font-semibold text-red-500 mb-8">
              *Mohon mengisi kolum jika sedang berhalangan hadir.
            </p>

            <form>
              <label htmlFor="chat" className="sr-only">
                Masukkan alasan tidak hadir ....
              </label>
              <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="relative inline-block text-left w-32">
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
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="origin-top-right absolute left-0 mt-2 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        {["Izin", "Sakit", "Lainnya"].map((item) => (
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
                <input type="file" className="hidden" id="fileInput" />
                <label htmlFor="fileInput" className="cursor-pointer ">
                  <LuImagePlus size={35} className="ml-1 flex justify-center" />
                </label>
                <textarea
                  id="chat"
                  rows="1"
                  className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Masukkan alasan..."
                ></textarea>
                <button
                  type="submit"
                  className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                >
                  <VscSend />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};


export default HalamanAbsen;
