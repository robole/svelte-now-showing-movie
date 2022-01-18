/* eslint-disable no-undef */
import { render, screen, fireEvent } from "@testing-library/svelte";

import App from "../../../src/components/App.svelte";

describe("App", () => {
  test("should render", () => {
    render(App);

    // Header
    const button = screen.getByRole("button", {
      name: "Country and language settings",
    });
    expect(button).toBeInTheDocument();

    // MovieListFilter
    expect(screen.getByRole("combobox", { name: "Sort:" })).toBeInTheDocument();

    // MovieList to show movies
    expect(screen.getByRole("list")).toBeInTheDocument();

    // Footer
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();
  });

  test("should show the Settings modal dialog when the setings button is clicked", async () => {
    render(App);

    const button = screen.getByRole("button", {
      name: "Country and language settings",
    });
    expect(button).toBeInTheDocument();
    await fireEvent.click(button);

    expect(screen.getByLabelText("Language")).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
  });

  // Need to mock fetch to get this to work
  // test("should show a video player when the 'View Trailer' button is clicked", async () => {
  //   render(App);

  //   const button = screen.getByRole("button", {
  //     name: "View Trailer",
  //   });
  //   expect(button).toBeInTheDocument();
  //   await fireEvent.click(button);

  //   expect(screen.getByLabelText("Volume")).toBeInTheDocument();
  // });
});
