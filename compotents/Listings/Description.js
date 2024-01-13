import { TextField } from "@mui/material";
import React from "react";

const Description = ({ titledesc, settitledesc, desc, setdesc }) => {
  return (
    <div>
      <h1 className="mx-3 text-lg font-bold text-start">
        How would you describe your place?
      </h1>
      <p className="mx-3 text-sm font-medium text-start">
        Short and sweet works best!
      </p>
      <div className="max-h-[50vh] md:mx-5 mx-3 space-y-5 mb-5 scroll-smooth no-scrollbar">
        <TextField
          className="w-4/5 text-black dark:text-white"
          id="title"
          label="Title*"
          variant="standard"
          margin="dense"
          name="Title"
          type="text"
          value={titledesc}
          onChange={(e) => {
            settitledesc(e.target.value);
          }}
        />
        <TextField
          className="w-4/5 text-black dark:text-white"
          id="desc"
          label="Description*"
          variant="standard"
          margin="dense"
          name="Description"
          type="text"
          value={desc}
          onChange={(e) => {
            setdesc(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Description;
