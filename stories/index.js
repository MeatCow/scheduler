import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import { days } from "data/days";
import { interviewer, interviewers } from 'data/interviewers';

import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment/index";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
  // Provides the default background color for our component
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) // To define our stories, we call add() once for each of our test states to generate a story
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={() => action("setDay")("Tuesday")} spots={5} /> // action() allows us to create a callback that appears in the actions panel when clicked
  ));

storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} value={"Monday"} onChange={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} value={"Tuesday"} onChange={action("setDay")} />
  ))
  .add("Wednesday", () => (
    <DayList days={days} value={"Wednesday"} onChange={action("setDay")} />
  ));

storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => (
    <InterviewerListItem
      {...interviewer}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      {...interviewer}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      {...interviewer}
      setInterviewer={() => action("setInterviewer")(interviewer.id)}
    />
  ));

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
    />
  ))
  .add("Selected", () => (
    <InterviewerList
      interviewers={interviewers}
      value={3}
    />
  ))
  .add("Clickable", () => (
    <InterviewerList
      interviewers={interviewers}
      onChange={action("setInterviewer")}
    />
  ));

storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => <Appointment />)
  .add("Appointment with Time", () => <Appointment time="12pm" />)
  .add("Header", () => <Header time="12pm" />)
  .add("Empty", () => <Empty onAdd={action("onAdd")} />)
  .add("Show", () => (
    <Show
      student="Matthieu Pauze"
      interviewer={interviewer}
      onEdit={action("onEdit")}
      onDelete={action("onDelete")}
    />
  ))
  .add("Confirm", () => (
    <Confirm
      message="Delete the appointment"
      onCancel={action("onCancel")}
      onConfirm={action("onConfirm")}
    />
  ))
  .add("Status", () => <Status message="Deleting" />)
  .add("Error", () => <Error message="Could not delete appointment." onClose={action("onClose")} />)
  .add("Edit", () => (
    <Form
      student="Matthieu Pauze"
      interviewer={1}
      interviewers={interviewers}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  ))
  .add("Create", () => (
    <Form
      interviewers={interviewers}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  ))
  .add("Appointment Empty", () => (
    <>
      <Appointment id={1} time="4pm" />
      <Appointment time="5pm" />
    </>
  ))
  .add("Appointment Booked", () => (
    <>
      <Appointment
        id={1}
        time="4pm"
        interview={{ student: "Lydia Miller-Jones", interviewer }}
      />
      <Appointment time="5pm" />
    </>
  ))