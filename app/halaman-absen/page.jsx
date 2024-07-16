// src/FaceComparison.js
"use client";

import React, { useState, useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import axios from "axios";

// Komponen utama FaceComparison
const FaceComparison = () => {
  // State untuk mengatur apakah model sedang diinisialisasi
  const [initializing, setInitializing] = useState(true);
  // State untuk menyimpan nilai kesamaan wajah
  const [similarity, setSimilarity] = useState(null);
  // State untuk menyimpan gambar yang diambil
  const [image2, setImage2] = useState(null);
  const [userPhotos, setUserPhotos] = useState([]);
  const [absenSuccess, setAbsenSuccess] = useState(false);
  // Refs untuk referensi webcam dan gambar
  const webcamRef = useRef(null);
  const imageRef1 = useRef(null);
  const imageRef2 = useRef(null);

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

  // Mengambil URL foto dari database
  const fetchUserPhotos = async () => {
    try {
      const response = await axios.get("http://localhost:5001/userfotoabsen"); // Ganti dengan endpoint API Anda
      console.log("coba aja", response.data);
      setUserPhotos(response.data);
    } catch (error) {
      console.error("Error fetching user photos: ", error);
    }
  };

  useEffect(() => {
    console.log("coba");
    fetchUserPhotos();
  }, []);

  // Fungsi untuk mengambil gambar dari webcam dan menyimpannya ke state
  const capture = (setImage, imageRef) => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    imageRef.current.src = imageSrc;
  };

  // Fungsi untuk menghitung kesamaan antara dua wajah
  const calculateSimilarity = async () => {
    const img2 = imageRef2.current;
    let isAbsenSuccess = false;
    
    for (let userPhoto of userPhotos) {
        const img1 = new Image();
        img1.src = userPhoto.url_foto_absen;
        await new Promise((resolve) => (img1.onload = resolve));

        
        const detection1 = await faceapi
        .detectSingleFace(img1, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceDescriptor();
        console.log('coba', detection1);
        
      const detection2 = await faceapi
      .detectSingleFace(img2, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks()
      .withFaceDescriptor();


      if (detection1 && detection2) {
        const distance = faceapi.euclideanDistance(
          detection1.descriptor,
          detection2.descriptor
        );
        const similarityScore = (1 - distance).toFixed(2); // Skor kesamaan

        if (similarityScore >= 0.6) {
          // Tentukan threshold kesamaan
          isAbsenSuccess = true;
          setSimilarity(similarityScore);
          break;
        }
      }
    }

    if (isAbsenSuccess) {
      setAbsenSuccess(true);
      alert("Absen berhasil!");
      // Kirim data absen ke database
      await axios.post("/api/absen", { photo: image2 });
    } else {
      setSimilarity("Tidak dapat mendeteksi kedua wajah");
    }
  };

  // Jika model masih dalam proses inisialisasi, tampilkan pesan loading
  if (initializing) {
    return <div>Loading models...</div>;
  }

  // Tampilkan antarmuka pengguna
  return (
    <div>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={() => capture(setImage2, imageRef2)}>
        Capture Image
      </button>
      <div>
        <h3>Captured Image</h3>
        <img ref={imageRef2} alt="Captured Image" />
      </div>
      <button onClick={calculateSimilarity}>Calculate Similarity</button>
      {similarity && <h2>Similarity: {similarity}</h2>}
      {absenSuccess && <h2>Absen berhasil!</h2>}
    </div>
  );
};

export default FaceComparison;
