"use client";

import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";

export default function Capture() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [attendance, setAttendance] = useState("Hadir");

  useEffect(() => {
    // Ambil geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error accessing geolocation: ", error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const getFormattedDate = () => {
    const now = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return now.toLocaleDateString("id-ID", options);
  };

  const getFormattedTime = () => {
    const now = new Date();
    return now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const context = canvasRef.current.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Set background color
      context.fillStyle = "white";
      context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      // Flip the image horizontally
      context.translate(canvasRef.current.width, 0);
      context.scale(-1, 1);
      context.drawImage(
        img,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      context.setTransform(1, 0, 0, 1, 0, 0);

      // Ambil waktu sekarang
      const date = getFormattedDate();
      const time = getFormattedTime();

      // Menggambar latar belakang transparan untuk keterangan
      context.fillStyle = "rgba(128, 128, 128, 0.5)";
      context.fillRect(
        0,
        canvasRef.current.height - 150,
        canvasRef.current.width,
        150
      );

      // Muat logo dari direktori publik dan gambar di latar belakang transparan
      const logoImg = new Image();
      logoImg.src = "/assets/images/windah.jpg";
      logoImg.onload = () => {
        // Perbesar logo dan posisikan di tengah area latar belakang transparan
        const logoWidth = 70; // Perbesar lebar logo
        const logoHeight = 70; // Perbesar tinggi logo
        const logoX = 10; // Posisi X logo
        const logoY = canvasRef.current.height - 140; // Posisi Y logo
        context.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);

        // Tulis keterangan setelah logo dimuat
        context.font = "20px Arial";
        context.fillStyle = "white";
        const textX = logoX + logoWidth + 10; // Mulai teks setelah logo
        if (location.latitude && location.longitude) {
          context.fillText(
            `Lokasi Anda: ${location.latitude}, ${location.longitude}`,
            textX,
            canvasRef.current.height - 100
          );
        }
        context.fillText(
          `Tanggal: ${date}`,
          textX,
          canvasRef.current.height - 70
        );
        context.fillText(`Waktu: ${time}`, textX, canvasRef.current.height - 40);

        // Set foto dengan keterangan yang telah ditambahkan
        const image = canvasRef.current.toDataURL("image/png");
        setPhoto(image);
      };
    };

    img.src = imageSrc;
  };

  const retakePhoto = () => {
    setPhoto(null);
    setLocation({ latitude: null, longitude: null });

    // Ambil geolocation lagi
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error accessing geolocation: ", error);
        },
        { enableHighAccuracy: true }
      );
    }
  };

  const submitData = () => {
    // Kirim data photo dan geolocation ke server
    console.log("Photo:", photo);
    console.log("Location:", location);
    alert("Data submitted!");
  };

  const toggleAttendance = () => {
    setAttendance((prev) => (prev === "Hadir" ? "Tidak Hadir" : "Hadir"));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center rounded-md ml-4 bg-gray-100 dark:bg-slate-900 relative">
      <h1 className="text-2xl mt-2 font-bold mb-4 absolute top-4 left-4 dark:text-white">
        Geolocation
      </h1>
      {!photo && (
        <div className="flex flex-col items-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="border border-gray-400 mt-20 rounded-md"
            width="640"
            height="480"
            videoConstraints={{
              facingMode: "user",
            }}
            style={{ transform: "scaleX(-1)" }}
          />
          <button
            onClick={capturePhoto}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={location.latitude === null || location.longitude === null}
          >
            Ambil Foto
          </button>
        </div>
      )}
      {photo && (
        <div className="mt-4 flex flex-col items-center">
          <img
            src={photo}
            alt="Captured"
            className="border border-gray-400 mt-2"
          />
          <div className="flex space-x-2 mt-4">
            <button
              onClick={retakePhoto}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Retake Photo
            </button>
            <button
              onClick={submitData}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Kirim Data
            </button>
          </div>
        </div>
      )}
      <button
        onClick={toggleAttendance}
        className={`mt-4 px-4 py-2 rounded ${
          attendance === "Hadir"
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-red-500 text-white hover:bg-red-600"
        }`}
      >
        {attendance === "Hadir" ? "Hadir" : "Tidak Hadir"}
      </button>
      {attendance === "Tidak Hadir" && (
        <div className="flex justify-center mt-10">
          <form>
            <label htmlFor="chat" className="sr-only">
              Berikan alasannya...
            </label>
            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
              <div className="relative inline-block w-80">
                <select className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option>Izin</option>
                  <option>Sakit</option>
                  <option>Lainnya</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-white">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 3a1 1 0 0 1 .832.445l5 7a1 1 0 0 1-1.664 1.11L10 5.66l-4.168 5.895a1 1 0 1 1-1.664-1.11l5-7A1 1 0 0 1 10 3z" />
                  </svg>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 ml-2"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 18"
                >
                  <path
                    fill="currentColor"
                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                  />
                </svg>
                <span className="sr-only">Upload image</span>
              </button>
              <textarea
                id="chat"
                rows="1"
                className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-00 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Berikan alasannya..."
              ></textarea>
              <button
                type="submit"
                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5 rotate-90 rtl:-rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                <span className="sr-only">Send message</span>
              </button>
            </div>
          </form>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="hidden"
        width="640"
        height="480"
      ></canvas>
    </div>
  );
}
