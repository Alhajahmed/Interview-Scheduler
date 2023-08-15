import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // Initialize the state using the useState hook
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Function to update the currently selected day
  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  // Fetch data from API on component mount using useEffect
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((all) => {
        const [daysAPI, appointmentsAPI, interviewersAPI] = all;
        // Update the state with fetched data
        setState((prev) => ({
          ...prev,
          days: daysAPI.data,
          appointments: appointmentsAPI.data,
          interviewers: interviewersAPI.data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to book an interview
  const bookInterview = (id, interview) => {
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        // Update appointment data with new interview
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview },
        };
        // Update appointments data with new appointment
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        // Update spots count for each day
        const days = updateSpots(state, appointments);
        // Update the state with new appointments and days
        setState((prev) => ({
          ...prev,
          appointments,
          days
        }));
        return true;
      })
      .catch((error) => {
        console.error("Error updating appointment:", error);
        return false;
      });
  };

  // Function to cancel an interview
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        // Update spots count for each day
        const days = updateSpots(state, appointments);
        // Update the state with canceled appointment and updated spots
        setState((prev) => ({
          ...prev,
          appointments,
          days
        }));
        return true;
      })
      .catch((error) => {
        console.error("Error deleting interview:", error);
        return false;
      });
  };

  // Function to update remaining spots for each day
  const updateSpots = (state, appointments) => {
    const updatedDays = state.days.map((day) => {
      // Count spots based on interviews
      const spots = day.appointments.reduce((count, appointmentId) => {
        console.log(appointmentId);
        if (!appointments[appointmentId].interview) {
          return count + 1;
        }
        return count;
      }, 0);

      return { ...day, spots };
    });

    return updatedDays;
  };

  // Return state and functions for external use
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}