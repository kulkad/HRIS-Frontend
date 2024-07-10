"use client";

import React from "react";
import { useEffect, useState } from "react";
//import { useRouter } from "next/router";

const AboutUsPage = () => {
  // Pengecekan Route Apakah User Sudah Login Atau belum
  const [user, setUser] = useState(null);
 // const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      window.location.href = "http://localhost:3000/login";
    } else {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) return <p>Loading...</p>;

  return <div className="bg-white rounded-lg mx-4 p-4">AboutUsPage</div>;
};

export default AboutUsPage;
