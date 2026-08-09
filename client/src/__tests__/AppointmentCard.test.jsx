import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AppointmentCard from "../components/AppointmentCard";

const appointment = {
  date: "2026-09-11T00:00:00.000Z",
  department: "Gynecologist",
  doctorName: "Urvshi Singla",
  rating: 4.8,
  patientName: "Alina Joe",
  status: "upcoming",
};

describe("AppointmentCard", () => {
  it("renders the doctor and department details", () => {
    render(<AppointmentCard appointment={appointment} />);
    expect(screen.getByText(/Urvshi Singla/)).toBeInTheDocument();
    expect(screen.getByText(/Gynecologist/)).toBeInTheDocument();
  });

  it("renders the patient's name", () => {
    render(<AppointmentCard appointment={appointment} />);
    expect(screen.getByText(/Alina Joe/)).toBeInTheDocument();
  });

  it("falls back to 'To be assigned' when no doctor is set", () => {
    render(<AppointmentCard appointment={{ ...appointment, doctorName: "" }} />);
    expect(screen.getByText(/To be assigned/)).toBeInTheDocument();
  });

  it("renders a Join action", () => {
    render(<AppointmentCard appointment={appointment} />);
    expect(screen.getByRole("button", { name: /join/i })).toBeInTheDocument();
  });
});
