<script>
  import SkeletonMovieCard from "./SkeletonMovieCard.svelte";

  export let numOfMovies = 2;
</script>

<ul class="skeletonMovieList">
  {#each Array(numOfMovies) as _}
    <SkeletonMovieCard />
  {/each}
</ul>

<style>
  .skeletonMovieList {
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
    .skeletonMovieList {
      grid-template-columns: repeat(2, minmax(400px, 1fr));
    }
  }
</style>
