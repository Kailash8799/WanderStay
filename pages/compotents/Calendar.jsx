import React from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const Calendar = ({ value, disableDates, setbookrangedate }) => {
  return (
    <div className="mx-auto rounded-lg">
      <DateRange
        disabledDates={disableDates}
        className="rounded-lg"
        onChange={(value) => {setbookrangedate(value.selection)}}
        direction="vertical"
        rangeColors={['#f33e5b']}
        ranges={[value]}
        minDate={new Date()}
        editableDateInputs={true}
      />
    </div>
  );
};

export default Calendar;
