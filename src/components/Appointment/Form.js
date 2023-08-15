import React, { useState } from 'react';
import Button from 'components/Button'; // Assuming the Button component is imported
import InterviewerList from 'components/InterviewerList'; // Assuming the InterviewerList component is imported

// Define the Form component
export default function Form({ onCancel, onSave, interviewers, student, interviewer }) {
  // The component receives several props:
  // - onCancel: A callback function to be called when the "Cancel" button is clicked
  // - onSave: A callback function to be called when the "Save" button is clicked
  // - interviewers: An array of interviewers to choose from
  // - student: The initial value for the student's name input
  // - interviewer: The initial value for the selected interviewer

  // State to manage the student's name input
  const [studentState, setStudent] = useState(student || "");

  // State to manage the selected interviewer
  const [interviewerState, setInterviewer] = useState(interviewer || null);

  // State to manage error messages
  const [error, setError] = useState("");

  // Handler for changes in the student's name input
  const handleStudentChange = (event) => {
    setStudent(event.target.value);
  };

  // Handler for changes in the selected interviewer
  const handleInterviewerChange = (selectedInterviewer) => {
    setInterviewer(selectedInterviewer);
  };

  // Reset the form state
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  // Handler for the "Cancel" button
  const cancel = () => {
    reset();
    onCancel();
  };

  // Handler for form submission (prevent default behavior)
  const handleSubmit = (event) => {
    event.preventDefault()
  };

  // Validate form inputs and call onSave callback
  function validate() {
    if (studentState === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewerState === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    onSave(studentState, interviewerState);
  }

  // Render the form
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={handleSubmit}>
          {/* Input for student's name */}
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={studentState}
            onChange={handleStudentChange}
            data-testid="student-name-input"
          />
        </form>
        {/* Display error messages */}
        <section className="appointment__validation">{error}</section>

        {/* Render the InterviewerList component */}
        <InterviewerList
          interviewers={interviewers}
          value={interviewerState}
          onChange={handleInterviewerChange}
        />
      </section>

      {/* Render the "Cancel" and "Save" buttons */}
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}