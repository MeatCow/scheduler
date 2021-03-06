import { getAppointmentsForDay, getInterview, getInterviewersForDay, countSpots, updateSpots } from "helpers/selectors";

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [2, 3, 4, 5, 10]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [2, 3, 5, 10]
    },
    {
      id: 3,
      name: "Wednesday",
      appointments: [],
      interviewers: [2, 3, 5, 10]
    },
    {
      id: 4,
      name: "Thursday",
      appointments: [3, 5],
      interviewers: [2, 3, 5, 10]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};

test("getAppointmentsForDay returns an array", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getAppointmentsForDay returns an array with a length matching the number of appointments for that day", () => {
  const result = getAppointmentsForDay(state, "Monday");
  expect(result.length).toEqual(3);
});

test("getAppointmentsForDay returns an array containing the correct appointment objects", () => {
  const [first, second] = getAppointmentsForDay(state, "Tuesday");
  expect(first).toEqual(state.appointments["4"]);
  expect(second).toEqual(state.appointments["5"]);
});

test("getAppointmentsForDay returns an empty array when the days data is empty", () => {
  const result = getAppointmentsForDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getAppointmentsForDay returns an empty array when the day is not found", () => {
  const result = getAppointmentsForDay(state, "Saturday");
  expect(result.length).toEqual(0);
});

test("getInterviewersForDay returns an array", () => {
  const result = getInterviewersForDay(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getInterviewersForDay returns an array with a length matching the number of interviewers for that day", () => {
  const result = getInterviewersForDay(state, "Monday");
  expect(result.length).toEqual(5);
});

test("getInterviewersForDay returns an array containing the correct interview objects", () => {
  const [first] = getInterviewersForDay(state, "Tuesday");
  expect(first).toEqual(state.interviewers["2"]);
});

test("getInterviewersForDay returns an empty array when the days data is empty", () => {
  const result = getInterviewersForDay({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getInterviewersForDay returns an empty array when the day is not found", () => {
  const result = getInterviewersForDay(state, "Saturday");
  expect(result.length).toEqual(0);
});

test("getInterview returns an object with the interviewer data", () => {
  const result = getInterview(state, state.appointments["3"].interview);
  expect(result).toEqual(
    expect.objectContaining({
      student: expect.any(String),
      interviewer: expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        avatar: expect.any(String)
      })
    })
  );
});

test("getInterview returns null if no interview is booked", () => {
  const result = getInterview(state, state.appointments["2"].interview);
  expect(result).toBeNull();
});

test("countSpots to return 2 when 2 interviews are null", () => {
  const input = getAppointmentsForDay(state, "Monday");
  const result = countSpots(input);
  expect(result).toEqual(2);
});

test("countSpots to return 1 when 1 interviews are null", () => {
  const input = getAppointmentsForDay(state, "Tuesday");
  const result = countSpots(input);
  expect(result).toEqual(1);
});

test("countSpots to return 0 when data is empty", () => {
  const result = countSpots([{}]);
  expect(result).toEqual(0);
});

test("updateSpots to return a new state with the spots to 2 when 2 spots remain", () => {
  const newState = updateSpots({ ...state, day: "Monday" });
  const monday = newState.days[0];
  expect(monday.spots).toEqual(2);
});

test("updateSpots to return a new state with the spots to 0 when appointments are empty", () => {
  const wednesday = updateSpots({ ...state, day: "Wednesday" }).days[2];
  expect(wednesday.spots).toEqual(0);
});

test("updateSpots to return a new state with the spots to 0 when no spots remain", () => {
  const thursday = updateSpots({ ...state, day: "Thursday" }).days[3];
  expect(thursday.spots).toEqual(0);
});

test("updateSpots to return a new state with the days unmodified, if days are empty", () => {
  const thursday = updateSpots({ days: [], day: "Monday" }).days;
  expect(thursday.length).toEqual(0);
});
