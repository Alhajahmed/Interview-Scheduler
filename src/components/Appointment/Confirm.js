import React from 'react';
import Button from 'components/Button';

export default function Appointment({ message, onConfirm, onCancel }) {
  // The component receives three props:
  // - message: The message to display in the confirmation dialog
  // - onConfirm: A callback function to be called when the Confirm button is clicked
  // - onCancel: A callback function to be called when the Cancel button is clicked

  return (
    <main className="appointment__card appointment__card--confirm">
      {/* Display the provided message in a semi-bold heading */}
      <h1 className="text--semi-bold">{message}</h1>

      {/* Render the buttons for confirming or canceling the action */}
      <section className="appointment__actions">
        <Button danger onClick={onCancel}>
          Cancel
        </Button>
        <Button danger onClick={onConfirm}>
          Confirm
        </Button>
      </section>
    </main>
  );
}