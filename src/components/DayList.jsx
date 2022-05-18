import React from "react";
import DayListItem from "./DayListItem";

const DayList = (props) => {
  const { days, day, setDay } = props;

  const formatDay = () => {
    return days.map((thisDay) => {
      return (
        <DayListItem
          key={thisDay.id}
          name={thisDay.name}
          spots={thisDay.spots}
          selected={thisDay.name === day}
          setDay={() => setDay && setDay(thisDay.name)}
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