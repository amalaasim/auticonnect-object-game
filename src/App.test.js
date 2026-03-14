import { render } from "@testing-library/react";
import App from "./App";
import { test, expect } from "vitest";

test("renders without crashing", () => {
  const { container } = render(<App />);
  expect(container).toBeTruthy();
});
