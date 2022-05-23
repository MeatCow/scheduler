import React from "react";

import "components/styles/Application.scss";

import useApp from "hooks/useApp";

export default function Application() {
  const { createSchedule, genDayList } = useApp();

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
          {genDayList()}
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {createSchedule()}
      </section>
    </main>
  );
}