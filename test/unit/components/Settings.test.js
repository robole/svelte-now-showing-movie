/* eslint-disable no-undef */
import { render, screen } from "@testing-library/svelte";

import Settings from "../../../src/components/Settings.svelte";

describe("Settings", () => {
  test("should render", () => {
    render(Settings);
    expect(screen.getByText("Regional settings")).toBeInTheDocument();
  });

  test("should show a form", () => {
    render(Settings);

    expect(screen.getByLabelText("Language")).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();

    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });
});
