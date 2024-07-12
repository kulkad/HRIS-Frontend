"use client";

import React, { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";

const DaftarAbsen = () => {
  const webcamRef = useRef(null);
  const [location, setLocation] = useState({ lat: null, long: null });
  const [photo, setPhoto] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Alasan");
  const locationRef = useRef(null); // Ref to store initial location
  // Pemisah untuk membuat var Facecomparsion
  const [initializing, setInitializing] = useState(true);
  // Hook useEffect untuk memuat model face-api.js saat komponen pertama kali di-render
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
      setInitializing(false);
    };
    loadModels();
  }, []);

  const capture = (imageRef) => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
   // imageRef.current.src = imageSrc;

    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    };

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

  const handleSubmit = async () => {
    const response = await fetch("http://localhost:5001/absen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ photo, location: locationRef.current }),
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

  if (initializing) {
    return <div>Loading models...</div>;
  }
  console.log("tes", initializing);
  return (
    <div className="bg-white rounded-lg mx-4 p-4 text-xl dark:bg-gray-800">
      <div className="grid grid-cols-3 gap-4">
        <p className="px-6 py-10 font-semibold dark:text-white">
          Halaman Daftar Absen
        </p>
      </div>
      <div className="mt-5 place-content-center">
        <div className="flex justify-center">
          <div className="flex flex-row items-start">
            <div
              className="rounded-md overflow-hidden border border-gray-900"
              style={{ width: "260px", height: "200px" }}
            >
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
      </div>
    </div>
  );
};

export default DaftarAbsen;
