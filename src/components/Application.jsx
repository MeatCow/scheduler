import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/styles/Application.scss";

import { appointments } from "data/appointments"

import DayList from "./DayList";
import Appointment from "./Appointment";

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8001/api/days")
      .then(res => {
        setDays(res.data);
      })
      .catch(err => console.log(err));
  }, [])


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
