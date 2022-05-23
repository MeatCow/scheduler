import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helpers/selectors';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Appointment from 'components/Appointment';
import DayList from 'components/DayList';

function useApp() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => {
    setState(prev => ({ ...prev, day }))
  };

  const bookInterview = (appointmentId, interview) => {
    const appointment = {
      ...state.appointments[appointmentId],
      interview: { ...interview }
    }
    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment
    }
    setState(prev => {
      return {
        ...prev,
        appointments
      }
    })

  }

  const genDayList = () => {
    return <DayList
      {...{
        days: state.days,
        value: state.day,
        onChange: setDay
      }} />;
  }

  const createSchedule = () => {
    return dailyAppointments.map(appointment => {
      const interview = getInterview(state, appointment.interview);
      return <Appointment
        key={appointment.id}
        {...{
          appointment,
          interview,
          interviewers: getInterviewersForDay(state, state.day),
          bookInterview
        }} />;
    });
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])

  return { createSchedule, genDayList}
}

export default useApp