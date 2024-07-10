"use client";

import { AiOutlineGithub } from "react-icons/ai";
import { ImYoutube2 } from "react-icons/im";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import React from "react";
import { useEffect, useState } from "react";
//import { useRouter } from "next/router";

const HomePage = () => {
  // Pe
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

  return (
    <div className="bg-white dark:bg-slate-900 dark:text-white rounded-lg mx-4 p-4">
      <h1 className="text-2xl font-semibold">Selamat Datang di HRIS-CORPS</h1>
    </div>
  );
};

export default HomePage;
