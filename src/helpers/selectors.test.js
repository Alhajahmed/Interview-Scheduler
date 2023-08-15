import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

const state = {
  // Sample data for testing
  days: [
    // Day with appointments and interviewers
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1, 2],
    },
    // Day with appointments and interviewers
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [1, 2]
    }
  ],
  appointments: {
    // An appointment with no interview
    "1": { id: 1, time: "12pm", interview: null },
    // An appointment with no interview
    "2": { id: 2, time: "1pm", interview: null },
    // An appointment with an interview
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    // An appointment with no interview
    "4": { id: 4, time: "3pm", interview: null },
    // An appointment with an interview
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    // Interviewer with an avatar
    "1": {
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    // Interviewer with an avatar
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};

// Test if getAppointmentsForDay returns an array
test("getAppointmentsForDay returns an array", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

// Test if getAppointmentsForDay returns an array with a length matching the number of appointments for that day
test("getAppointmentsForDay returns an array with a length matching the number of appointments for that day", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(result.length).toEqual(3);
});

// Test if getAppointmentsForDay returns an array containing the correct appointment objects
test("getAppointmentsForDay returns an array containing the correct appointment objects", () => {
  const [first, second] = getAppointmentsForDay(state, "Tuesday");
  expect(first).toEqual(state.appointments["4"]);
  expect(second).toEqual(state.appointments["5"]);
});

// Test if getAppointmentsForDay returns an empty array when the days data is empty
test("getAppointmentsForDay returns an empty array when the days data is empty", () => {
  const result = getAppointmentsForDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

// Test if getAppointmentsForDay returns an empty array when the day is not found
test("getAppointmentsForDay returns an empty array when the day is not found", () => {
  const result = getAppointmentsForDay(state, "Wednesday");
  expect(result.length).toEqual(0);
});

// Test if getInterview returns an object with the interviewer data
test("getInterview returns an object with the interviewer data", () => {
  const result = getInterview(state, state.appointments["3"].interview);
  expect(result).toEqual(
    expect.objectContaining({
      student: expect.any(String),
      interviewer: expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        avatar: expect.any(String)
      })
    })
  );
});

// Test if getInterview returns null if no interview is booked
test("getInterview returns null if no interview is booked", () => {
  const result = getInterview(state, state.appointments["2"].interview);
  expect(result).toBeNull();
});

// Test if getInterviewersForDay returns an array
test('getInterviewersForDay returns an array', () => {
  const result = getInterviewersForDay(state, 'Monday');
  expect(Array.isArray(result)).toBe(true);
});

// Test if getInterviewersForDay returns an array with a length matching the number of interviewers for that day
test('getInterviewersForDay returns an array with a length matching the number of interviewers for that day', () => {
  const result = getInterviewersForDay(state, 'Monday');
  expect(result.length).toEqual(2);
});

// Test if getInterviewersForDay returns an array containing the correct interviewer objects
test('getInterviewersForDay returns an array containing the correct interviewer objects', () => {
  const result = getInterviewersForDay(state, 'Tuesday');
  const expectedInterviewers = [
    state.interviewers['1'],
    state.interviewers['2'],
  ];
  expect(result).toEqual(expectedInterviewers);
});

// Test if getInterviewersForDay returns an empty array when the days data is empty
test('getInterviewersForDay returns an empty array when the days data is empty', () => {
  const result = getInterviewersForDay({ days: [] }, 'Monday');
  expect(result.length).toEqual(0);
});

// Test if getInterviewersForDay returns an empty array when the day is not found
test('getInterviewersForDay returns an empty array when the day is not found', () => {
  const result = getInterviewersForDay(state, 'Wednesday');
  expect(result.length).toEqual(0);
});