"use client";
import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { TextField } from "@mui/material";

const ForgotModal = ({
  showloginModal,
  setshowloginModal,
  showforgotModal,
  setshowforgotModal,
}) => {
  const openForgotmodal = () => {
    setshowforgotModal(false)
    setshowloginModal(true);
  };
  return (
    <>
      {showforgotModal && (
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
            ${showforgotModal ? "translate-y-0" : "translate-y-full"}
            ${showforgotModal ? "opacity-100" : "opacity-0"}
            `}
            >
              <div className="relative flex flex-col w-full h-full bg-gray-100 border-0 rounded-lg shadow-lg outline-none dark:bg-gray-800 translate lg:h-auto md:h-auto focus:outline-none">
                <div className="relative flex items-center border-b-[1px] dark:border-gray-700 justify-between px-6 py-3">
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      setshowforgotModal(false);
                    }}
                  >
                    <CloseOutlinedIcon />
                  </span>
                  <h1 className="text-black dark:text-white">Forgot Password</h1>
                  <h1></h1>
                </div>
               
                <div className="items-center justify-center px-6 py-2 space-y-4 text-center">
                    <div className="w-5/6 mx-auto">
                        <h1 className="text-black text-start dark:text-white">
                        Enter the email address associated with your account, and we’ll email you a link to reset your password.
                        </h1>
                    </div>
                  <TextField
                    className="w-4/5 text-black dark:text-white"
                    id="email"
                    label="Email*"
                    variant="standard"
                    margin="dense"
                    name="email"
                    type="email"
                    color="primary"
                  />
                 
                  <button className="w-5/6 px-10 py-3 text-white rounded-lg bg-rose-600">
                    Continue
                  </button>
                </div>
                
              
                <div className="flex items-center justify-center text-center" >
                  <hr className="w-full dark:border-gray-700"/>
                  <hr className="w-full dark:border-gray-700"/>
                </div>
                <div className="w-3/4 mx-auto mb-3">
                  
                  <h1 className="font-semibold text-black dark:text-white">
                    
                      Use another account&nbsp;&nbsp;&nbsp;
                    <span
                      className="underline cursor-pointer"
                      onClick={openForgotmodal}
                    >Login
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

export default ForgotModal;
