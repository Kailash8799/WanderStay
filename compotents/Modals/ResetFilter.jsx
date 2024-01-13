"use client";
import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Toaster } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import Checkbox from "@mui/material/Checkbox";

const ResetFilter = ({ showresetfilterModal, setshowresetfilterModal }) => {
  const router = useRouter();
  const params = useSearchParams();
  const [country, setcountry] = useState(false);
  const [category, setcategory] = useState(false);
  const [date, setdate] = useState(false);
  const [guest, setguest] = useState(false);
  const [room, setroom] = useState(false);
  const [bathroom, setbathroom] = useState(false);
  const [price, setprice] = useState(false);

  const resetFilters = async () => {
    console.log(country,date,guest,room,bathroom,price);
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    let updatedquery = {
      ...currentQuery,
    };
    if(category){
      if(params?.get('category')){
        delete updatedquery.category
      }
    }
    if(country){
      if(params?.get('country')){
        delete updatedquery.country
      }
    }
    if(guest){
      if(params?.get('guests')){
        delete updatedquery.guests
      }
    }
    if(bathroom){
      if(params?.get('bathrooms')){
        delete updatedquery.bathrooms
      }
    }
    if(room){
      if(params?.get('rooms')){
        delete updatedquery.rooms
      }
    }
    if(date){
      if (params?.get("startdate")) {
        delete updatedquery?.startdate;
      }
      if (params?.get("enddate")) {
        delete updatedquery?.enddate;
      }
    }
    if(price){
      if (params?.get("roomprice")) {
        delete updatedquery?.roomprice;
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
    setcategory(false)
    setcountry(false)
    setguest(false)
    setbathroom(false)
    setroom(false)
    setdate(false)
    setprice(false)
    setshowresetfilterModal(false);
  };

  return (
    <>
      <Toaster />
      {showresetfilterModal && (
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
            ${showresetfilterModal ? "translate-y-0" : "translate-y-full"}
            ${showresetfilterModal ? "opacity-100" : "opacity-0"}
            `}
            >
              <div className="relative flex flex-col w-full h-full bg-gray-100 border-0 rounded-lg shadow-lg outline-none dark:bg-gray-800 translate lg:h-auto md:h-auto focus:outline-none">
                <div className="relative flex items-center border-b-[1px] dark:border-gray-700 justify-between px-6 py-3">
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      setshowresetfilterModal(false);
                    }}
                  >
                    <CloseOutlinedIcon />
                  </span>
                  <h1 className="text-black dark:text-white">Reset Filters</h1>
                  <h1></h1>
                </div>
                <div className="mt-5 mx-9">
                  <h1 className="mx-3 text-lg font-bold text-start">
                    Please select that filters which you want to reset?
                  </h1>
                  <p className="mx-3 text-sm font-medium text-start">
                    Pick the filters
                  </p>
                  <div className="mx-2">
                    <div className="flex items-center space-x-4">
                      <Checkbox
                        value={category}
                        onChange={() => {
                          setcategory(!category);
                        }}
                      />
                      <h1>Category</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Checkbox
                        value={country}
                        onChange={() => {
                          setcountry(!country);
                        }}
                      />
                      <h1>Country</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Checkbox
                        value={date}
                        onChange={() => {
                          setdate(!date);
                        }}
                      />
                      <h1>Date</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Checkbox
                        value={guest}
                        onChange={() => {
                          setguest(!guest);
                        }}
                      />
                      <h1>Guests</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Checkbox
                        value={room}
                        onChange={() => {
                          setroom(!room);
                        }}
                      />
                      <h1>Rooms</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Checkbox
                        value={bathroom}
                        onChange={() => {
                          setbathroom(!bathroom);
                        }}
                      />
                      <h1>Bathrooms</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Checkbox
                        value={price}
                        onChange={() => {
                          setprice(!price);
                        }}
                      />
                      <h1>Price</h1>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center px-6 py-2 space-x-3 text-center">
                  <button
                    onClick={resetFilters}
                    className="w-11/12 px-10 py-3 text-white rounded-lg bg-rose-600"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetFilter;
