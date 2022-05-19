import React, { useState } from "react";
import "components/styles/Application.scss";

import { days } from "data/days"
import { appointments } from "data/appointments"

import DayList from "./DayList";
import Appointment from "./Appointment";

export default function Application(props) {
  const [day, setDay] = useState("Monday");

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            {...{ days, value: day, onChange: setDay }}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {Object.values(appointments).map((appt) => {
          return <Appointment key={appt.id} {...appt} />
        })}
      </section>
    </main>
  );
}
