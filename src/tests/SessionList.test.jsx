import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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

  it("filters out sessions whose status is not POSTED", async () => {
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
            status: "DRAFT",
            startDatetime: "2020-10-19T08:30:00+00:00",
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

  it("filters out sessions whose locum is not null", async () => {
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
            status: null,
            startDatetime: "2020-10-19T08:30:00+00:00",
            endDatetime: "2020-10-19T16:15:00+00:00",
            applicationIds: [123, 234],
            practice: { id: "1235", name: "London Hospital" },
            locum: { id: "1234", firstName: "Jane", lastName: "Doe" },
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

  it("renders a sort button", async () => {
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
            staffType: "gp",
            staffTypeId: "1"
          }
        ]
      });

    render(<SessionList />);

    expect(
      await screen.findByRole("button", { name: "Sort" })
    ).toBeInTheDocument();
  });

  it("sorts a-z", async () => {
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
            staffType: "gp",
            staffTypeId: "1"
          }
        ]
      });

    render(<SessionList />);

    const button = await screen.findByRole("button", { name: "Sort" });
    fireEvent.click(button);

    const headings = await screen.findAllByTestId("sessionHeading");
    expect(headings[0]).toHaveTextContent("London Hospital");
    expect(headings[1]).toHaveTextContent("Manchester Hospital");
  });
});
