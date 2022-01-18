// API reference: https://developers.themoviedb.org/3/getting-started/introduction
import { totalPages } from "../store";

const BASE_URL = "https://api.themoviedb.org/3/";

export async function fetchLatestMovies(languageCode, countryCode, page = 1) {
  let response = await fetch(
    `${BASE_URL}movie/now_playing?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=${languageCode}&region=${countryCode}&page=${page}`
  );

  handleErrors(response);
  let res = await response.json();

  totalPages.set(res.total_pages);

  return res;
}

function handleErrors(response) {
  if (response.status === 404) {
    throw Error(
      "We have changed something and we shouldn't have had! Please let us know!"
    );
  } else if (!response.ok) {
    throw Error(
      "There was an issue with the network. Check your internet and try again."
    );
  }
}

export async function fetchMovieDetailed(movieId, languageCode) {
  let response = await fetch(
    `${BASE_URL}movie/${movieId}?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=${languageCode}&append_to_response=release_dates,videos,credits`
  );

  handleErrors(response);
  return response.json();
}

export async function fetchLatestMovieDetailed(
  languageCode,
  countryCode,
  page = 1
) {
  let fetchMoviePromises = [];

  let basicMovies = await fetchLatestMovies(languageCode, countryCode, page);

  basicMovies.results.forEach((movie) => {
    let moviePromise = fetchMovieDetailed(movie.id, languageCode);
    fetchMoviePromises.push(moviePromise);
  });

  let results = await Promise.all(fetchMoviePromises);
  let certifiedResults = processCountryCertification(results, countryCode);
  return certifiedResults;
}

function processCountryCertification(movies, countryCode) {
  let updatedMovies = movies.map((movie) => {
    let releaseDatesObj = movie.release_dates.results.find(
      (item) => item.iso_3166_1 === countryCode
    );

    let releaseDate;

    /* Only "theatrical" type (3) is considered. It is prob best to exclude
		 "Theatrical (limited)" type (2) altogether */
    if (releaseDatesObj) {
      releaseDate = releaseDatesObj.release_dates.find(
        (item) => item.type === 3 && item.certification !== ""
      );
    }

    let updatedMovie = movie;

    if (releaseDate) {
      updatedMovie = { ...movie, certification: releaseDate.certification };
    }

    return updatedMovie;
  });

  return updatedMovies;
}

export async function fetchLanguages() {
  let response = await fetch(
    `${BASE_URL}configuration/languages?api_key=${import.meta.env.VITE_API_KEY}`
  );

  handleErrors(response);
  return response.json();
}

export async function fetchCountries() {
  let response = await fetch(
    `${BASE_URL}configuration/countries?api_key=${import.meta.env.VITE_API_KEY}`
  );

  handleErrors(response);
  return response.json();
}
