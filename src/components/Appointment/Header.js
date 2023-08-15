import React from 'react';

export default function Appointment({ time }) {
  // The component receives a single prop:
  // - time: The time value to be displayed for the appointment

  return (
    <header className="appointment__time">
      {/* Display the appointment time */}
      <h4 className="text--semi-bold">{time}</h4>
      {/* Display a horizontal line separator */}
      <hr className="appointment__separator" />
    </header>
  );
}