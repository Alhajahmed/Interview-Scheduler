import React from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from 'components/Appointment';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";

export default function Application(props) {
  // Destructure state, setDay, bookInterview, and cancelInterview from the custom hook
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  // Get the interviewers for the currently selected day
  const interviewers = getInterviewersForDay(state, state.day);

  // Generate an array of Appointment components for the current day's appointments
  const appointments = getAppointmentsForDay(state, state.day).map(
    appointment => {
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={getInterview(state, appointment.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  // Render the main structure of the application
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Sidebar content, including logo, day list, and Lighthouse Labs logo */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          {/* Render the DayList component with necessary props */}
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <section className="schedule">
          {/* Render the array of Appointment components */}
          {appointments}
          {/* Render an Appointment component for the last time slot */}
          <Appointment key="last" time="5pm" />
        </section>
      </section>
    </main>
  );
}
