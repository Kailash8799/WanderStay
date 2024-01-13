import React, { useCallback, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Categories from "../Category/Categories";
import { MdOutlineSwapHoriz } from "react-icons/md";
import {
  IoChevronForwardCircleOutline,
  IoChevronBackCircleOutline,
} from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import qs from 'query-string'
import { differenceInCalendarDays } from "date-fns";
import { motion } from "framer-motion";

const roboto = Roboto({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: "700",
});

const HomeHeader = ({
  setshowloginModal,
  setshowsignupModal,
  setshowrentModal,
  setshowfilterModal,
  setshowresetfilterModal
}) => {
  const { data: session, status } = useSession();
  const { systemTheme, theme, setTheme } = useTheme();
  const [themes, setThemes] = useState("dark");
  const [isopen, setisopen] = useState(false);
  const [issearch, setissearch] = useState(false);
  const [islogin, setislogin] = useState(false);
  const [slidewidth, setslidewidth] = useState(0);
  const [maxslidewidth, setmaxslidewidth] = useState();
  const Changetheme = () => {
    const currenttheme = theme === "system" ? systemTheme : theme;
    if (currenttheme === "dark") {
      localStorage.setItem("thememode", "light");
      setTheme("light");
      setThemes("light");
    } else {
      localStorage.setItem("thememode", "dark");
      setTheme("dark");
      setThemes("dark");
    }
  };
  const router = useRouter();
  const params = useSearchParams()
  useEffect(() => {
    if (systemTheme == "dark") {
      localStorage.setItem("thememode", "dark");
      setThemes("dark");
    } else {
      localStorage.setItem("thememode", "light");
      setThemes("light");
    }
    var slider = document.getElementById("slidercat");
    setmaxslidewidth(slider.scrollWidth - slider.clientWidth);
  }, []);

  useEffect(() => {
    if (session != undefined && status == "authenticated") {
      setislogin(true);
    }
  }, [session]);
  const toggleOpen = () => {
    setissearch(false)
    setisopen(!isopen);
  };
  const openLoginModal = () => {
    setisopen(false);
    setissearch(false)
    setshowsignupModal(false);
    setshowloginModal(true);
  };

  const openSignupModal = () => {
    setisopen(false);
    setissearch(false)
    setshowloginModal(false);
    setshowsignupModal(true);
  };

  const LogoutFunction = () => {
    signOut();
  };

  const rightSlide = () => {
    var slider = document.getElementById("slidercat");
    slider.scrollLeft = slider.scrollLeft + 700;
  };
  const leftSlide = () => {
    var slider = document.getElementById("slidercat");
    slider.scrollLeft = slider.scrollLeft - 700;
  };

  const openAirbnbHome = () => {
    setissearch(false)
    setisopen(false);
    setshowrentModal(true);
  };

  const openFilter = () => {
    setisopen(false)
    setissearch(!issearch);
  };

  const openfiltermodal = ()=>{
    setissearch(false)
    setshowloginModal(false)
    setshowrentModal(false)
    setshowsignupModal(false)
    setisopen(false)
    setshowfilterModal(true)
  }

  const openResetFilter = ()=>{
    setissearch(false)
    setshowloginModal(false)
    setshowrentModal(false)
    setshowsignupModal(false)
    setisopen(false)
    setshowresetfilterModal(true)
  }

  return (
    <>
      <div className="items-center justify-between hidden py-4 bg-gray-200 border-b border-gray-300 md:flex dark:border-gray-700 md:px-10 lg:px-16 dark:bg-gray-900">
        <div>
          <h1 className="text-2xl font-semibold text-black dark:text-white">
            Rooms and 50+ features
          </h1>
        </div>
        <div className="flex items-center justify-center">
          <SmartDisplayIcon className="text-4xl" color="success" />
          <p className={roboto.className}>
            &nbsp;
            <span className="text-black cursor-pointer hover:underline dark:text-white">
              Play the Rooms film
            </span>{" "}
            &nbsp;|&nbsp;&nbsp;
            <span className="text-black cursor-pointer hover:underline dark:text-white">
              Learn more
            </span>
          </p>
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center px-5 py-2 bg-white border-b border-gray-300 md:justify-between dark:bg-black lg:px-16 dark:border-gray-700">
        <div className="hidden cursor-pointer md:flex">
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
        <div className="flex items-center justify-between w-full px-4 py-1 border rounded-full md:py-2 md:w-auto dark:border-gray-500">
        <div
            className="items-center md:hidden block justify-center bg-red-500 rounded-full p-1 px-1.5 cursor-pointer"
            onClick={() => {
              setshowfilterModal(true);
            }}
          >
            <SearchIcon fontSize="small" color="#fff" />
          </div>
          <p
            className="font-medium text-black cursor-pointer dark:text-white"
            onClick={() => {
              setshowfilterModal(true);
            }}
          >
            Anywhere&nbsp;&nbsp;
          </p>
          <p
            className="hidden font-medium text-black cursor-pointer md:flex dark:text-white"
            onClick={() => {
              setshowfilterModal(true);
            }}
          >
            |&nbsp;&nbsp;Any week&nbsp;&nbsp;|&nbsp;&nbsp;
          </p>
          <p
            className="hidden font-medium text-black cursor-pointer md:flex dark:text-white"
            onClick={() => {
              setshowfilterModal(true);
            }}
          >
            Add guests&nbsp;&nbsp;
          </p>
          <div
            className="items-center hidden md:block justify-center bg-red-500 rounded-full p-1 px-1.5 cursor-pointer"
            onClick={() => {
              setshowfilterModal(true);
            }}
          >
            <SearchIcon fontSize="small" color="#fff" />
          </div>
          <div
            className="items-center md:hidden block justify-center bg-red-500 rounded-full p-1 px-1.5 cursor-pointer"
            onClick={openFilter}
          >
           <MdOutlineSwapHoriz size={20} />
          </div>
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
          <motion.div initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{delay:0.1}} className=" border py-4 md:block shadow-lg z-50 absolute rounded-xl w-[280px] bg-white overflow-hidden lg:right-20 right-5  h-96 transition-transform top-[73px] text-sm dark:bg-gray-950 dark:border-gray-800">
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
          </motion.div>
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

      <div className="sticky z-30 flex items-center flex-shrink-0 px-2 py-2 bg-white border-b border-gray-300 md:top-16 top-12 md:justify-between dark:bg-black lg:px-14 dark:border-gray-700">
        <IoChevronBackCircleOutline
          onClick={leftSlide}
          className={`flex-shrink-0 cursor-pointer dark:text-neutral-500 hidden md:block transition delay-75 ${
            slidewidth == 0 && "opacity-0"
          }`}
          size={30}
        />
        <Categories setslidewidth={setslidewidth} />
        <IoChevronForwardCircleOutline
          onClick={rightSlide}
          className={`flex-shrink-0 cursor-pointer dark:text-neutral-500 hidden md:block transition delay-75 ${
            slidewidth > maxslidewidth && "opacity-0"
          }`}
          size={30}
        />
        <div
          onClick={openFilter}
          className="items-center justify-center hidden p-2 my-auto ml-4 text-black border border-gray-600 cursor-pointer dark:text-neutral-400 md:flex rounded-xl"
        >
          <MdOutlineSwapHoriz size={20} />
          <h1>Filters</h1>
        </div>
        {issearch && (
          <div className=" border py-4 md:block shadow-lg z-50 absolute rounded-xl w-[280px] bg-white overflow-hidden lg:right-20 right-5  h-28 transition-transform md:top-[73px] top-[10px] text-sm dark:bg-gray-950 dark:border-gray-800">
            <div className="mx-4 space-y-3 cursor-pointer">
              <h1
                onClick={openfiltermodal}
                className="items-center text-base font-medium text-black dark:text-white"
              >
                Add Filters
              </h1>
              <hr className="my-2 dark:border-gray-800" />
              <h1
                onClick={openResetFilter}
                className="items-center text-base font-medium text-black dark:text-white"
              >
                Reset Filters
              </h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomeHeader;
