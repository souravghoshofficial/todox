import React from "react";
import sunIcon from "../assets/sun.svg";
import moonIcon from "../assets/moon.svg";
import { useState } from "react";
import {useTheme} from "../contexts";

const Header = () => {
  const [darkTheme, setDarkTheme] = useState(false)
  const {toggleTheme} = useTheme()
  const changeTheme = () => {
    toggleTheme()
    setDarkTheme(!darkTheme)
  }

  return (
    <div className=" mt-4 flex items-center justify-between w-full px-4 py-2">
      <div className="">
        <h1 className="text-4xl dark:text-white font-bold">Todo<span className="text-orange-500">X</span></h1>
      </div>
      <div className="p-3 cursor-pointer rounded bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800" onClick={changeTheme}>
        <img src={darkTheme? moonIcon : sunIcon} alt="sun icon" className="w-6" />
      </div>
    </div>
  );
};

export default Header;
