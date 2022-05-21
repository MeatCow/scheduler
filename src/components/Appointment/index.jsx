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
  const { interview, time, interviewers } = props;
  const { mode, back, transition } = useVisualMode(interview ? SHOW : EMPTY);

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show {...interview} />}
      {mode === CREATE && <Form {...interview} interviewers={interviewers} onCancel={() => back()}/>}
    </article>
  )
}