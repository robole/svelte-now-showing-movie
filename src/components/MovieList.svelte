<script>
  import MovieCard from "./MovieCard.svelte";

  const baseImageUrl = "https://image.tmdb.org/t/p/w500";

  export let movies = [];

  function formatBackgroundImage(path) {
    if (path !== null) {
      return `${baseImageUrl}${path}`;
    }
    return "";
  }

  function getTrailers(movie) {
    let trailers = [];

    if (movie.videos && movie.videos.results) {
      trailers = movie.videos.results.filter(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
    }
    return trailers;
  }

  function getDirectors(movie) {
    let directors = [];

    if (movie.credits && movie.credits.crew) {
      directors = movie.credits.crew.filter(
        (crewMember) => crewMember.job === "Director"
      );
    }

    return directors;
  }

  function getStarringActors(movie) {
    let actors = [];

    if (movie.credits && movie.credits.cast) {
      // top 3 actors
      actors = movie.credits.cast.filter(
        (castMember) =>
          castMember.known_for_department === "Acting" && castMember.order < 3
      );
    }
    return actors;
  }
</script>

<ul class="movieList">
  {#each movies as movie}
    {#if movie.show === undefined || movie.show === true}
      <MovieCard
        title={movie.title}
        overview={movie.overview}
        backgroundImage={formatBackgroundImage(movie.backdrop_path)}
        rating={movie.vote_average}
        certification={movie.certification}
        ratingCount={movie.vote_count}
        releaseDate={movie.release_date}
        genres={movie.genres}
        runtime={movie.runtime}
        tagline={movie.tagline}
        trailers={getTrailers(movie)}
        directors={getDirectors(movie)}
        actors={getStarringActors(movie)}
      />
    {/if}
  {/each}
</ul>

<style>
  .movieList {
    display: grid;
    width: 100%;
    max-width: var(--max-width);

    padding-right: var(--default-padding);
    padding-left: var(--default-padding);
    margin: 1rem auto;
    gap: 0.75rem;
    grid-auto-flow: dense;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));

    list-style-type: none;
  }

  @media screen and (min-width: 800px) {
    .movieList {
      grid-template-columns: repeat(2, minmax(400px, 1fr));
    }
  }
</style>
