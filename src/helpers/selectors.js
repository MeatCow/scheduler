export const getAppointmentsForDay = (state, day) => {
  const results = [];
  const theDay = state.days.find(date => date.name === day);
  
  if (!theDay) {
    return [];
  }

  for (const appt of theDay.appointments) {
    results.push(state.appointments[appt]);
  }

  return results;
} 