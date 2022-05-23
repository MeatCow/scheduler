import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/styles/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])

  const createSchedule = () => {
    return dailyAppointments.map(appointment => {
      const interview = getInterview(state, appointment.interview);
      return <Appointment
        key={appointment.id}
        {...{
          ...appointment,
          interview,
          interviewers: getInterviewersForDay(state, state.day)
        }} />;
    });
  }

  const schedule = createSchedule()

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
            {...{
              days: state.days,
              value: state.day,
              onChange: setDay
            }}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );


}