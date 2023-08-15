import React from 'react';

export default function Appointment({ onAdd }) {
  // The component receives a single prop:
  // - onAdd: A callback function to be called when the "Add" button is clicked

  return (
    <main className="appointment__add">
      {/* Display an image button for adding appointments */}
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={onAdd} // Call the onAdd callback function when the button is clicked
      />
    </main>
  );
}
