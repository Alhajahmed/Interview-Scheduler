# Interview Scheduler

Welcome to Interview Scheduler! A dynamic single-page application (SPA) designed to revolutionize your interview scheduling process. Explore a plethora of innovative features that redefine how you book and manage technical interviews for students and mentors.

## Features

1. Time-Bound Appointments: Seamlessly schedule interviews between the convenient hours of 12 PM and 5 PM, spanning Monday through Friday. This tailored timeframe ensures optimal availability for both students and mentors.

2. Comprehensive Scheduling: Each interview appointment encapsulates one student and one interviewer, promoting focused and effective interactions.

3. User-Friendly Creation: Creating appointments is a breeze. Enter any student name, while the interviewer selection process is streamlined through a predefined list. Experience seamless input and confirmation.

4. Smart Management: Enjoy ultimate control over appointments. You can save, edit, or delete appointments with ease, adapting to changing circumstances effortlessly.

5. Holistic Schedule View: Navigate the entire schedule at a glance. With intuitive visualization, view appointments across all days of the week. This comprehensive perspective ensures an informed scheduling approach.

6. Effortless Editing: Modify appointments to cater to evolving situations. Whether rescheduling or altering appointment details, the editing process is intuitive and user-centric.

7. Seamless Data Interaction: Leveraging the power of React, our front-end seamlessly communicates with a dedicated API, effortlessly fetching and storing appointment data in a robust database.

## Final Product

## Technologies

- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/)
- [Cypress](https://www.cypress.io/app/)
- [React](https://react.dev/)
- [axios](https://www.npmjs.com/package/axios)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/)
- [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server)

## Setup

1. Clone this repo: `git clone https://github.com/Alhajahmed/Interview-Scheduler`

2. Navigate to the project directory: `cd Interview-Scheduler`

3. Install dependencies: `npm install`

4. View the app in the browser: `npm start`

5. For tseting:
   - `npm run storybook` for storybook
   - `npm npm test` fro jest
   - `npm run cypress` for cypress BUT for this one you need to run the [scheduler-api server](https://github.com/lighthouse-labs/scheduler-api) which was provided by LHL in test mode with `npm run test:server` while runnig the app.

Enjoy using Interview Scheduler and streamlining the interview booking process!
