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

  const pushAppointmentUpdate = (appointmentId, interview) => {
    return axios.put(`/api/appointments/${appointmentId}`, { interview })
  }

  const bookInterview = (appointmentId, interview) => {
    return pushAppointmentUpdate(appointmentId, interview)
      .then(res => {
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
      });
  }

  const genDayList = () => {
    return <DayList
      {...{
        days: state.days,
        value: state.day,
        onChange: setDay
      }} />;
  }

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`)
      .then(res => {
        const appointments = { ...state.appointments }
        appointments[id].interview = null;
        setState(prev => {
          return {
            ...prev,
            ...appointments
          }
        });
      });
  }

  const genSchedule = () => {
    return dailyAppointments.map(appointment => {
      const interview = getInterview(state, appointment.interview);
      return <Appointment
        key={appointment.id}
        {...{
          appointment,
          interview,
          interviewers: getInterviewersForDay(state, state.day),
          bookInterview,
          cancelInterview
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

  return { genSchedule, genDayList }
}

export default useApp