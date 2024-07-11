import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUserData = async () => {
      // const data = await getUserData();
      setUser(localStorage.getItem("user"));
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex text-sm bg-gray-800 rounded-full focus:outline-none"
          id="dropdownUserAvatarButton"
        >
          <span className="sr-only">Open user menu</span>
          <Image
            className="w-8 h-8 rounded-full"
            src="/assets/images/windah.jpg"
            alt="user photo"
            width={32}
            height={32}
          />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="dropdownUserAvatarButton"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{user.name}</div>
            <div className="font-medium truncate"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
