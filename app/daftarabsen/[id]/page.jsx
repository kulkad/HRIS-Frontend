"use client";

import React, { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import axios from "axios";
import { useParams } from "next/navigation";

const DaftarAbsen = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const webcamRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [initializing, setInitializing] = useState(true);

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

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
  };

  const handleSubmit = async () => {
    if (!photo || !id) return; // Pastikan photo dan id ada

    try {
      const responseBlob = await fetch(photo);
      const blob = await responseBlob.blob();

      const formData = new FormData();
      formData.append("file", blob, "photo.png");

      const updateResponse = await axios.patch(
        `http://localhost:5001/userAbsen/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(updateResponse.data);
      // Redirect ke datapkl setelah berhasil
      window.location.href = "/datapkl";
    } catch (error) {
      console.error("Error submitting data:", error.message);
      alert("Gagal mengirim data, silakan coba lagi."); // Pesan error
    }
  };

  if (initializing) {
    return <div>Loading models...</div>;
  }

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
