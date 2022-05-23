import React from 'react'
import "./styles.scss"

import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import { useVisualMode } from "hooks/useVisualMode";
import Form from './Form'
import Status from './Status'
import Confirm from './Confirm'

const EMPTY = "EMPTY"
const SHOW = "SHOW"
const CREATE = "CREATE"
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"

export default function Appointment(props) {
  const { appointment, interview, interviewers, bookInterview, cancelInterview } = props;
  const { mode, back, transition } = useVisualMode(interview ? SHOW : EMPTY);

  const createInterview = (studentName, interviewer) => {
    const interview = {
      student: studentName,
      interviewer
    };
    transition(SAVING);
    bookInterview(appointment.id, interview)
      .then(res => {
        transition(SHOW, true)
      })
      .catch(err => {
        console.log(err);
      });
  }

  const deleteInterview = (id) => {
    transition(DELETING);
    cancelInterview(id)
      .then(res => {
        transition(EMPTY, true);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <article className="appointment">
      <Header time={appointment.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show {...interview} onDelete={() => transition(CONFIRM)} />}
      {mode === CREATE && <Form {...interview} interviewers={interviewers} onCancel={() => back()} onSave={createInterview} />}
      {mode === SAVING && <Status message={"Saving..."} />}
      {mode === DELETING && <Status message={"Deleting..."} />}
      {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"} onCancel={() => back()} onConfirm={() => deleteInterview(appointment.id)} />}
    </article>
  )
}