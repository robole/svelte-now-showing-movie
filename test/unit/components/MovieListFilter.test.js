/* eslint-disable no-undef */
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";

import MovieListFilter from "../../../src/components/MovieListFilter.svelte";

describe("MovieListFilter", () => {
  test("should show a sort dropdown", () => {
    render(MovieListFilter);
    expect(screen.getByRole("combobox", { name: "Sort:" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Rating" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Duration" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Release Date" })
    ).toBeInTheDocument();
  });

  test("should show a filter form", () => {
    render(MovieListFilter);
    expect(screen.getByText("Filter")).toBeInTheDocument();
    expect(screen.getByLabelText("Min rating:")).toBeInTheDocument();
    expect(screen.getByLabelText("Max rating:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset Filter" }));
  });

  test("should reset the filter form when the button is clicked", async () => {
    render(MovieListFilter);

    const minRating = screen.getByLabelText("Min rating:");
    await userEvent.type(minRating, "5");
    expect(minRating).toHaveValue(5);
    await userEvent.click(screen.getByText("Reset Filter"));
    setTimeout(() => {
      expect(minRating).toHaveValue(0);
    }, 50);
  });
});
