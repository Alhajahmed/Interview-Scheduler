// Define fixture data for testing purposes
const fixtures = {
  days: [
    // Sample data for a day (Monday)
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2],
      interviewers: [1, 2],
      spots: 1
    },
    // Sample data for another day (Tuesday)
    {
      id: 2,
      name: "Tuesday",
      appointments: [3, 4],
      interviewers: [3, 4],
      spots: 1
    }
  ],
  appointments: {
    // Sample data for appointment with no interview
    1: { id: 1, time: "12pm", interview: null },
    // Sample data for appointment with interview
    2: {
      id: 2,
      time: "1pm",
      interview: { student: "Archie Cohen", interviewer: 2 },
    },
    // Sample data for appointment with another interview
    3: {
      id: 3,
      time: "2pm",
      interview: { student: "Leopold Silvers", interviewer: 4 },
    },
    // Sample data for appointment with no interview
    4: { id: 4, time: "3pm", interview: null },
  },
  interviewers: {
    // Sample data for an interviewer
    1: {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
    // Sample data for another interviewer
    2: {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png",
    },
    // Sample data for another interviewer
    3: {
      id: 3,
      name: "Mildred Nazir",
      avatar: "https://i.imgur.com/T2WwVfS.png",
    },
    // Sample data for another interviewer
    4: {
      id: 4,
      name: "Cohana Roy",
      avatar: "https://i.imgur.com/FK8V841.jpg",
    },
  },
};

// Export mock functions for API calls using Jest's mocking mechanism
export default {
  // Mock implementation for the GET request
  get: jest.fn((url) => {
    if (url === "/api/days") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.days
      });
    }

    if (url === "/api/appointments") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.appointments
      });
    }

    if (url === "/api/interviewers") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.interviewers
      });
    }
  }),

  // Mock implementation for the PUT request
  put: jest.fn(() => {
    return Promise.resolve({
      status: 204,
      statusText: "No Content",
    });
  }),

  // Mock implementation for the DELETE request
  delete: jest.fn(() => {
    return Promise.resolve({
      status: 204,
      statusText: "No Content",
    });
  })
};