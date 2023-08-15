import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem({ name, spots, selected, setDay }) {
  // Use 'classNames' library to generate dynamic classes for the DayListItem element
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected, // Apply this class when the day is selected
    "day-list__item--full": spots === 0, // Apply this class when there are no spots remaining
  });

  // Function to format the spots information
  const formatSpots = (spots) => {
    if (spots === 0) {
      return "no spots remaining";
    } else if (spots === 1) {
      return "1 spot remaining";
    } else {
      return `${spots} spots remaining`;
    }
  };

  // Render a list item element for the day with appropriate styling and content
  return (
    <li className={dayClass} onClick={() => setDay(name)} data-testid="day">
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
