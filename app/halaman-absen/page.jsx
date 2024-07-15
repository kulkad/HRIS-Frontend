  "use client";

  import React, { useRef, useState } from "react";
  import Webcam from "react-webcam";
  import { LuImagePlus } from "react-icons/lu";
  import { VscSend } from "react-icons/vsc";

  const editPhoto = () => {
    if (!photo || !location.lat || !location.long) {
      console.error("Foto atau data lokasi tidak lengkap");
      return;
    }
  
    const img = new Image();
    img.src = photo;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
  
      const scaleFactor = 0.8; // Resize factor
      canvas.width = img.width * scaleFactor;
      canvas.height = img.height * scaleFactor;
  
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
      ctx.font = "bold 16px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "left";
  
      const date = new Date();
      const formattedDate = date.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const formattedTime = date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
  
      setFormattedDate(formattedDate);
      setFormattedTime(formattedTime);
  
      const text = `${location.lat}, ${location.long}\n${formattedDate}, ${formattedTime}`;
      const lineHeight = 20;
      const padding = 8;
      const logoWidth = 40;
      const logoHeight = 40;
      const textX = logoWidth + padding * 2;
  
      const backgroundHeight =
        Math.max(logoHeight, lineHeight * 2) + padding * 2;
      const backgroundY = canvas.height - backgroundHeight;
  
      ctx.fillStyle = "black";
      ctx.fillRect(0, backgroundY, canvas.width, backgroundHeight);
  
      ctx.fillStyle = "white";
      let y = backgroundY + padding + lineHeight;
  
      text.split("\n").forEach((line) => {
        ctx.fillText(line, textX, y);
        y += lineHeight;
      });
  
      const logo = new Image();
      logo.src = "img/windah.jpg"; // Adjust logo path as needed
      logo.onload = () => {
        ctx.drawImage(
          logo,
          padding,
          backgroundY + (backgroundHeight - logoHeight) / 2,
          logoWidth,
          logoHeight
        );
  
        const editedImage = canvas.toDataURL("image/jpeg");
        setEditedPhoto(editedImage);
      };
    };
  };
  

  export function getCurrentDate() {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
      const year = String(date.getFullYear()).slice(-2); // Ambil 2 digit terakhir tahun
      return `${day}/${month}/${year}`;
    }

    export function getCurrentTimeInIndonesian() {
      const time = new Date();
      const hours = time.getHours();
      
      let period;
      if (hours <= 10) {
        period = "Pagi";
      } else if (hours <= 15) {
        period = "Siang";
      } else if (hours <= 19) {
        period = "Sore";
      } else {
        period = "Malam";
      }
      
      return `${time.getHours()}:${String(time.getMinutes()).padStart(2, '0')} ${period}`;
    }

  const HalamanAbsen = () => {
    const webcamRef = useRef(null); 
    const [location, setLocation] = useState({ lat: null, long: null }); 
    const [photo, setPhoto] = useState(null); 
    const [isOpen, setIsOpen] = useState(false); 
    const [selectedItem, setSelectedItem] = useState("Alasan");
    const [isAbsent, setIsAbsent] = useState(false); 
    const [showWebcam, setShowWebcam] = useState(true); 
    const locationRef = useRef(null); 

    const capture = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setPhoto(imageSrc);
      setShowWebcam(false); 

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

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
      setSelectedItem(item);
      setIsOpen(false);
    };

    const toggleAbsent = () => {
      setIsAbsent(!isAbsent);
    };

    const retakePhoto = () => {
      setPhoto(null);
      setShowWebcam(true);
    };

    return (
      <div className="bg-white rounded-lg mx-4 p-4 text-xl dark:bg-gray-800">
        <div className="grid grid-cols-3 gap-4">
          <p className="px-6 py-10 font-semibold dark:text-white">Halaman Absen</p>
        </div>

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
                    style={{
                      transform: "scaleX(-1)",
                      width: "100%",
                      height: "auto",
                      border: "2px solid #ccc",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}
              {photo && (
                <div className="ml-20 border rounded border-gray-900">
                  <img src={photo} alt="Foto Karyawan" style={{ transform: "scaleX(-1)" }} />
                  <p>Lokasi Anda: {location.lat}, {location.long}</p>
                  <p>Tanggal: {getCurrentDate()}</p>
                  <p>Waktu: {getCurrentTimeInIndonesian()}</p>
                </div>
              )}
            </div>
          </div>

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

          {isAbsent && (
            <>
              <hr className="mt-10 mb-2 border-black border-1" />
              <p className="text-left text-sm font-sans font-semibold text-red-500 mb-8">
                *Mohon mengisi kolom jika sedang berhalangan hadir.
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
                  <label htmlFor="fileInput" className="cursor-pointer">
                    <LuImagePlus size={35} className="ml-1 flex justify-center" />
                  </label>
                  <textarea
                    id="chat"
                    rows="1"
                    className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300"
                    placeholder="Masukkan alasan tidak hadir ..."
                  ></textarea>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    );
  };

  export default HalamanAbsen;
