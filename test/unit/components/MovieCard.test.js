/* eslint-disable no-undef */
import { render, screen } from "@testing-library/svelte";

import MovieCard from "../../../src/components/MovieCard.svelte";

describe("MovieCard", () => {
  const testMovieSimple1 = {
    id: 1,
    title: "Dune",
    overview: "Long description here",
    releaseDate: "2021-09-15",
    tagline: "Something catchy",
    runtime: 150,
    rating: 8,
    ratingCount: 5500,
    genres: [
      {
        id: 12,
        name: "Adventure",
      },
      {
        id: 878,
        name: "Science Fiction",
      },
    ],
    backgroundImage:
      "https://image.tmdb.org/t/p/w500/eeijXm3553xvuFbkPFkDG6CLCbQ.jpg",
    actors: [
      { name: "Timothée Chalamet" },
      { name: "Rebecca Ferguson" },
      { name: "Zendaya" },
    ],
    directors: [
      { name: "Denis Villeneuve" },
      { name: "Some other person for the sake of testing" },
    ],
  };

  const testMovieSimple2 = {
    id: 2,
    title: "Free Guy",
    overview: "Long description",
    releaseDate: "2021-09-10",
    certification: "PG",
    ratingCount: 2560000,
    rating: 6,
  };

  test("should be rendered as a list item", () => {
    render(MovieCard);
    expect(screen.queryByRole("listitem")).toBeInTheDocument();
  });

  test("should show a title", () => {
    render(MovieCard, { props: testMovieSimple1 });

    expect(screen.getByText("Dune")).toBeInTheDocument();
  });

  test("should show a overview", () => {
    render(MovieCard, { props: testMovieSimple1 });

    expect(screen.getByText("Long description here")).toBeInTheDocument();
  });

  test("should show a certification", () => {
    render(MovieCard, { props: testMovieSimple2 });

    expect(screen.getByText("• PG")).toBeInTheDocument();
  });

  test("should show a formatted release date of dd MMM", () => {
    render(MovieCard, { props: testMovieSimple1 });

    expect(screen.getByText("15 Sept")).toBeInTheDocument();
  });

  test("should show a rating", () => {
    render(MovieCard, { props: testMovieSimple1 });

    expect(screen.getByText("8.0")).toBeInTheDocument();
  });

  test("should color code the rating of a movie where if it is 8 or more, it marked as excellent", () => {
    render(MovieCard, { props: testMovieSimple1 });

    let dune = screen.getByText("8.0");
    expect(dune).toHaveClass("excellent");
  });

  test("should color code the rating of a movie where if it between 6.5 and 5.51, it marked as OK", () => {
    render(MovieCard, { props: testMovieSimple2 });

    let dune = screen.getByText("6.0");
    expect(dune).toHaveClass("ok");
  });

  test("should show a formatted rating count which is rounded to the nearest thousand (K)", () => {
    render(MovieCard, { props: testMovieSimple1 });

    expect(screen.getByText("6K votes")).toBeInTheDocument();
  });

  test("should show a formatted rating count which is rounded to the nearest million (M)", () => {
    render(MovieCard, { props: testMovieSimple2 });

    expect(screen.getByText("3M votes")).toBeInTheDocument();
  });

  test("should show the genres of as a list", () => {
    render(MovieCard, { props: testMovieSimple1 });

    expect(screen.getByText("Adventure")).toBeInTheDocument();
    expect(screen.getByText("Science Fiction")).toBeInTheDocument();
  });

  test("should show the actors as a list", () => {
    render(MovieCard, { props: testMovieSimple1 });

    expect(screen.getByText("Timothée Chalamet")).toBeInTheDocument();
    expect(screen.getByText("Rebecca Ferguson")).toBeInTheDocument();
  });

  test("should show the directors as a list", () => {
    render(MovieCard, { props: testMovieSimple1 });

    expect(screen.getByText("Denis Villeneuve")).toBeInTheDocument();
    expect(
      screen.getByText("Some other person for the sake of testing")
    ).toBeInTheDocument();
  });

  test("should show the runtime formatted in hours and minutes", () => {
    render(MovieCard, { props: testMovieSimple1 });

    expect(screen.getByText("2h 30m")).toBeInTheDocument();
  });

  test("should show a tagline in quotations", () => {
    render(MovieCard, { props: testMovieSimple1 });

    expect(screen.getByText('"Something catchy"')).toBeInTheDocument();
  });

  test("should show a 'View Trailer' button", () => {
    render(MovieCard, { props: testMovieSimple1 });

    expect(
      screen.getByRole("button", { name: "View Trailer" })
    ).toBeInTheDocument();
  });
});
