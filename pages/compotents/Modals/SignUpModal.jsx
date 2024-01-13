"use client";
import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { CircularProgress, TextField } from "@mui/material";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

const SignUpModal = ({
  showloginModal,
  setshowloginModal,
  showsignupModal,
  setshowsignupModal,
}) => {
  const [loading, setloading] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const openLoginModal = () => {
    setshowsignupModal(false);
    setshowloginModal(true);
  };

  const handleSubmit = async () => {
    try {
      if(email.length < 5 || password.length < 5){
        toast("Please fill all information correctly", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        return;
      }
      setloading(true);
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/signup`,
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            secret: process.env.NEXT_PUBLIC_SECRET,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await responce.json();
      console.log(data);
      if (data.success) {
        setemail('')
        setpassword('')
        toast(data.message, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        toast(data.message, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  };

  const signUpWithGoogle = ()=>{
    signIn('google')
  }
  const signUpWithFacebook = ()=>{
    signIn('facebook')
  }
  const signUpWithGithub = async()=>{
    signIn('github')
  }

  return (
    <>
      <Toaster />
      {showsignupModal && (
        <div
          onClick={() => {}}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-neutral-800/70"
        >
          <div className="relative w-full mx-auto my-6 shadow-xl md:w-4/6 lg:w-3/6 xl:w-2/5 lg:h-auto md:h-auto">
            <div
              className={`
            translate 
            duration-300 
            h-full 
            ${showsignupModal ? "translate-y-0" : "translate-y-full"}
            ${showsignupModal ? "opacity-100" : "opacity-0"}
            `}
            >
              <div className="relative flex flex-col w-full h-full transition-all bg-gray-100 border-0 rounded-lg shadow-lg outline-none dark:bg-gray-800 translate lg:h-auto md:h-auto focus:outline-none">
                <div className="relative flex items-center border-b-[1px] dark:border-gray-700 justify-between px-6 py-3">
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      setshowsignupModal(false);
                    }}
                  >
                    <CloseOutlinedIcon />
                  </span>
                  <h1 className="text-black dark:text-white">Sign up</h1>
                  <h1></h1>
                </div>
                <div className="items-center justify-center mx-auto mt-5">
                  <h1 className="text-xl font-semibold text-black dark:text-white">
                    Welcome to Airbnb
                  </h1>
                </div>
                <div className="items-center justify-center px-6 py-2 space-y-4 text-center">
                  <TextField
                    className="w-4/5 text-black dark:text-white"
                    id="email"
                    label="Email"
                    variant="standard"
                    margin="dense"
                    name="email"
                    type="email"
                    color="primary"
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    required
                  />
                  <TextField
                    className="w-4/5 text-black dark:text-white"
                    id="password"
                    label="Password"
                    variant="standard"
                    margin="dense"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    required
                  />
                  <button
                    onClick={handleSubmit}
                    className="w-5/6 px-10 py-2 rounded-lg bg-rose-600"
                  >
                    {!loading ? "Continue" : <CircularProgress color="success" size={18}/>}
                  </button>
                </div>
                <div className="flex items-center justify-center space-x-4 text-center">
                  <hr className="w-full dark:border-gray-700" />
                  <p className="">or</p>
                  <hr className="w-full dark:border-gray-700" />
                </div>
                <div>
                  <button
                    onClick={signUpWithGoogle}
                    aria-label="Continue with google"
                    role="button"
                    className="focus:outline-none  w-3/4 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex justify-center items-center mx-auto mt-5"
                  >
                    <Image
                      src="/google.png"
                      alt="google"
                      width={23}
                      height={23}
                      loading="lazy"
                    />
                    <p className="ml-4 text-base font-medium text-center text-gray-700 dark:text-gray-100">
                      Continue with Google
                    </p>
                  </button>
                  <button
                    onClick={signUpWithFacebook}
                    aria-label="Continue with Facebook"
                    role="button"
                    className="focus:outline-none justify-center w-3/4 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center mx-auto my-5"
                  >
                    <Image
                      loading="lazy"
                      src="/fc.webp"
                      alt="facebook"
                      width={23}
                      height={23}
                    />
                    <p className="ml-4 text-base font-medium text-center text-gray-700 dark:text-gray-100">
                      Continue with Facebook
                    </p>
                  </button>
                  <button
                    onClick={signUpWithGithub}
                    aria-label="Continue with GitHub"
                    role="button"
                    className="focus:outline-none justify-center w-3/4 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center mx-auto my-5"
                  >
                    <Image
                      loading="lazy"
                      src="/github.png"
                      alt="github"
                      width={23}
                      height={23}
                    />
                    <p className="ml-4 text-base font-medium text-center text-gray-700 dark:text-gray-100">
                      Continue with GitHub
                    </p>
                  </button>
                </div>
                <div className="flex items-center justify-center space-x-4 text-center">
                  <hr className="w-full dark:border-gray-700" />
                  <hr className="w-full dark:border-gray-700" />
                </div>
                <div className="w-3/4 mx-auto mb-3">
                  <h1 className="font-semibold text-black dark:text-white">
                    Already have an account ?
                    <span
                      className="underline cursor-pointer"
                      onClick={openLoginModal}
                    >
                      login
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpModal;
