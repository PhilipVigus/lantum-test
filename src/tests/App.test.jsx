import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import App from "../App";

describe("App", () => {
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

  it("renders the App", async () => {
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

    render(<App />);

    expect(
      await screen.findByRole("heading", { name: "Session List" })
    ).toBeInTheDocument();
  });
});
