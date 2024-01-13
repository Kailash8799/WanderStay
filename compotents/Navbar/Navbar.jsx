import React, { useState } from "react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Navbar = ({setshowrentModal,setshowsignupModal,setshowloginModal}) => {
    const { data: session, status } = useSession();
  const { systemTheme, theme, setTheme } = useTheme();
  const [themes, setThemes] = useState("dark");
  const [isopen, setisopen] = useState(false);
  const [islogin, setislogin] = useState(false);
  const Changetheme = () => {
    const currenttheme = theme === "system" ? systemTheme : theme;
    if (currenttheme === "dark") {
      localStorage.setItem('thememode',"light")
      setTheme("light");
      setThemes("light");
    } else {
      localStorage.setItem('thememode',"dark")
      setTheme("dark");
      setThemes("dark");
    }
  };
  const router = useRouter();
  useEffect(() => {
    if (systemTheme == "dark") {
      localStorage.setItem("thememode","dark")
      setThemes("dark");
    } else {
      localStorage.setItem("thememode","light")
      setThemes("light");
    }
  }, []);

  useEffect(() => {
    if (session != undefined && status == "authenticated") {
      setislogin(true);
    }
  }, [session]);
  const toggleOpen = () => {
    setisopen(!isopen);
  };
 
  const openLoginModal = () => {
    setisopen(false);
    setshowsignupModal(false);
    setshowloginModal(true);
  };

  const openSignupModal = () => {
    setisopen(false);
    setshowloginModal(false);
    setshowsignupModal(true);
  };

  const LogoutFunction = () => {
    signOut();
  };
  const openAirbnbHome = ()=>{
    setisopen(false)
    setshowrentModal(true)
  }
  return (
    <>
      <div className="sticky top-0 z-40 flex items-center justify-between px-5 py-2 bg-white border-b border-gray-300 dark:bg-black lg:px-16 dark:border-gray-700">
        <div className="flex cursor-pointer ">
          <Image
            onClick={() => {
              router.push("/");
            }}
            src={"/logo.png"}
            alt="logo"
            width={100}
            height={100}
          />
        </div>
        <div className="flex items-center justify-center space-x-1">
          <Link href={"/"} legacyBehavior>
            <a className="items-center hidden px-3 py-2 font-semibold text-center text-black rounded-full md:flex hover:bg-gray-100 hover:dark:bg-gray-800 dark:text-white">
              Switch to hosting
            </a>
          </Link>
          <button onClick={Changetheme}>
            {themes === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </button>
          <button className="items-center justify-center hidden md:flex">
            <LanguageIcon />
          </button>
          <div
            onClick={toggleOpen}
            className="flex items-center justify-center p-2 border-gray-300 rounded-full cursor-pointer md:border dark:border-gray-700"
          >
            <MenuIcon className="hidden md:flex" />
            <AccountCircleIcon />
          </div>
        </div>
        {isopen && islogin && (
          <div className=" border py-4 md:block shadow-lg z-50 absolute rounded-xl w-[280px] bg-white overflow-hidden lg:right-20 right-5  h-96 transition-transform top-[73px] text-sm dark:bg-gray-950 dark:border-gray-800">
            <div className="mx-4 cursor-pointer">
              <h1 className="items-center text-base font-medium text-black dark:text-white">
                2023 Summer Release
                <span className="px-2 mx-2 font-bold text-white bg-pink-600 rounded-lg">
                  NEW
                </span>
              </h1>
            </div>
            <hr className="my-2 dark:border-gray-800" />
            <div className="space-y-3">
              <div className="mx-4 cursor-pointer">
                <Link href={"/"}>
                  <h1 className="items-center text-base font-medium text-black dark:text-white">
                    Messages
                  </h1>
                </Link>
              </div>
              <div className="mx-4 cursor-pointer">
                <Link href={"/"}>
                  <h1 className="items-center text-base font-medium text-black dark:text-white">
                    Notifications
                  </h1>
                </Link>
              </div>
              <div className="mx-4 cursor-pointer">
                <Link href={"/trips"}>
                  <h1 className="items-center text-base font-medium text-black dark:text-white">
                    Trips
                  </h1>
                </Link>
              </div>
              <div className="mx-4 cursor-pointer">
                <Link href={"/wishlists"}>
                  <h1 className="items-center text-base font-medium text-black dark:text-white">
                    Wishlists
                  </h1>
                </Link>
              </div>
              <div className="mx-4 cursor-pointer">
                <h1
                  onClick={openAirbnbHome}
                  className="items-center text-base font-medium text-black dark:text-white"
                >
                  Airbnb is your home
                </h1>
              </div>
            </div>
            <hr className="my-2 dark:border-gray-800" />
            <div className="space-y-3">
              <div className="mx-4 cursor-pointer">
                <Link href={"/"}>
                  <h1 className="items-center text-base font-medium text-black dark:text-white">
                    Manage listings
                  </h1>
                </Link>
              </div>
              <div className="mx-4 cursor-pointer">
                <Link href={"/"}>
                  <h1 className="items-center text-base font-medium text-black dark:text-white">
                    Accounts
                  </h1>
                </Link>
              </div>
            </div>
            <hr className="my-2 dark:border-gray-800" />
            <div className="space-y-3">
              <div className="mx-4 cursor-pointer">
                <Link href={"/"}>
                  <h1 className="items-center text-base text-black dark:text-white">
                    Help
                  </h1>
                </Link>
              </div>
              <div className="mx-4 cursor-pointer">
                <h1
                  onClick={LogoutFunction}
                  className="items-center text-base text-black dark:text-white"
                >
                  Logout
                </h1>
              </div>
            </div>
          </div>
        )}
        {isopen && !islogin && (
          <div className=" border py-4 md:block shadow-lg z-50 absolute rounded-xl w-[280px] bg-white overflow-hidden lg:right-20 right-5  h-44 transition-transform top-[73px] text-sm dark:bg-gray-950 dark:border-gray-800">
            <div className="mx-4 space-y-3 cursor-pointer">
              <h1
                onClick={openLoginModal}
                className="items-center text-base font-medium text-black dark:text-white"
              >
                Login
              </h1>
              <h1
                onClick={openSignupModal}
                className="items-center text-base font-medium text-black dark:text-white"
              >
                Signup
              </h1>
            </div>
            <hr className="my-2 dark:border-gray-800" />
            <div className="space-y-3">
              <div className="mx-4 cursor-pointer">
                <Link href={"/host/homes"}>
                  <h1 className="items-center text-base font-medium text-black dark:text-white">
                    Airbnb your home
                  </h1>
                </Link>
              </div>
              <div className="mx-4 cursor-pointer">
                <Link href={"/help?audience=guest"}>
                  <h1 className="items-center text-base font-medium text-black dark:text-white">
                    Help
                  </h1>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
