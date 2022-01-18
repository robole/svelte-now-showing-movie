<script>
  import { latestMovies, sortByField } from "../store";
  import { sortMoviesBy } from "../scripts/sort";

  let filter = false;
  let minRating = 0;
  let maxRating = 10;

  $: if (filter === true && minRating <= maxRating) {
    $latestMovies = filterMoviesByRating();
  }

  function sort() {
    if ($latestMovies.length > 0) {
      $latestMovies = sortMoviesBy($latestMovies, $sortByField);
    }
  }

  function filterMoviesByRating() {
    return $latestMovies.map((movie) => {
      if (movie.vote_average >= minRating && movie.vote_average <= maxRating) {
        // eslint-disable-next-line no-param-reassign
        movie.show = true;
      } else {
        // eslint-disable-next-line no-param-reassign
        movie.show = false;
      }
      return movie;
    });
  }

  function resetFilter() {
    if (filter) {
      filter = false;
      minRating = 0;
      maxRating = 10;
      $latestMovies = filterMoviesByRating();
    }
  }
</script>

<form>
  <label class="lblSort" for="sort">Sort:</label>
  <select name="sort" id="sort" bind:value={$sortByField} on:change={sort}>
    <option value="vote_average">Rating</option>
    <option value="runtime">Duration</option>
    <option value="release_date">Release Date</option>
  </select>
  <details class="filterGroup">
    <summary>Filter</summary>
    <form class="controls" on:submit|preventDefault>
      <label for="minRating">Min rating:</label>
      <input
        type="number"
        name="minRating"
        id="minRating"
        bind:value={minRating}
        on:change={() => (filter = true)}
        min="0"
        max="10"
        size="3"
        required
      />
      <label for="maxRating">Max rating:</label>
      <input
        type="number"
        name="maxRating"
        id="maxRating"
        bind:value={maxRating}
        on:change={() => (filter = true)}
        min="0"
        max="10"
        size="3"
        required
      />
      <button
        class="btnReset"
        type="reset"
        on:click|preventDefault={resetFilter}
        disabled={!filter}>Reset Filter</button
      >
    </form>
  </details>
</form>

<style>
  form {
    display: flex;
    width: 100%;
    max-width: var(--max-width);
    align-items: center;
    padding: 0 var(--default-padding);

    margin: 0.5rem auto;

    font-size: 1.1rem;
    gap: 0.5rem;
  }

  .filterGroup {
    position: relative;
    padding: 0 2px;
    border-radius: 5px;
  }

  .filterGroup summary {
    cursor: pointer;
  }

  .filterGroup[open] {
    background-color: var(--primary-color);
    color: white;
  }

  .filterGroup .controls {
    position: absolute;
    top: 1.2em;
    left: 0;
    display: grid;
    width: 100%;
    min-width: 160px;
    align-items: center;
    padding: 0.75rem 0.5rem;

    background-color: white;
    border-radius: 5px;
    box-shadow: rgb(0 0 0 / 40%) 0 0 2px, rgb(0 0 0 / 20%) 0 2px 4px;
    color: black;
    column-gap: 0.25rem;
    font-size: 1rem;
    grid-template-columns: 1fr 40px;
    row-gap: 0.75rem;
  }

  .btnReset {
    max-width: 6rem;
    padding: 0.25em;
    grid-column: 1 / -1;
    justify-self: center;
  }

  select {
    padding: 0.2em 0;
  }

  input[type="number"] {
    padding: 0.25em;
  }
</style>
