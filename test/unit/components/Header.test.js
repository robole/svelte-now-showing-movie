/* eslint-disable no-undef */
import { render, screen } from "@testing-library/svelte";

import Header from "../../../src/components/Header.svelte";

describe("Header", () => {
  test("should show a settings button", () => {
    render(Header);

    const button = screen.getByRole("button", {
      name: "Country and language settings",
    });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });
});
