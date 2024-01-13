import React, { useEffect, useState } from "react";
import Select from "react-select";
import useCountries from "../Listings/Countries";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("../Listings/Map"), {
  ssr: false,
});

const Location = ({ setSelectedCountry, selectedCountry }) => {
  const { getAll } = useCountries();
  const [themecolor, setthemecolor] = useState("dark");
  useEffect(() => {
    const theme = localStorage.getItem("thememode");
    setthemecolor(theme);
  }, []);
  return (
    <div>
      <h1 className="text-lg font-bold text-start">
        Where is your place located?
      </h1>
      <p className="text-sm font-medium text-start">Help guests find you!</p>
      <div className="gap-3 h-[55vh] overflow-y-auto space-y-3 space-x-3 scroll-smooth no-scrollbar">
        <div className="z-50">
          <Select
            options={getAll()}
            className="z-50 mt-3 text-black dark:text-white"
            placeholder="Anywhere"
            isClearable
            styles={{
              control: (styles) => ({
                ...styles,
                backgroundColor:
                  themecolor == "dark" ? "rgb(75 85 99);" : "white",
              }),
              option: (styles) => ({ ...styles, color: "red",zIndex:1000 }),
            }}
            value={selectedCountry}
            onChange={(value) => {
              setSelectedCountry(value);
            }}
            formatOptionLabel={(option) => (
              <div className="flex flex-row items-center gap-3">
                <div>{option.flag}</div>
                <div>
                  {option.label},<span className="ml-1">{option.region}</span>
                </div>
              </div>
            )}
          />
        </div>
        <div className="overflow-x-auto overflow-y-auto">
          <MapWithNoSSR selectedCountry={selectedCountry}/>
        </div>
      </div>
    </div>
  );
};

export default Location;
