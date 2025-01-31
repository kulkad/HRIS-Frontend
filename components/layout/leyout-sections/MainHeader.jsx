"use client";

import React, { useContext, useEffect, useState } from "react";
import { FaBars, FaSun, FaMoon } from "react-icons/fa";
import UserAreaSelectBox from "./UserAreaSelectBox";
import LanguageSelectBox from "./LanguageSelectBox";
import { MenuContext } from "@/context/MenuContext";
import { MdSettings } from "react-icons/md";
import Link from "next/link";

const MainHeader = () => {
  const initialTheme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : "light";
  const [theme, setTheme] = useState(initialTheme);
  const { toggle } = useContext(MenuContext);

  const themeSwitchHandler = (newTheme) => {
    if (newTheme === "dark" || newTheme === "light") {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    }
  };

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="bg-white dark:bg-slate-800 dark:text-white flex justify-between items-center px-4 h-12 mb-4">
      <div className="font-bold">
        <i>HRIS CORPS</i>
      </div>
      <div className="flex justify-center items-center gap-3">
        {theme === "light" ? (
          <FaMoon
            className="cursor-pointer"
            onClick={() => themeSwitchHandler("dark")}
          />
        ) : (
          <FaSun
            className="cursor-pointer"
            onClick={() => themeSwitchHandler("light")}
          />
        )}
        <Link href="/setting-pulang">
                  <MdSettings size={24} />
        </Link>
        <div>
          <UserAreaSelectBox />
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
