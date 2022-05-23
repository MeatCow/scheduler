export const getAppointmentsForDay = (state, selectedDay) => {
  const theDay = state.days.find(date => date.name === selectedDay);
  if (!theDay) {
    return [];
  }
  return theDay.appointments.map(appt => state.appointments[appt]);
}

export const getInterviewersForDay = (state, selectedDay) => {
  const today = state.days.find(day => day.name === selectedDay);
  const interviewerIds = today.interviewers;
  return interviewerIds.map(id => state.interviewers[id]);
}

export const getInterview = (state, interview) => {
  if (interview === null) {
    return null;
  }

  return { ...interview, interviewer: state.interviewers[interview.interviewer] }
}