import { writable } from "svelte/store";

export let latestMovies = writable([]);
export let selectedMovieTrailers = writable([]);

export let totalPages = writable(1);
export let numOfPagesShown = writable(1);

export let sortByField = writable("vote_average");

export let showVideoPlayer = writable(false);

export let showError = writable(false);
export let errorMessage = writable("");

export let loading = writable(true);

// settings
export let showSettings = writable(false);

export let selectedLanguageCode = writable(
  localStorage.getItem("selectedLanguageCode") || "en"
);
selectedLanguageCode.subscribe((value) =>
  localStorage.setItem("selectedLanguageCode", value)
);

export let selectedCountryCode = writable(
  localStorage.getItem("selectedCountryCode") || "IE"
);
selectedCountryCode.subscribe((value) =>
  localStorage.setItem("selectedCountryCode", value)
);

export let languages = writable([]);
export let countries = writable([]);
