import { sortMoviesBy, sort } from "../../../src/scripts/sort";

describe("sort", () => {
  const movies = [
    {
      release_date: "2021-09-15",
      title: "Dune",
      runtime: 155,
    },
    {
      release_date: "2021-09-22",
      title: "The Many Saints of Newark",
      runtime: 120,
    },
    {
      release_date: "2021-09-01",
      title: "Shang-Chi and the Legend of the Ten Rings",
      runtime: 150,
    },
  ];

  test("should sort movies by date with the most recent first (descending order)", () => {
    let sorted = sortMoviesBy(movies, "release_date");

    expect(sorted[0].title).toEqual("The Many Saints of Newark");
    expect(sorted[1].title).toEqual("Dune");
    expect(sorted[2].title).toEqual(
      "Shang-Chi and the Legend of the Ten Rings"
    );
  });

  test("should sort movies by runtime with the most recent first (descending order)", () => {
    let sorted = sortMoviesBy(movies, "runtime");

    expect(sorted[0].title).toEqual("Dune");
    expect(sorted[1].title).toEqual(
      "Shang-Chi and the Legend of the Ten Rings"
    );
    expect(sorted[2].title).toEqual("The Many Saints of Newark");
  });

  test("should sort a text field in ascending order", () => {
    let sorted = sort(movies, "title", "asc");

    expect(sorted[0].title).toEqual("Dune");
    expect(sorted[1].title).toEqual(
      "Shang-Chi and the Legend of the Ten Rings"
    );
    expect(sorted[2].title).toEqual("The Many Saints of Newark");
  });

  test("should sort a numeric field in ascending order", () => {
    let sorted = sort(movies, "runtime", "asc");

    expect(sorted[0].title).toEqual("The Many Saints of Newark");
    expect(sorted[1].title).toEqual(
      "Shang-Chi and the Legend of the Ten Rings"
    );
    expect(sorted[2].title).toEqual("Dune");
  });
});
