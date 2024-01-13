import React from "react";
import { categories } from "../Category/Categories";
import CardCat from "./CardCat";

const Category = ({ selectedcategory, setSelectedcategory }) => {
  return (
    <div>
      <h1 className="mx-3 text-lg font-bold text-start">Which of these best describes your place?</h1>
      <p className="mx-3 text-sm font-medium text-start">Pick a category</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto space-y-3 space-x-3 scroll-smooth no-scrollbar">
      {categories.map((item, key) => {
        return <CardCat
          label={item.label}
          Icons={item.icons}
          key={key}
          selected={selectedcategory == item.label}
          setSelectedcategory={setSelectedcategory}
        />;
      })}
    </div>
    </div>
  );
};

export default Category;
