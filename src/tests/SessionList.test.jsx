import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import SessionList from "../components/SessionList";

describe("SessionList", () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  it("renders the list of sessions", async () => {
    mock
      .onGet(
        "https://vvgv5rubu3.execute-api.eu-west-2.amazonaws.com/dev/sessions"
      )
      .replyOnce(200, {
        data: [
          {
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
          }
        ]
      });
    render(<SessionList />);

    expect(
      await screen.findByRole("heading", { name: "Manchester Hospital" })
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

  it("filters out different staff type ids", async () => {
    mock
      .onGet(
        "https://vvgv5rubu3.execute-api.eu-west-2.amazonaws.com/dev/sessions"
      )
      .replyOnce(200, {
        data: [
          {
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
          },
          {
            id: "1237",
            status: "POSTED",
            startDatetime: "2020-10-19T08:30:00+00:00",
            endDatetime: "2020-10-19T16:15:00+00:00",
            applicationIds: [123, 234],
            practice: { id: "1235", name: "London Hospital" },
            locum: null,
            hourlyRate: 85,
            staffType: "consultant",
            staffTypeId: "7"
          }
        ]
      });
    render(<SessionList />);

    expect(
      await screen.findByRole("heading", { name: "Manchester Hospital" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "London Hospital" })
    ).toBeNull();
  });

  it("filters out invalid start dates", async () => {
    mock
      .onGet(
        "https://vvgv5rubu3.execute-api.eu-west-2.amazonaws.com/dev/sessions"
      )
      .replyOnce(200, {
        data: [
          {
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
          },
          {
            id: "1237",
            status: "POSTED",
            startDatetime: "2018-10-19T08:30:00+00:00",
            endDatetime: "2020-10-19T16:15:00+00:00",
            applicationIds: [123, 234],
            practice: { id: "1235", name: "London Hospital" },
            locum: null,
            hourlyRate: 85,
            staffType: "gp",
            staffTypeId: "1"
          }
        ]
      });
    render(<SessionList />);

    expect(
      await screen.findByRole("heading", { name: "Manchester Hospital" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "London Hospital" })
    ).toBeNull();
  });
});
