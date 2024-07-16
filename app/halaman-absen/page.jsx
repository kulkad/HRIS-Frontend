'use client';

import { useState, useRef, useEffect } from 'react';

export default function Capture() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [stream, setStream] = useState(null);

  useEffect(() => {
    // Akses webcam
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStream(stream);
      })
      .catch(err => {
        console.error("Error accessing webcam: ", err);
      });

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
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('id-ID', options);
  };

  const getFormattedTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext('2d');
    // Set background color
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Flip the image horizontally
    context.translate(canvasRef.current.width, 0);
    context.scale(-1, 1);
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    context.setTransform(1, 0, 0, 1, 0, 0);

    // Ambil waktu sekarang
    const date = getFormattedDate();
    const time = getFormattedTime();

    // Menggambar latar belakang transparan untuk keterangan
    context.fillStyle = 'rgba(128, 128, 128, 0.5)';
    context.fillRect(0, canvasRef.current.height - 150, canvasRef.current.width, 150);

    // Muat logo dari direktori publik dan gambar di latar belakang transparan
    const img = new Image();
    img.onload = () => {
      // Perbesar logo dan posisikan di tengah area latar belakang transparan
      const logoWidth = 70; // Perbesar lebar logo
      const logoHeight = 70; // Perbesar tinggi logo
      const logoX = 10; // Posisi X logo
      const logoY = canvasRef.current.height - 140; // Posisi Y logo
      context.drawImage(img, logoX, logoY, logoWidth, logoHeight);

      // Tulis keterangan setelah logo dimuat
      context.font = '20px Arial';
      context.fillStyle = 'white';
      const textX = logoX + logoWidth + 10; // Mulai teks setelah logo
      if (location.latitude && location.longitude) {
        context.fillText(`Lokasi Anda: ${location.latitude}, ${location.longitude}`, textX, canvasRef.current.height - 100);
      }
      context.fillText(`Tanggal: ${date}`, textX, canvasRef.current.height - 70);
      context.fillText(`Waktu: ${time}`, textX, canvasRef.current.height - 40);

      // Set foto dengan keterangan yang telah ditambahkan
      const image = canvasRef.current.toDataURL('image/png');
      setPhoto(image);

      // Stop video stream
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };

    img.src = '/assets/images/windah.jpg';
  };

  const retakePhoto = () => {
    setPhoto(null);
    setLocation({ latitude: null, longitude: null });

    // Restart video stream
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStream(stream);
      })
      .catch(err => {
        console.error("Error accessing webcam: ", err);
      });

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
    console.log('Photo:', photo);
    console.log('Location:', location);
    alert('Data submitted!');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative">
      <h1 className="text-2xl font-bold mb-4 absolute top-4 left-4">Halaman Absen</h1>
      {!photo && (
        <div className="flex flex-col items-center">
          <video ref={videoRef} className="border border-gray-400" width="640" height="480" autoPlay style={{ transform: 'scaleX(-1)' }}></video>
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
          <img src={photo} alt="Captured" className="border border-gray-400 mt-2" />
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
      <canvas ref={canvasRef} className="hidden" width="640" height="480"></canvas>
    </div>
  );
}
