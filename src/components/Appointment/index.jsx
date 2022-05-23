import React from 'react'
import "./styles.scss"

import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import { useVisualMode } from "hooks/useVisualMode";
import Form from './Form'

const EMPTY = "EMPTY"
const SHOW = "SHOW"
const CREATE = "CREATE"

export default function Appointment(props) {
  const { appointment, interview, interviewers, bookInterview } = props;
  const { mode, back, transition } = useVisualMode(interview ? SHOW : EMPTY);

  const createInterview = (studentName, interviewer) => {
    const interview = {
      student: studentName,
      interviewer
    };
    bookInterview(appointment.id, interview);
    transition("SHOW")
  }

  return (
    <article className="appointment">
      <Header time={appointment.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show {...interview} />}
      {mode === CREATE && <Form {...interview} interviewers={interviewers} onCancel={() => back()} onSave={createInterview} />}
    </article>
  )
}