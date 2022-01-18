<script>
  import {
    latestMovies,
    showSettings,
    selectedLanguageCode,
    languages,
    selectedCountryCode,
    countries,
    sortByField,
    loading,
  } from "../store";

  import { fetchLatestMovieDetailed } from "../scripts/tmdb";
  import { sortMoviesBy } from "../scripts/sort";

  let languageCode = $selectedLanguageCode;
  let countryCode = $selectedCountryCode;
  let dirty = false;

  function close() {
    $showSettings = false;
  }

  async function save() {
    if (dirty) {
      $latestMovies = [];
      $loading = true;

      $selectedLanguageCode = languageCode;
      $selectedCountryCode = countryCode;

      close();

      let movies = await fetchLatestMovieDetailed(
        $selectedLanguageCode,
        $selectedCountryCode
      );
      let sortedMovies = sortMoviesBy(movies, $sortByField);
      $latestMovies = sortedMovies;

      $loading = false;
    }
  }

  function handleKeydown(e) {
    if (e.key === "Escape") {
      close();
    }
  }

  function init(el) {
    el.focus();
  }
</script>

<div class="bg modalBackground" on:click|self={close}>
  <form
    role="dialog"
    aria-labelledby="settingsTitle"
    aria-modal="true"
    on:submit|preventDefault={save}
    on:keydown={handleKeydown}
  >
    <h2 id="settingsTitle">Regional settings</h2>
    <label for="languageSetting">Language</label>
    <select
      id="languageSetting"
      bind:value={languageCode}
      on:change={() => (dirty = true)}
      use:init
    >
      {#each $languages as l}
        <option value={l.iso_639_1} selected={l.iso_639_1 === languageCode}
          >{l.english_name}</option
        >
      {/each}
    </select>
    <label for="countrySetting">Country</label>
    <select
      id="countrySetting"
      bind:value={countryCode}
      on:change={() => (dirty = true)}
    >
      {#each $countries as c}
        <option value={c.iso_3166_1}>{c.english_name}</option>
      {/each}
    </select>
    <button type="submit">Save</button>
    <button on:click={close}>Cancel</button>
  </form>
</div>

<style>
  .bg {
    z-index: var(--zIndex2);
    display: flex;
    overflow: hidden;
    place-items: center;
  }

  form {
    z-index: var(--zIndex3);

    display: flex;
    width: 90%;
    max-width: 24rem;
    flex-direction: column;
    padding: 2rem 1rem;
    padding-top: 0;
    margin: auto;

    background-color: white;
    row-gap: 1rem;
  }

  h2 {
    padding: 0;
    padding: 0.5rem 0;
    border-bottom: 1px solid grey;
    margin-bottom: 1rem;
    color: var(--primary-color);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.25rem;
    text-align: center;
    text-transform: none;
  }

  select {
    padding: 0.5rem;
    font-size: 1.1rem;
  }
</style>
