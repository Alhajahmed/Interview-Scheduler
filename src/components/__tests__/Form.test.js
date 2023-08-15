import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
  ];

  // Test case: Validate student name is not blank
  it("validates that the student name is not blank", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();

    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("validates that the interviewer cannot be null", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();

    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined */
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} student="Lydia Miller-Jones" />
    );

    /* 3. Click the save button */
    fireEvent.click(getByText("Save"));

    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  // Test case: Successfully saving after trying to submit an empty student name
  it("can successfully save after trying to submit an empty student name", () => {
    // Create a mock function for the onSave callback
    const onSave = jest.fn();

    // Render the Form component with interviewers, onSave callback, and initial interviewer value
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} interviewer={1} />
    );

    // Simulate clicking the "Save" button without entering a student name
    fireEvent.click(getByText("Save"));

    // Expect the error message for empty student name to be displayed
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

    // Expect the onSave callback not to have been called
    expect(onSave).not.toHaveBeenCalled();

    // Simulate changing the input value for the student's name to "Lydia Miller-Jones"
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    // Simulate clicking the "Save" button after entering a student name
    fireEvent.click(getByText("Save"));

    // Expect the error message for empty student name to be cleared
    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    // Expect the onSave callback to have been called once
    expect(onSave).toHaveBeenCalledTimes(1);

    // Expect the onSave callback to have been called with the specified arguments
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });

  // Test case: Calling onCancel and resetting the input field
  it("calls onCancel and resets the input field", () => {
    // Create a mock function for the onCancel callback
    const onCancel = jest.fn();

    // Render the Form component with interviewers, a student name, onSave callback, and onCancel callback
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        student="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );

    // Simulate clicking the "Save" button without making any changes
    fireEvent.click(getByText("Save"));

    // Simulate changing the input value for the student's name to "Lydia Miller-Jones"
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    // Simulate clicking the "Cancel" button
    fireEvent.click(getByText("Cancel"));

    // Expect the error message for an empty student name to be cleared
    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    // Expect the input field for the student's name to be reset to an empty value
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");

    // Expect the onCancel callback to have been called once
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
