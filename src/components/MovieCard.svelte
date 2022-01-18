<script>
  import { selectedMovieTrailers, showVideoPlayer } from "../store";
  import { fade } from "svelte/transition";

  export let title;
  export let overview;
  export let certification;
  export let backgroundImage;
  export let releaseDate;
  export let rating = 0;
  export let ratingCount = 0;
  export let genres = [];
  export let runtime = 0;
  export let tagline;
  export let trailers = [];
  export let directors = [];
  export let actors = [];

  // if you want to link to tmdb page
  // const tmdbUrl = `https://www.themoviedb.org/movie/${id}`;

  $: backgroundImageUrl = backgroundImage || `img/cover.jpg`;

  function formatDate(string) {
    return new Date(string).toLocaleDateString("en-gb", {
      day: "numeric",
      month: "short",
    });
  }

  function formatRating(num) {
    return parseFloat(num).toFixed(1);
  }

  function formatCertification(value) {
    let formatted = `• ${value}`;

    if (value === undefined || value === "") {
      formatted = "";
    }
    return formatted;
  }

  function formatRuntime(num) {
    let string;

    if (num < 60) {
      string = `${num}m`;
    } else {
      let min = num % 60;

      if (min > 0) {
        string = `${Math.trunc(num / 60)}h ${min}m`;
      } else {
        string = `${Math.trunc(num / 60)}h`;
      }
    }

    return string;
  }

  function formatRatingCount(num, digits) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "K" },
      { value: 1e6, symbol: "M" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

    let item = lookup
      .slice()
      .reverse()
      .find((d) => num >= d.value);

    return item
      ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
      : "0";
  }

  async function showTrailer() {
    $selectedMovieTrailers = trailers;
    $showVideoPlayer = true;
  }
</script>

<li class="movie" transition:fade={{ duration: 200 }}>
  <h2 class="gradientText">{title}</h2>
  <div
    class="backgroundImage"
    style="background-image: linear-gradient(to bottom, transparent 60%, 75%, white 85%), url({backgroundImageUrl});"
  />
  <p class="tagline">
    {tagline ? `"${tagline}"` : ``}
  </p>
  <div class="rating">
    <span
      class:excellent={rating >= 8 && ratingCount > 0}
      class:good={rating <= 7.9 && rating > 6.5 && ratingCount > 0}
      class:ok={rating <= 6.5 && rating > 5.5 && ratingCount > 0}
      class:bad={rating <= 5.5 && ratingCount > 0}
      class:unrated={ratingCount === 0}>{formatRating(rating)}</span
    >
    <span>{formatRatingCount(ratingCount)} votes</span>
  </div>
  <span class="releaseDate">{formatDate(releaseDate)}</span>
  <div class="details">
    <span class="runtime">{formatRuntime(runtime)}</span>
    <span class="certification">{formatCertification(certification)}</span>
  </div>
  <ul class="genres inline-list">
    {#each genres as genre}
      <li>{genre.name}</li>
    {/each}
  </ul>
  <div class="directors">
    <span>Directed by</span>
    {#if directors.length > 0}
      <ul class="inline-list">
        {#each directors as director}
          <li>{director.name}</li>
        {/each}
      </ul>
    {:else}
      ??
    {/if}
  </div>
  <div class="actors">
    Stars
    {#if actors.length > 0}
      <ul class="inline-list">
        {#each actors as actor}
          <li>{actor.name}</li>
        {/each}
      </ul>
    {:else}
      ??
    {/if}
  </div>
  <p class="overview">{overview}</p>
  <button on:click={showTrailer}>View Trailer</button>
</li>

<style>
  :root {
    --padding: 8px;
    --bg: white;
  }

  .movie {
    display: grid;
    border-radius: 20px;
    box-shadow: 0 0.9px 1px rgb(0 0 0 / 1.5%), 0 2.2px 2.4px rgb(0 0 0 / 2.3%),
      0 4.4px 5px rgb(0 0 0 / 2.9%), 0 9.1px 10.2px rgb(0 0 0 / 3.8%),
      0 25px 28px rgb(0 0 0 / 6%);
    gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows:
      300px 150px minmax(2rem, min-content) repeat(
        5,
        minmax(min-content, 1.75rem)
      )
      auto min-content;
  }

  h2 {
    z-index: var(--zIndex1);
    align-self: end;
    grid-column: 1 / -1;
    grid-row: 2;
    justify-self: center;
  }

  .backgroundImage {
    min-height: 300px;
    background-blend-mode: screen;
    background-color: var(--primary-color);
    background-position: 50% 50%;
    background-size: cover;
    border-radius: 10px 10px 0 0;
    grid-column: 1 / -1;
    grid-row: 1 / span 2;
  }

  .rating {
    align-self: end;
    padding-left: var(--padding);
    font-size: 1.1rem;
    grid-column: 1 / span 2;
  }

  .rating span:nth-child(1) {
    position: relative;
    display: inline-block;
    padding: 2px 6px;
    margin-right: 0.2em;
    border-radius: 10px;
  }

  .rating span:nth-child(2) {
    font-size: 0.9em;
  }

  .excellent {
    background-color: hsl(51deg 100% 50%);
  }

  .good {
    background-color: hsl(0deg 0% 75%);
  }

  .ok {
    background-color: hsl(36deg 36% 52%);
  }

  .bad {
    position: relative;
    background-color: rgb(165 77 42);
    color: white;
  }

  .bad::before {
    position: absolute;
    top: -1.1rem;
    left: 0.5em;
    content: "💩";
  }

  .rating span.unrated {
    padding: 0;
    padding-left: 0;
    color: hsl(0deg 0% 35%);
  }

  .releaseDate {
    align-self: end;
    margin: 0 0.5rem;
    grid-column: 3 / span 2;
    grid-row: 4;
    justify-self: end;
  }

  .details {
    align-self: end;
    padding: 0 calc(var(--padding) + 2px);
    grid-column: 1 / -1;
  }

  .tagline {
    align-self: center;
    padding: 0 calc(var(--padding));
    margin: 0;
    font-style: italic;
    grid-column: 1 / -1;
    justify-self: center;
  }

  .inline-list {
    display: inline;
    padding: 0;
    grid-column: 1 / -1;
    list-style-type: none;
  }

  .inline-list li {
    display: inline-block;
    align-self: end;
  }

  .inline-list li::after {
    content: ", ";
    white-space: pre;
  }

  .directors .inline-list li::after {
    content: " & ";
    white-space: pre;
  }

  .inline-list li:last-child::after {
    content: "";
  }

  .genres,
  .directors,
  .actors {
    align-self: end;
    padding: 0 calc(var(--padding) + 2px);
    margin: 0;
    grid-column: 1 / -1;
  }

  .overview {
    align-self: start;
    padding: 0 calc(var(--padding) + 2px);
    grid-column: 1 / -1;
  }

  button {
    padding: 10px;
    margin: 20px 0;

    grid-column: 1 / -1;
    justify-self: center;
  }
</style>
