/* eslint-disable no-undef */
import { render, screen } from "@testing-library/svelte";

import MovieList from "../../../src/components/MovieList.svelte";

describe("MovieList", () => {
  const movies = [
    {
      id: 1,
      title: "Dune",
      overview: "Long description here",
      releaseDate: "2021-09-15",
      tagline: "Something catchy",
      runtime: 150,
      rating: 8,
      ratingCount: 5500,
      videos: {
        results: [
          {
            key: "JORN2hkXLyM",
            site: "YouTube",
            size: 1080,
            type: "Trailer",
          },
          {
            key: "X2m-08cOAbc",
            site: "YouTube",
            size: 1080,
            type: "Trailer",
          },
        ],
      },
    },
    {
      id: 2,
      title: "Free Guy",
      overview: "Long description",
      releaseDate: "2021-09-10",
      tagline: "Catchphrase",
      certification: "PG",
      ratingCount: 2560000,
      rating: 6,
      videos: {
        results: [
          {
            key: "JORN2hkXLyM",
            site: "YouTube",
            size: 1080,
            type: "Trailer",
          },
          {
            key: "X2m-08cOAbc",
            site: "YouTube",
            size: 1080,
            type: "Trailer",
          },
        ],
      },
    },
  ];

  test("renders as a list", () => {
    render(MovieList);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).toBeNull();
  });

  test("shows a list of movies", () => {
    render(MovieList, { props: { movies } });

    const items = screen.queryAllByRole("listitem");
    expect(items.length).toEqual(2);
    expect(screen.queryByText("Dune")).toBeInTheDocument();
    expect(screen.queryByText("Free Guy")).toBeInTheDocument();
  });

  test("shows a filtered list of movies", () => {
    movies[0].show = false;
    movies[1].show = true;

    render(MovieList, { props: { movies } });

    const items = screen.queryAllByRole("listitem");
    expect(items.length).toEqual(1);
    expect(screen.queryByText("Dune")).not.toBeInTheDocument();
    expect(screen.queryByText("Free Guy")).toBeInTheDocument();

    movies[0].show = true;
  });
});
