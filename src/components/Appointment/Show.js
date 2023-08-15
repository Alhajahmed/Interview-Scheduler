import React from 'react';

// Define the Appointment component
export default function Appointment({ onDelete, onEdit, student, interviewer }) {
  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        {/* Display the student name */}
        <h2 className="text--regular">{student}</h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          {/* Display the selected interviewer's name */}
          <h3 className="text--regular">{interviewer.name}</h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          {/* Edit button */}
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={onEdit}
          />
          {/* Delete button */}
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={onDelete}
          />
        </section>
      </section>
    </main>
  );
}