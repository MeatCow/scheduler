import React from "react";

import "components/styles/DayListItem.scss"
import classNames from "classnames";

const DayListItem = (props) => {
  const { name, spots, selected, setDay } = props;

  const formatSpots = () => {
    switch (spots) {
      case 0:
        return `no spots remaining`;
      case 1:
        return `1 spot remaining`;
      default:
        return `${spots} spots remaining`;
    }
  }

  const itemClasses = classNames({
    "day-list__item": true,
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  });

  return (
    <li className={itemClasses} onClick={setDay}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
};

export default DayListItem;