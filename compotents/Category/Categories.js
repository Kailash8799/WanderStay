import React, { useState } from "react";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiBarn, GiBoatFishing, GiBoatHorizon, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryCard from "./CategoryCard";
import { useSearchParams } from "next/navigation";
import {FaSkiing} from 'react-icons/fa'
import {BsSnow} from 'react-icons/bs'
import { IoDiamond } from "react-icons/io5";

export const categories = [
  {
    label: "Beach",
    icons: TbBeach,
    desc: "This property is close to the bitch",
  },
  {
    label: "Windmills",
    icons: GiWindmill,
    desc: "This property is close to the bitch",
  },
  {
    label: "Modern",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Rooms",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Farms",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Amazing pools",
    icons: TbPool,
    desc: "This property is close to the bitch",
  },
  {
    label: "Amazing views",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Castles",
    icons: GiCastle,
    desc: "This property is close to the bitch",
  },
  {
    label: "Beachfront",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Tropical",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "National parks",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Countryside",
    icons: TbMountain,
    desc: "This property is close to the bitch",
  },
  {
    label: "Cabins",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Treehouses",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Lake",
    icons: GiBoatFishing,
    desc: "This property is close to the bitch",
  },
  {
    label: "Design",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "OMG!",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Iconic cities",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Luxe",
    icons: IoDiamond,
    desc: "This property is close to the bitch",
  },
  {
    label: "Camping",
    icons: GiForestCamp,
    desc: "This property is close to the bitch",
  },
  {
    label: "Islands",
    icons: GiIsland,
    desc: "This property is close to the bitch",
  },
  {
    label: "Lakefront",
    icons: GiBoatHorizon,
    desc: "This property is close to the bitch",
  },
  {
    label: "Mansions",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Off-the-greed",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Top of  the world",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Tiny homes",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Trending",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Boats",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Vineyards",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Earth homes",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Skiing",
    icons: FaSkiing,
    desc: "This property is close to the bitch",
  },
  {
    label: "Caves",
    icons: GiCaveEntrance,
    desc: "This property is close to the bitch",
  },
  {
    label: "Historical homes",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Barns",
    icons: GiBarn,
    desc: "This property is close to the bitch",
  },
  {
    label: "Bed & breakfasts",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Houseboats",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "New",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Desert",
    icons: GiCactus,
    desc: "This property is close to the bitch",
  },
  {
    label: "Containers",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Creative spaces",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Minsus",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Play",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Hanoks",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Shepherd's huts",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Riads",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Domes",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "A-frames",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Chef's kitchens",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Ski-in/out",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Towers",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Ryokans",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Trulli",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Arctic",
    icons: BsSnow,
    desc: "This property is close to the bitch",
  },
  {
    label: "Casas particulares",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Cycladic homes",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Surfing",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Grand pianos",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Yurts",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Camper vans",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Golfing",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Adapted",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
  {
    label: "Dammusi",
    icons: MdOutlineVilla,
    desc: "This property is close to the bitch",
  },
];


const Categories = ({setslidewidth}) => {
  const params = useSearchParams()
  const category = params?.get('category');

  const widht = ()=>{
    var slider = document.getElementById('slidercat');
    setslidewidth(slider.scrollLeft)
  }
  return (
    <div id="slidercat" onScroll={widht} className="flex flex-row items-center justify-between pt-4 overflow-x-auto scroll-smooth no-scrollbar">
      {categories.map((item, ind) => {
        return (
          <CategoryCard
            key={ind}
            label={item.label}
            Icons={item.icons}
            desc={item.desc}
            selected={category === item.label}
          />
        );
      })}
    </div>
  );
};

export default Categories;
