import React from "react";
import Calendar from "../Calendar";
import { Checkbox } from "@mui/material";

const DateFil = ({ date, setdate, disableDates,selectdate,setselectdate }) => {
  return (
    <div>
      <Calendar
        value={date}
        disableDates={disableDates}
        setbookrangedate={setdate}
      />
      <div className="flex items-center space-x-4">
        <Checkbox
          value={selectdate}
          onChange={() => {
            setselectdate(!selectdate);
          }}
        />
        <h1>Please check the checkbox for apply date filter.</h1>
      </div>
    </div>
  );
};

export default DateFil;
