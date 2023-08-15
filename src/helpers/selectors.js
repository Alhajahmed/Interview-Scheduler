// Get an array of appointments for a given day from the state
export function getAppointmentsForDay(state, day) {
  // Find the selected day object based on the provided day name
  const selectedDay = state.days.find((d) => d.name === day);

  // If the selected day doesn't exist or has no interviewers, return an empty array
  if (!selectedDay || selectedDay.interviewers.length === 0) {
    return [];
  }

  // Map over the appointments IDs for the selected day and retrieve the appointment details
  const appointmentsForDay = selectedDay.appointments.map((appointmentId) => {
    return state.appointments[appointmentId];
  });

  // Return the array of appointments for the selected day
  return appointmentsForDay;
}

// Get the formatted interview data from the state based on an interview object
export function getInterview(state, interview) {
  // Check if interview object and interviewer ID exist
  if (interview && interview.interviewer) {
    // Extract student and interviewer information
    const { student, interviewer } = interview;
    // Retrieve interviewer details from state's interviewers data
    const interviewerInfo = state.interviewers[interviewer];
    // If interviewer information is found, return the formatted interview data
    if (interviewerInfo) {
      return {
        student,
        interviewer: {
          id: interviewerInfo.id,
          name: interviewerInfo.name,
          avatar: interviewerInfo.avatar,
        },
      };
    }
  }
  // Return null if interview object is missing or interviewer information can't be found
  return null;
}

// Get an array of interviewers available on a given day from the state
export function getInterviewersForDay(state, day) {
  // Find the selected day object based on the provided day name
  const selectedDay = state.days.find((d) => d.name === day);
  // If the selected day doesn't exist or has no interviewers, return an empty array
  if (!selectedDay || selectedDay.interviewers.length === 0) {
    return [];
  }
  // Map over the interviewer IDs for the selected day and retrieve the interviewer details
  return selectedDay.interviewers.map((id) => state.interviewers[id]);
}