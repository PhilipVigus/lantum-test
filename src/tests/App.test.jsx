import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders the Main component", () => {
  render(<App />);
  expect(screen.getByText(/Hello World/)).toBeInTheDocument();
});
