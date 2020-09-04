import React from "react";
import { render, screen } from "@testing-library/react";
import Session from "../components/Session";

describe("Session", () => {
  it("renders the session", () => {
    const sessionData = {
      id: "1235",
      status: "POSTED",
      startDatetime: "2020-10-19T08:30:00+00:00",
      endDatetime: "2020-10-19T16:15:00+00:00",
      applicationIds: [123, 234],
      practice: { id: "1235", name: "Manchester Hospital" },
      locum: null,
      hourlyRate: 85,
      staffType: "gp",
      staffTypeId: "1"
    };

    render(<Session session={sessionData} />);

    expect(
      screen.getByRole("heading", { name: "Manchester Hospital" })
    ).toBeInTheDocument();
    expect(screen.getByText("Shift date: 10/19/2020")).toBeInTheDocument();
    expect(
      screen.getByText("Start time: 10/19/2020, 9:30 AM")
    ).toBeInTheDocument();
    expect(
      screen.getByText("End time: 2020-10-19T16:15:00+00:00")
    ).toBeInTheDocument();
    expect(screen.getByText("Hourly rate: £85")).toBeInTheDocument();
  });
});
