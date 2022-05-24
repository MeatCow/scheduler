const getDay = (state, day) => {
  return state.days.find(thisDay => thisDay.name === day);
}

export const getAppointmentsForDay = (state, day) => {
  const today = getDay(state, day);
  if (!today) {
    return [];
  }
  return today.appointments.map(appt => state.appointments[appt]);
}

export const getInterviewersForDay = (state, day) => {
  const today = getDay(state, day);
  if (!today) {
    return [];
  }
  const interviewerIds = today.interviewers;
  return interviewerIds.map(id => state.interviewers[id]);
}

export const getInterview = (state, interview) => {
  if (interview === null) {
    return null;
  }

  return { ...interview, interviewer: state.interviewers[interview.interviewer] }
}

export const countSpots = (appointments) => {
  return appointments.filter(day => day.interview === null).length;
}

export const updateSpots = (state) => {
  const appointments = getAppointmentsForDay(state, state.day);
  const spotsRemaining = countSpots(appointments);
  const today = getDay(state, state.day);

  if (!today) {
    return state;
  }

  const newState = { ...state }
  const newDays = [...state.days]
  const newDay = { ...today, spots: spotsRemaining }
  
  const dayIndex = state.days.findIndex(thisDay => thisDay.name === state.day);
  newDays[dayIndex] = newDay;
  newState.days = newDays;

  return newState;
}