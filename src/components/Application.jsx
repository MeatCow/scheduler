import React, { useState } from "react";
import DayList from "./DayList";
import "components/styles/Application.scss";
import { days } from "data/days"


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
            days={days}
            day={day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
