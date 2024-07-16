"use client";
// src/FaceComparison.js
import React, { useState, useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";

// Komponen utama FaceComparison
const FaceComparison = () => {
  // State untuk mengatur apakah model sedang diinisialisasi
  const [initializing, setInitializing] = useState(true);
  // State untuk menyimpan nilai kesamaan wajah
  const [similarity, setSimilarity] = useState(null);
  // State untuk menyimpan gambar yang diambil
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
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

  // Fungsi untuk mengambil gambar dari webcam dan menyimpannya ke state
  const capture = (setImage, imageRef) => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    imageRef.current.src = imageSrc;
  };

  // Fungsi untuk menghitung kesamaan antara dua wajah
  const calculateSimilarity = async () => {
    const img1 = imageRef1.current;
    const img2 = imageRef2.current;

    const detection1 = await faceapi
      .detectSingleFace(img1, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks()
      .withFaceDescriptor();
    const detection2 = await faceapi
      .detectSingleFace(img2, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detection1 && detection2) {
      const distance = faceapi.euclideanDistance(
        detection1.descriptor,
        detection2.descriptor
      );
      setSimilarity((1 - distance).toFixed(2)); // Skor kesamaan
    } else {
      setSimilarity("Unable to detect both faces"); // Tidak dapat mendeteksi kedua wajah
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
      <button onClick={() => capture(setImage1, imageRef1)}>
        Capture Image 1
      </button>
      <button onClick={() => capture(setImage2, imageRef2)}>
        Capture Image 2
      </button>
      <div>
        <h3>Image 1</h3>
        <img ref={imageRef1} alt="Image 1" />
      </div>
      <div>
        <h3>Image 2</h3>
        <img ref={imageRef2} alt="Image 2" />
      </div>
      <button onClick={calculateSimilarity}>Calculate Similarity</button>
      {similarity && <h2>Similarity: {similarity}</h2>}
    </div>
  );
};

export default FaceComparison;
