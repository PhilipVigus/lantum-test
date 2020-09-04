import React from "react";
import { render, screen } from "@testing-library/react";
import SessionList from "../components/SessionList";

describe("SessionList", () => {
  it("renders the list of sessions", () => {
    render(<SessionList />);

    expect(
      screen.getByRole("heading", { name: "Grant Tree Medical Centre" })
    ).toBeInTheDocument();
    expect(screen.getByText("Shift date: 11/19/2020")).toBeInTheDocument();
    expect(
      screen.getByText("Start time: 11/19/2020, 4:50 PM")
    ).toBeInTheDocument();
    expect(
      screen.getByText("End time: 11/19/2020, 7:15 PM")
    ).toBeInTheDocument();
    expect(screen.getByText("Hourly rate: £85")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "West London Clinic" })
    ).toBeInTheDocument();
  });
});
