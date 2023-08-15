import React from 'react';

export default function Appointment({ onClose, message }) {
  // The component receives two props:
  // - onClose: A callback function to be called when the "Close" button is clicked
  // - message: The error message to be displayed in the component

  return (
    <main className="appointment__card appointment__card--error">
      {/* Display the error message and a "Close" button */}
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{message}</h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={onClose} // Call the onClose callback function when the button is clicked
      />
    </main>
  );
}