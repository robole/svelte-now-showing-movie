/* eslint-disable no-undef */
import { render, screen } from "@testing-library/svelte";

import Error from "../../../src/components/Error.svelte";

describe("Error", () => {
  test("should render with a default error message", () => {
    render(Error);
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(
      screen.getByText("Uh oh! Something went wrong!")
    ).toBeInTheDocument();
  });

  test("should show a provided error message", () => {
    render(Error, { message: "SpagetthiO!" });

    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("SpagetthiO!")).toBeInTheDocument();
  });
});
