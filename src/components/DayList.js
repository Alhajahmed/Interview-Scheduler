import React from 'react';
import DayListItem from "components/DayListItem";

export default function DayList({ days, day, setDay }) {

  // Map through the days array to create an array of DayListItem components
  const dayListItems = days.map((dayItem) => (
    <DayListItem
      key={dayItem.id}
      name={dayItem.name}
      spots={dayItem.spots}
      selected={dayItem.name === day}
      setDay={setDay}
    />
  ));

  // Render an unordered list containing the array of DayListItem components
  return <ul>{dayListItems}</ul>;
}