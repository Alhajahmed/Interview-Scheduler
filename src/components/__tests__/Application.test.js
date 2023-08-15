import React from "react";
import axios from "axios";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  queryByText,
  getByAltText,
  queryByAltText,
  getAllByTestId,
  getByPlaceholderText,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  // Test case: Changing the schedule when a new day is selected
  it("changes the schedule when a new day is selected", async () => {
    // Render the Application component
    const { getByText } = render(<Application />);

    // Wait until the text "Monday" is displayed on the screen
    await waitForElement(() => getByText("Monday"));

    // Click on the "Tuesday" button
    fireEvent.click(getByText("Tuesday"));

    // Expect the text "Leopold Silvers" to be present on the screen
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  // Test case: Loading data, booking an interview, and reducing spots remaining
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // Render the Application component and get the container element
    const { container } = render(<Application />);

    // Wait for the "Archie Cohen" text to appear, indicating that data has loaded
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Get all appointment elements
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // Click the "Add" button to start booking a new interview
    fireEvent.click(getByAltText(appointment, "Add"));

    // Change the input value for the student's name
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    // Select an interviewer (Sylvia Palmer)
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Click the "Save" button to confirm the booking
    fireEvent.click(getByText(appointment, "Save"));

    // Expect the "Saving" indicator to be displayed while saving
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Wait for the updated student name ("Lydia Miller-Jones") to appear
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // Find the DayListItem for Monday
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    // Expect "no spots remaining" to be displayed for the day
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  // Test case: Loading data, editing an interview, and keeping spots remaining for Monday the same
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // Render the Application component and get the container element
    const { container } = render(<Application />);

    // Wait for the "Archie Cohen" text to appear, indicating that data has loaded
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Get all appointment elements
    const appointments = getAllByTestId(container, "appointment");

    // Find the appointment for "Archie Cohen"
    const appointment = appointments.find((appt) =>
      queryByText(appt, "Archie Cohen")
    );

    // Click the "Edit" button to initiate the editing process
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // Change the input value for the student's name to "Ahmed Alhajahmed"
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Ahmed Alhajahmed" },
    });

    // Select a different interviewer (Sylvia Palmer)
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Click the "Save" button to confirm the changes
    fireEvent.click(queryByText(appointment, "Save"));

    // Expect the "Saving" indicator to be displayed while saving
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Wait for the updated student name ("Ahmed Alhajahmed") to appear
    await waitForElement(() => getByText(appointment, "Ahmed Alhajahmed"));

    // Find the DayListItem for Monday
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    // Expect "1 spot remaining" to be displayed for the day
    expect(queryByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  // Test case: Showing the save error when failing to save an appointment
  it("shows the save error when failing to save an appointment", async () => {
    // Mock the axios.put function to simulate a failed save request
    axios.put.mockRejectedValueOnce(new Error("Failed to save appointment"));

    // Render the Application component and get the container element
    const { container } = render(<Application />);

    // Wait for the "Archie Cohen" text to appear, indicating that data has loaded
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Get all appointment elements
    const appointments = getAllByTestId(container, "appointment");

    // Find the appointment for "Archie Cohen"
    const appointment = appointments.find((appt) =>
      queryByText(appt, "Archie Cohen")
    );

    // Click the "Edit" button to initiate the editing process
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // Change the input value for the student's name to "Anne Jones"
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Anne Jones" },
    });

    // Select an interviewer (Sylvia Palmer)
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Click the "Save" button to attempt saving
    fireEvent.click(queryByText(appointment, "Save"));

    // Wait for the "Could not save appointment" error message to appear
    await waitForElement(() =>
      getByText(appointment, "Could not save appointment")
    );
  });

  // Test case: Showing the delete error when failing to delete an existing appointment
  it("shows the delete error when failing to delete an existing appointment", async () => {
    // Mock the axios.delete function to simulate a failed delete request
    axios.delete.mockRejectedValueOnce(
      new Error("Failed to delete appointment")
    );

    // Render the Application component and get the container element
    const { container } = render(<Application />);

    // Wait for the "Archie Cohen" text to appear, indicating that data has loaded
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Get all appointment elements
    const appointments = getAllByTestId(container, "appointment");

    // Find the appointment for "Archie Cohen"
    const appointment = appointments.find((appt) =>
      queryByText(appt, "Archie Cohen")
    );

    // Click the "Delete" button to initiate the deletion process
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // Expect the confirmation message to be displayed
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

    // Click the "Confirm" button to confirm the deletion
    fireEvent.click(queryByText(appointment, "Confirm"));

    // Wait for the "Could not delete appointment" error message to appear
    await waitForElement(() =>
      getByText(appointment, "Could not delete appointment")
    );
  });
});