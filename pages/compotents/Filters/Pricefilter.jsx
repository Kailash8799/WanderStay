import { InputAdornment, TextField } from "@mui/material";
import React from "react";

const Pricefilter = ({ roomprice, setroomprice }) => {
  return (
    <div>
      <h1 className="mx-3 text-lg font-bold text-start">Now, set your price</h1>
      <p className="mx-3 text-sm font-medium text-start">
        How much do you have charge per night?
      </p>
      <div className="max-h-[50vh] md:mx-4 my-5 mx-3 space-y-3 scroll-smooth no-scrollbar">
        <TextField
          className="w-11/12 text-black dark:text-white"
          id="price"
          label="Price*"
          variant="standard"
          margin="dense"
          name="Price"
          type="number"
          value={roomprice}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                ₹
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            setroomprice(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Pricefilter;
