import React, { Fragment } from 'react'

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import "index.scss";
import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment/index.js";
import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import Confirm from "components/Appointment/Confirm"
import Status from "components/Appointment/Status"
import Error from "components/Appointment/Error"
import Form from "components/Appointment/Form"


const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

// Define stories for the "Button" component
storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) // Set background parameters for the stories
  .add("Base", () => <Button>Base</Button>) // Story for the base Button
  .add("Confirm", () => <Button confirm>Confirm</Button>) // Story for the confirm Button
  .add("Danger", () => <Button danger>Cancel</Button>) // Story for the danger Button
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  )) // Story for a clickable Button
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  )); // Story for a disabled Button

// Define stories for the "DayListItem" component
storiesOf("DayListItem", module) // Initiates Storybook and registers our DayListItem component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) // Provides the default background color for our component
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) // Story for an unselected day with available spots
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />) // Story for a selected day with available spots
  .add("Full", () => <DayListItem name="Monday" spots={0} />) // Story for a day with no available spots
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} />
  )) // Story for a clickable day with available spots; action() allows us to create a callback that appears in the actions panel when clicked

// Define stories for the "DayList" component
storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  }) // Provides the default background color for our component
  .add("Monday", () => (
    <DayList days={days} value={"Monday"} onChange={action("setDay")} />
  )) // Story for the "Monday" day selection with associated days data and change handler
  .add("Tuesday", () => (
    <DayList days={days} value={"Tuesday"} onChange={action("setDay")} />
  )) // Story for the "Tuesday" day selection with associated days data and change handler
  .add("Wednesday", () => (
    <DayList days={days} value={"Wednesday"} onChange={action("setDay")} />
  )) // Story for the "Wednesday" day selection with associated days data and change handler

// Define stories for the "InterviewerListItem" component
storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) // Provides the default background color for our component
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  )) // Story for an unselected interviewer item with the associated interviewer data
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  )) // Story for a selected interviewer item with the associated interviewer data
  .add("Clickable", () => (
    <InterviewerListItem
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={() => action("setInterviewer")(interviewer.id)}
    />
  )); // Story for a clickable interviewer item with the associated interviewer data and interactive behavior

// Define stories for the "InterviewerList" component
storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) // Provides the default background color for our component
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
    />
  )) // Story for the initial state of the interviewer list
  .add("Selected", () => (
    <InterviewerList
      interviewers={interviewers}
      value={3}
    />
  )) // Story for the selected state of the interviewer list
  .add("Clickable", () => (
    <InterviewerList
      interviewers={interviewers}
      onChange={action("setInterviewer")}
    />
  )); // Story for the clickable state of the interviewer list with interactive behavior

// Define stories for the "Appointment" component
storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  }) // Provides the default background color for our component
  .add("Appointment", () => <Appointment />)
  .add("Appointment with Time", () => <Appointment time="12pm" />)
  .add("Header", () => <Header time="12pm" />)
  .add("Empty", () => <Empty onAdd={action("onAdd")} />)
  .add("Show", () => <Show
    student={"Lydia Miller-Jones"}
    interviewer={interviewer}
    onEdit={action("onEdit")}
    onDelete={action("onDelete")}
  />
  ) // Story for showing an appointment with its details
  .add("Confirm ", () => <Confirm
    message={"Delete the appointment?"}
    onConfirm={action("onConfirm")}
    onCancel={action("onCancel")}
  />
  ) // Story for the confirmation dialog when deleting an appointment
  .add("Status ", () => <Status message={"Deleting"} />)
  .add("Error  ", () => <Error
    message={"Could not delete appointment"}
    onClose={action("onClose")}
  />
  )
  .add("Edit", () => <Form
    student={"Ahmed"}
    interviewer={1}
    interviewers={interviewers}
    onSave={action("onSave")}
    onCancel={action("onCancel")}
  />
  ) // Story for editing an existing appointment
  .add("Create", () => <Form
    interviewers={interviewers}
    onSave={action("onSave")}
    onCancel={action("onCancel")}
  />
  ) // Story for creating a new appointment
  .add("Appointment Empty", () => (
    <Fragment>
      <Appointment id={1} time="4pm" />
      <Appointment time="5pm" />
    </Fragment>
  )) // Story for an empty appointment slot
  .add("Appointment Booked", () => (
    <Fragment>
      <Appointment
        id={1}
        time="4pm"
        interview={{ student: "Lydia Miller-Jones", interviewer }}
      />
      <Appointment time="5pm" />
    </Fragment>
  )) // Story for a booked appointment with a student and interviewer