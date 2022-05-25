import React from "react";
import { render } from "@testing-library/react";
import Appointment from "components/Appointment";

const appointments = [
  { id: 1, time: "12pm", interview: null },
  { id: 2, time: "1pm", interview: null },
  {
    id: 3, time: "2pm", interview: { student: "Archie Cohen", interviewer: 2 }
  },
  { id: 4, time: "3pm", interview: null },
  {
    id: 5, time: "4pm", interview: { student: "Chad Takahashi", interviewer: 2 }
  }
]

describe('Appointment', () => {
  it("renders without crashing", () => {
    render(<Appointment appointment={appointments[1]} />);
  });
})