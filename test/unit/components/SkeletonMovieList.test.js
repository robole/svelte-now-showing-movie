/* eslint-disable no-undef */
import { render, screen } from "@testing-library/svelte";

import SkeletonMovieList from "../../../src/components/SkeletonMovieList.svelte";

describe("SkeletonMovieList", () => {
  test("renders as a list", () => {
    render(SkeletonMovieList);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  test("show a list of 2 skeleton items by default when no prop is provided", () => {
    render(SkeletonMovieList);

    const items = screen.queryAllByRole("listitem");
    expect(items.length).toEqual(2);
  });

  test("show a list of X skeleton items set by the numOfMovies prop", () => {
    render(SkeletonMovieList, { props: { numOfMovies: 3 } });

    const items = screen.queryAllByRole("listitem");
    expect(items.length).toEqual(3);
  });
});
