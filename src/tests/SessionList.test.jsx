import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import SessionList from "../components/SessionList";

const mockStore = configureStore([]);

describe("SessionList", () => {
  const store = mockStore({
    user: {
      details: {
        id: "1234",
        firstName: "John",
        lastName: "Doe",
        staffType: "gp",
        staffTypeId: "1"
      }
    }
  });

  let mockAxios;

  beforeAll(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  afterAll(() => {
    mockAxios.restore();
  });

  it("renders the list of sessions", async () => {
    mockAxios
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

    render(
      <Provider store={store}>
        <SessionList />
      </Provider>
    );

    expect(
      await screen.findByRole("heading", { name: "Manchester Hospital" })
    ).toBeInTheDocument();
  });

  it("filters out different staff type ids", async () => {
    mockAxios
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

    render(
      <Provider store={store}>
        <SessionList />
      </Provider>
    );
    expect(
      await screen.findByRole("heading", { name: "Manchester Hospital" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "London Hospital" })
    ).toBeNull();
  });

  it("filters out invalid start dates", async () => {
    mockAxios
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

    render(
      <Provider store={store}>
        <SessionList />
      </Provider>
    );

    expect(
      await screen.findByRole("heading", { name: "Manchester Hospital" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "London Hospital" })
    ).toBeNull();
  });

  it("filters out sessions whose status is not POSTED", async () => {
    mockAxios
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
    render(
      <Provider store={store}>
        <SessionList />
      </Provider>
    );
    expect(
      await screen.findByRole("heading", { name: "Manchester Hospital" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "London Hospital" })
    ).toBeNull();
  });

  it("filters out sessions whose locum is not null", async () => {
    mockAxios
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

    render(
      <Provider store={store}>
        <SessionList />
      </Provider>
    );

    expect(
      await screen.findByRole("heading", { name: "Manchester Hospital" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "London Hospital" })
    ).toBeNull();
  });
});
