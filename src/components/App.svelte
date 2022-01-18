<script>
  import {
    latestMovies,
    showVideoPlayer,
    showSettings,
    showError,
    selectedLanguageCode,
    selectedCountryCode,
    selectedMovieTrailers,
    languages,
    countries,
    sortByField,
    totalPages,
    numOfPagesShown,
    loading,
    errorMessage,
  } from "../store";
  import {
    fetchLatestMovieDetailed,
    fetchLanguages,
    fetchCountries,
  } from "../scripts/tmdb";
  import { sortMoviesBy, sort } from "../scripts/sort";

  import Header from "./Header.svelte";
  import SkeletonMovieList from "./SkeletonMovieList.svelte";
  import MovieList from "./MovieList.svelte";
  import MovieListFilter from "./MovieListFilter.svelte";
  import VideoPlayer from "./VideoPlayer.svelte";
  import Settings from "./Settings.svelte";
  import Error from "./Error.svelte";
  import Footer from "./Footer.svelte";

  import { onMount } from "svelte";

  getLatestMovies();

  async function getLatestMovies() {
    $loading = true;

    try {
      let movies = await fetchLatestMovieDetailed(
        $selectedLanguageCode,
        $selectedCountryCode
      );
      let sortedMovies = sortMoviesBy(movies, $sortByField);
      $latestMovies = sortedMovies;
    } catch (error) {
      $errorMessage = error.message;
      $showError = true;
    }

    $loading = false;
  }

  async function showNextPage() {
    if ($numOfPagesShown < $totalPages) {
      $numOfPagesShown += 1;
      $loading = true;

      let movies = [];

      try {
        movies = await fetchLatestMovieDetailed(
          $selectedLanguageCode,
          $selectedCountryCode,
          $numOfPagesShown
        );
      } catch (error) {
        $errorMessage = error.message;
        $showError = true;
      }

      let allMovies = [...$latestMovies, ...movies];
      let sortedMovies = sortMoviesBy(allMovies, $sortByField);
      $latestMovies = sortedMovies;
      $loading = false;
    }
  }

  onMount(async () => {
    // It could be left to the Header component to get this data,
    // however the UI is more responsive if we get the data ahead of time.
    try {
      let unsortedLanguages = await fetchLanguages();
      let unsortedCountries = await fetchCountries();
      $languages = sort(unsortedLanguages, "english_name", "asc");
      $countries = sort(unsortedCountries, "english_name", "asc");
    } catch (error) {
      $errorMessage = error.message;
      $showError = true;
    }
  });
</script>

<Header />

<main>
  <MovieListFilter />

  {#if $latestMovies.length > 0}
    <MovieList movies={$latestMovies} />
  {:else if $latestMovies.length === 0 && $loading === false}
    <h2>No movies found!</h2>
    <img
      src="img/no-movies-found.jpg"
      alt=""
      class="noMoviesImg"
      width="1064"
      height="784"
    />
  {/if}

  {#if $latestMovies.length > 0 && $numOfPagesShown < $totalPages && $loading === false}
    <button on:click={showNextPage}>Show More</button>
  {/if}

  {#if $loading}
    <SkeletonMovieList />
  {/if}

  {#if $showVideoPlayer}
    <VideoPlayer videos={$selectedMovieTrailers} />
  {/if}

  {#if $showSettings}
    <Settings />
  {/if}

  {#if $showError}
    <Error message={$errorMessage} />
  {/if}
</main>

<Footer />

<style>
  main {
    width: 100%;
    min-height: calc(100vh - var(--header-height));
    margin-top: calc(var(--header-height) + 1rem);
  }

  h2 {
    margin: 2.5rem 0 2rem;
    color: var(--primary-color);
    font-size: 1.75rem;
    text-align: center;
  }

  button {
    display: block;
    padding: 0.75rem;
    margin: 1rem auto;
    font-size: 1.2rem;
  }

  .noMoviesImg {
    display: block;
    width: 100%;
    max-width: 1064px;
    margin: 0 auto;
    aspect-ratio: 4 / 3;
  }
</style>
