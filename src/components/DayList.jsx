import React from "react";
import DayListItem from "./DayListItem";

const DayList = (props) => {
  const { days, value, onChange } = props;

  const formatDay = () => {
    return days.map((thisDay) => {
      return (
        <DayListItem
          key={thisDay.id}
          name={thisDay.name}
          spots={thisDay.spots}
          selected={thisDay.name === value}
          setDay={() => onChange && onChange(thisDay.name)}
        />
      );
    });
  };

  return (
    <ul>
      {formatDay()}
    </ul>
  );
}

export default DayList;