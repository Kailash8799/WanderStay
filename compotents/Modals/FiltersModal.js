"use client";
import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { CircularProgress } from "@mui/material";
import { Toaster } from "react-hot-toast";
import Location from "../Filters/Location";
import Infofil from "../Filters/Infofil";
import Pricefilter from "../Filters/Pricefilter";
import DateFil from "../Filters/DateFil";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { formatISO } from "date-fns";

const FiltersModal = ({ showfilterModal, setshowfilterModal }) => {
  const [loading, setloading] = useState(false);
  const totalstep = [
    { name: "LOCATION", no: 0 },
    { name: "DATE", no: 1 },
    { name: "INFO", no: 2 },
    { name: "PRICE", no: 3 },
  ];
  const [step, setstep] = useState(totalstep[0]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [totalguests, settotalguest] = useState(0);
  const [totalrooms, settotalroom] = useState(0);
  const [totalbathrooms, settotalbathrooms] = useState(0);
  const [roomprice, setroomprice] = useState(0);
  const [selectdate,setselectdate] = useState(false)
  const router = useRouter();
  const params = useSearchParams();
  const initialdaterange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  const [date, setdate] = useState(initialdaterange);
  const disableDates = [];
  const backBtn = () => {
    if (step.no > 0) setstep(totalstep[step.no - 1]);
  };

  const nextBtn = () => {
    if (step.no < 3) {
      setstep(totalstep[step.no + 1]);
    }
  };

  const addFilter = async () => {
    setloading(true);

    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    let updatedquery = {
      ...currentQuery,
    };
    if (selectedCountry?.value) {
      updatedquery = { ...updatedquery, country: selectedCountry?.value };
    } else {
      if (params?.get("country")) {
        delete updatedquery?.country;
      }
    }

    if (totalbathrooms > 0) {
      updatedquery = { ...updatedquery, bathrooms: totalbathrooms };
    } else {
      if (params?.get("bathrooms")) {
        delete updatedquery?.bathrooms;
      }
    }
    if (totalguests > 0) {
      updatedquery = { ...updatedquery, guests: totalguests };
    } else {
      if (params?.get("guests")) {
        delete updatedquery?.guests;
      }
    }
    if (totalrooms > 0) {
      updatedquery = { ...updatedquery, rooms: totalrooms };
    } else {
      if (params?.get("rooms")) {
        delete updatedquery?.rooms;
      }
    }

    if (roomprice > 0) {
      updatedquery = { ...updatedquery, roomprice: roomprice };
    } else {
      if (params?.get("roomprice")) {
        delete updatedquery?.roomprice;
      }
    }
    if (date && selectdate) {
      updatedquery = {
        ...updatedquery,
        startdate: formatISO(date.startDate),
        enddate: formatISO(date.endDate),
      };
    } else {
      if (params?.get("startdate")) {
        delete updatedquery?.startdate;
      }
      if (params?.get("enddate")) {
        delete updatedquery?.enddate;
      }
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedquery,
      },
      { skipNull: true }
    );

    router.push(url);
    setstep(totalstep[0]);
    setSelectedCountry(null);
    settotalbathrooms(0);
    settotalguest(0);
    settotalroom(0);
    setroomprice(0);
    setdate(initialdaterange);
    setloading(false);
    setselectdate(false)
    setshowfilterModal(false);
  };

  return (
    <>
      <Toaster />
      {showfilterModal && (
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
            ${showfilterModal ? "translate-y-0" : "translate-y-full"}
            ${showfilterModal ? "opacity-100" : "opacity-0"}
            `}
            >
              <div className="relative flex flex-col w-full h-full bg-gray-100 border-0 rounded-lg shadow-lg outline-none dark:bg-gray-800 translate lg:h-auto md:h-auto focus:outline-none">
                <div className="relative flex items-center border-b-[1px] dark:border-gray-700 justify-between px-6 py-3">
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      setshowfilterModal(false);
                    }}
                  >
                    <CloseOutlinedIcon />
                  </span>
                  <h1 className="text-black dark:text-white">
                    Airbnb is your home
                  </h1>
                  <h1></h1>
                </div>
                <div className="mx-6 mt-5">
                  {step.no === 0 && (
                    <Location
                      setSelectedCountry={setSelectedCountry}
                      selectedCountry={selectedCountry}
                    />
                  )}
                  {step.no === 1 && (
                    <DateFil
                      date={date}
                      setdate={setdate}
                      disableDates={disableDates}
                      selectdate={selectdate}
                      setselectdate={setselectdate}
                    />
                  )}
                  {step.no === 2 && (
                    <Infofil
                      totalbathrooms={totalbathrooms}
                      settotalbathrooms={settotalbathrooms}
                      totalguests={totalguests}
                      settotalguest={settotalguest}
                      totalrooms={totalrooms}
                      settotalroom={settotalroom}
                    />
                  )}
                  {step.no === 3 && (
                    <Pricefilter
                      setroomprice={setroomprice}
                      roomprice={roomprice}
                    />
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
                  {step.no != 3 ? (
                    <button
                      onClick={nextBtn}
                      className="w-11/12 px-10 py-3 text-white rounded-lg bg-rose-600"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={addFilter}
                      className="w-5/6 px-10 py-3 text-white rounded-lg bg-rose-600"
                    >
                      {loading ? (
                        <CircularProgress color="success" size={18} />
                      ) : (
                        "Apply"
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

export default FiltersModal;
