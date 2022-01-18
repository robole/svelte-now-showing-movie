<li class="skeletonMovieCard" />

<style>
  .skeletonMovieCard {
    --elementColor: rgb(185 185 185);
    --bgColor: hsl(0deg 0% 100%);

    position: relative;

    display: grid;
    overflow: hidden;

    background: linear-gradient(
      to bottom,
      var(--elementColor) 0%,
      var(--elementColor) 45%,
      var(--bgColor) 45%
    );
    border-radius: 20px;
    box-shadow: 0 0 0 1px rgb(175 175 175 / 10%), 0 0 4px 0 rgb(0 0 0 / 11%),
      0 0 8px 2px rgb(0 0 0 / 5%);
    gap: 0.75rem;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows:
      300px 150px repeat(6, 2rem)
      4rem 6em;
  }

  .skeletonMovieCard::before {
    --width: 350px;

    position: absolute;
    top: 0;
    left: -100%;
    display: block;
    width: var(--width);
    height: 100%;
    animation: load 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    background: linear-gradient(
      to right,
      transparent 0%,
      rgb(230 230 230 / 60.3%) 50%,
      transparent 100%
    );
    content: "";
  }

  @keyframes load {
    to {
      transform: translateX(250%);
    }
  }

  @media screen and (min-width: 800px) and (max-width: 1199px) {
    .skeletonMovieCard::before {
      --width: 500px;
    }
  }

  @media screen and (min-width: 1200px) {
    .skeletonMovieCard::before {
      --width: 700px;
    }
  }
</style>
