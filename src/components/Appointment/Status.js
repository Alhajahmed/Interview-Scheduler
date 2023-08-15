import React from 'react';

// Define the Appointment component
export default function Appointment({ message }) {
  return (
    <main className="appointment__card appointment__card--status">
      {/* Display the loading image */}
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      {/* Display the provided message */}
      <h1 className="text--semi-bold">{message}</h1>
    </main>
  );
}