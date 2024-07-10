"use client";

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const HalamanAbsen  = () => {
  const webcamRef = useRef(null);
  const [location, setLocation] = useState({ lat: null, long: null });
  const [photo, setPhoto] = useState(null);

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

  return (
    <div className="bg-white rounded-lg mx-4 p-4 text-xl dark:bg-gray-800">
      <div className="grid grid-cols-3 gap-4">
        <p className="px-6 py-10 font-semibold dark:text-white">Halaman Absen</p>
      </div>
      <div className="mt-5 place-content-center">
        <div className="flex justify-center">
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        </div>
        <button
          onClick={capture}
          className="mt-3 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Ambil Foto
        </button>
        {photo && (
          <div className="mt-5">
            <img src={photo} alt="Foto Karyawan" />
            <p>Latitude: {location.lat}</p>
            <p>Longitude: {location.long}</p>
            <button
              onClick={handleSubmit}
              className="mt-3 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Kirim Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HalamanAbsen;
