"use client";
import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { CircularProgress, TextField } from "@mui/material";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/router";
import Category from "../Listings/Category";
import Locations from "../Listings/Locations";
import Info from "../Listings/Info";
import Images from "../Listings/Images";
import Description from "../Listings/Description";
import Price from "../Listings/Price";
import { useSession } from "next-auth/react";

const RentModal = ({ showrentModal, setshowrentModal }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const totalstep = [
    { name: "CATEGORY", no: 0 },
    { name: "LOCATION", no: 1 },
    { name: "INFO", no: 2 },
    { name: "IMAGES", no: 3 },
    { name: "DESCRIPTION", no: 4 },
    { name: "PRICE", no: 5 },
  ];
  const [step, setstep] = useState(totalstep[0]);
  const [selectedcategory, setSelectedcategory] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [totalguests, settotalguest] = useState(0);
  const [totalrooms, settotalroom] = useState(0);
  const [totalbathrooms, settotalbathrooms] = useState(0);
  const [images, setimages] = useState(null);
  const [titledesc, settitledesc] = useState(null);
  const [desc, setdesc] = useState(null);
  const [roomprice, setroomprice] = useState(200);
  const backBtn = () => {
    if (step.no > 0) setstep(totalstep[step.no - 1]);
  };

  const nextBtn = () => {
    if (step.no < 5) {
      if (!selectedcategory) {
        toast.error("Please select the category");
        return;
      }
      if (!selectedCountry && step.no == 1) {
        toast.error("Please select the country");
        return;
      }
      if ((!totalguests || !totalrooms) && step.no == 2) {
        toast.error("Please select the guests and rooms both");
        return;
      }
      if (!images && step.no == 3) {
        toast.error("Please upload image of your place");
        return;
      }
      if ((!titledesc || !desc) && step.no == 4) {
        toast.error("Please write title and description both");
        return;
      }
      setstep(totalstep[step.no + 1]);
    }
  };

  const addListing = async() => {
  if(session?.user?.email){
    try {
      setloading(true)
      const info = {
        selectedcategory,
        selectedCountry,
        totalguests,
        totalbathrooms,
        totalrooms,
        images,
        titledesc,
        desc,
        roomprice,
        secret: "thiswillbekailashloginsystem",
        email:session?.user?.email
      };
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/listing`,
        {
          method: "POST",
          body: JSON.stringify(info),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await responce.json();
      if (data.success) {
        toast(data.message, {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setSelectedCountry(null)
        setSelectedcategory(null)
        settitledesc(null)
        setdesc(null)
        setimages(null)
        setroomprice(200)
        settotalbathrooms(0)
        settotalguest(0)
        settotalroom(0)
        setstep(totalstep[0])
        setshowrentModal(false)
        router.push(router.pathname)
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
  }
  else{
    toast("For the listing sign in is required", {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  }
  };

  return (
    <>
      <Toaster />
      {showrentModal && (
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
            ${showrentModal ? "translate-y-0" : "translate-y-full"}
            ${showrentModal ? "opacity-100" : "opacity-0"}
            `}
            >
              <div className="relative flex flex-col w-full h-full bg-gray-100 border-0 rounded-lg shadow-lg outline-none dark:bg-gray-800 translate lg:h-auto md:h-auto focus:outline-none">
                <div className="relative flex items-center border-b-[1px] dark:border-gray-700 justify-between px-6 py-3">
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      setshowrentModal(false);
                    }}
                  >
                    <CloseOutlinedIcon />
                  </span>
                  <h1 className="text-black dark:text-white">
                    WanderStay is your home
                  </h1>
                  <h1></h1>
                </div>
                <div className="mx-6 mt-5">
                  {step.no === 0 && (
                    <Category
                      setSelectedcategory={setSelectedcategory}
                      selectedcategory={selectedcategory}
                    />
                  )}
                  {step.no === 1 && (
                    <Locations
                      setSelectedCountry={setSelectedCountry}
                      selectedCountry={selectedCountry}
                    />
                  )}
                  {step.no === 2 && (
                    <Info
                      totalbathrooms={totalbathrooms}
                      settotalbathrooms={settotalbathrooms}
                      totalguests={totalguests}
                      settotalguest={settotalguest}
                      totalrooms={totalrooms}
                      settotalroom={settotalroom}
                    />
                  )}
                  {step.no === 3 && (
                    <Images setimages={setimages} images={images} />
                  )}
                  {step.no === 4 && (
                    <Description
                      desc={desc}
                      setdesc={setdesc}
                      settitledesc={settitledesc}
                      titledesc={titledesc}
                    />
                  )}
                  {step.no === 5 && (
                    <Price roomprice={roomprice} setroomprice={setroomprice} />
                  )}
                </div>
                <div className="flex items-center justify-center px-6 py-2 space-x-3 text-center">
                  {step.no != 0 && (
                    <button
                      onClick={backBtn}
                      className="w-5/6 px-10 py-3 text-white rounded-lg bg-rose-600"
                    >
                      Back
                    </button>
                  )}
                  {step.no != 5 ? (
                    <button
                      onClick={nextBtn}
                      className="w-11/12 px-10 py-3 text-white rounded-lg bg-rose-600"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={addListing}
                      className="w-5/6 px-10 py-3 text-white rounded-lg bg-rose-600"
                    >
                      {loading ? (
                        <CircularProgress color="success" size={18} />
                      ) : (
                        "Create"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RentModal;
