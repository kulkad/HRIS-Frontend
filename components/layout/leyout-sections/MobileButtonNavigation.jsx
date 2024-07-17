import React from "react";
import { usePathname } from "next/navigation";

// icons
import { BiHeart } from "react-icons/bi";
import { FiSearch, FiUser } from "react-icons/fi";
import { MdHome, MdOutlineAddBox } from "react-icons/md";
import { HiDocumentAdd } from "react-icons/hi";
import { FaUserCheck } from "react-icons/fa";
import { PiUserFocusDuotone } from "react-icons/pi";
import { PiFolderSimpleUserLight } from "react-icons/pi";
import { FaTasks } from "react-icons/fa";
import Link from "next/link";

const navButtonsList = [
  { id: 1, label: "Home", icon: <MdHome />, path: "/" },
  { id: 2, label: "Data", icon: <FaTasks />, path: "/data-absensi" },
  { id: 3, label: "Absen", icon: <PiUserFocusDuotone />, path: "/halaman-absen" },
  { id: 4, label: "Add", icon: <PiFolderSimpleUserLight />, path: "/halaman-data" },
];

const MobileButtonNavigation = () => {
  const path = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full h-12 bg-white sm:hidden dark:bg-gray-800">
      <div className="flex justify-around items-center h-12 gap-x-3 border-t-2 border-t-gray-200">
        {navButtonsList.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className={`text-3xl ${
              path === item.path ? "text-white-700" : "text-gray-400"
            }`}
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileButtonNavigation;
