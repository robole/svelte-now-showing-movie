<script>
  import { showVideoPlayer } from "../store";
  import { onMount } from "svelte";
  import YoutubePlayer from "youtube-player";

  export let videos = [];

  let player;
  let options = {
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      playsinline: 1,
      fs: 1,
    },
  };

  let selectedTrailerNum = 0;
  let videoId;

  let time = 0;
  let duration = 0;
  let volume = 40;
  let volumeStep = 10;
  let playing = true;
  let hasPrevious = false;
  let hasMore = false;

  let activity = false;
  let activityTimeout;
  let currentTimeInterval;

  async function playVideo() {
    if (player) {
      videoId = videos[selectedTrailerNum].key;
      player.loadVideoById(videoId);
      player.playVideo();
    }
  }

  async function togglePlayback() {
    let state = await player.getPlayerState();

    // state of 1 = playing
    if (state === 1) {
      playing = false;
      player.pauseVideo();
    } else {
      playing = true;
      player.playVideo();
    }

    handleActivity();
  }

  async function increaseVolume() {
    let value = await player.getVolume();

    if (value < 100) {
      volume = value + volumeStep;
      player.setVolume(volume);
      handleActivity();
    }
  }

  async function decreaseVolume() {
    let value = await player.getVolume();

    if (value > 0) {
      volume = value - volumeStep;
      player.setVolume(volume);
      handleActivity();
    }
  }

  // If user moves the cursor or clicks, then show the controls
  async function handleActivity() {
    activity = true;

    if (activityTimeout !== undefined) {
      clearTimeout(activityTimeout);
    }

    activityTimeout = setTimeout(() => {
      activity = false;
      activityTimeout = undefined;
    }, 2000);
  }

  async function handleVolumeChange() {
    player.setVolume(volume);

    handleActivity();
  }

  async function handleKeydown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      await decreaseVolume();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      await increaseVolume();
    } else if (e.key === "ArrowRight") {
      nextVideo();
    } else if (e.key === "ArrowLeft") {
      previousVideo();
    } else if (e.key === "Escape") {
      close();
    } else if (e.key === " ") {
      // space bar
      e.preventDefault();
      await togglePlayback();
    }
  }

  function close() {
    $showVideoPlayer = false;
    stopCurrentTimeRunning();
  }

  function nextVideo() {
    if (hasMoreTrailers()) {
      selectedTrailerNum += 1;
      playVideo();
      handleActivity();
      showDuration();
    }

    hasMore = hasMoreTrailers();
    hasPrevious = hasPreviousTrailers();
  }

  function previousVideo() {
    if (selectedTrailerNum > 0) {
      selectedTrailerNum -= 1;
      playVideo();
      handleActivity();
      showDuration();
    }

    hasMore = hasMoreTrailers();
    hasPrevious = hasPreviousTrailers();
  }

  function hasTrailers() {
    return videos.length > 0;
  }

  function hasPreviousTrailers() {
    return videos.length > 0 && selectedTrailerNum > 0;
  }

  function hasMoreTrailers() {
    return selectedTrailerNum < videos.length - 1;
  }

  function showCurrentTime() {
    currentTimeInterval = setInterval(() => {
      try {
        if (player !== null) {
          player.getCurrentTime().then((t) => {
            time = t;
          });
        }
      } catch (e) {
        // no need to do anything
      }
    }, 1000);

    return time;
  }

  function stopCurrentTimeRunning() {
    clearInterval(currentTimeInterval);
  }

  function zeroPad(num, places) {
    return String(num).padStart(places, "0");
  }

  function formatTime(t) {
    if (t === undefined) {
      return `00:00`;
    }

    let mins = Math.trunc(t / 60);
    let seconds = Math.round(t % 60);

    if (seconds === 60) {
      mins += 1;
      seconds = 0;
    }

    return `${zeroPad(mins, 2)}:${zeroPad(seconds, 2)}`;
  }

  function showDuration() {
    /* the duration can only be obtained when the video's metadata is loaded, which normally happens just after the video 
		starts playing. it is a bit slow to return a value, so we run the method every half a second until we get a valid value.
     */
    let interval = setInterval(() => {
      try {
        player.getDuration().then((d) => {
          if (d !== undefined && d !== 0) {
            duration = d;
            clearInterval(interval);
          }
        });
      } catch (e) {
        // no need to do anything
      }
    }, 500);
  }

  onMount(() => {
    if (hasTrailers()) {
      videoId = videos[selectedTrailerNum].key;

      player = YoutubePlayer(player, options);
      player.setVolume(volume);
      player.loadVideoById(videoId);
      player.playVideo();

      hasMore = hasMoreTrailers();

      showCurrentTime();
      showDuration();
    }
  });
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="bg modalBackground" on:click|self={close}>
  <div
    class="wrapper"
    role="dialog"
    aria-label="Video Player"
    aria-modal="true"
    on:mousemove={handleActivity}
    on:touchmove={handleActivity}
  >
    {#if hasTrailers() === false}
      <button class="btnClose" on:click={close}>X</button>
    {/if}
    {#if hasTrailers() === true && activity === true}
      <button class="btnClose" on:click={close}>X</button>
      <div class="controls">
        <h2 class="videoStatus">
          Trailer {selectedTrailerNum + 1} of {videos.length}
        </h2>
        <div class="playbackTime">
          <span>{formatTime(time)}</span>
          <span>/</span>
          <span>{formatTime(duration)}</span>
        </div>
        <svg viewBox="0 0 24 24" class="volumeIcon"
          ><path
            d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L9 9H6c-.55 0-1 .45-1 1z"
          /></svg
        >
        <input
          id="volume"
          aria-label="volume"
          type="range"
          min="0"
          max="100"
          step={volumeStep}
          bind:value={volume}
          on:change={handleVolumeChange}
        />
        <button
          class="btnPrevious"
          aria-label="Previous"
          on:click={previousVideo}
          disabled={!hasPrevious}
        >
          <svg viewBox="0 0 24 24"
            ><path
              d="M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm3.66 6.82l5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07c-.57.4-.57 1.24 0 1.64z"
            /></svg
          >
        </button>
        <button
          class="btnPlay"
          aria-label="play and pause"
          on:click={togglePlayback}
        >
          {#if playing}
            <svg viewBox="0 0 24 24" fill="#000000"
              ><path
                d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"
              /></svg
            >
          {:else}
            <svg viewBox="0 0 24 24" fill="#000000"
              ><path
                d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z"
              /></svg
            >
          {/if}
        </button>
        <button
          class="btnNext"
          aria-label="Next"
          on:click={nextVideo}
          disabled={!hasMore}
          ><svg viewBox="0 0 24 24" fill="#000000"
            ><path
              d="M7.58 16.89l5.77-4.07c.56-.4.56-1.24 0-1.63L7.58 7.11C6.91 6.65 6 7.12 6 7.93v8.14c0 .81.91 1.28 1.58.82zM16 7v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"
            /></svg
          ></button
        >
      </div>
    {/if}
    <!--this prevents `player` from recieving click events -->
    <div class="capture" on:click|stopPropagation={handleActivity} />
    <div class="player" bind:this={player} tabindex="-1" />
    {#if hasTrailers() === false}
      <p class="empty">No video available.</p>
    {/if}
  </div>
</div>

<style>
  .wrapper {
    position: fixed;
    z-index: var(--zIndex3);
    top: 5%;
    left: 5%;
    overflow: hidden;

    width: 90%;
    max-width: 1920px;
    height: 90%;
    background-color: rgb(201 201 201);
  }

  .capture {
    position: fixed;
    z-index: var(--zIndex4);
    width: 100%;
    height: 100%;
  }

  .player {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  button {
    border: none;
    margin: 0.25rem;
  }

  button svg {
    height: 2rem;
    fill: var(--primary-color);
  }

  .controls button {
    padding: 0;
    background-color: transparent;
    box-shadow: none;
  }

  .btnPlay svg {
    height: 2.5rem;
  }

  .btnClose {
    position: absolute;
    z-index: var(--zIndex5);
    top: 0;
    right: 0;
    padding: 0.6em 0.75em;
    border: none;
    background-color: rgb(255 255 255 / 90%);
    border-radius: 50%;
    box-shadow: rgb(0 0 0 / 30%) 0 2px 4px, rgb(0 0 0 / 20%) 0 3px 6px;
    color: rgb(0 0 0);
    cursor: pointer;
    font-family: "Fira Mono", "JetBrains Mono", monospace;
    font-size: 1.1rem;
    font-weight: bold;
  }

  .controls {
    position: absolute;
    z-index: var(--zIndex5);

    bottom: var(--default-padding);
    left: 2px;
    display: grid;
    width: calc(100% - 4px);

    padding: 10px;

    background-color: rgb(255 255 255);
    border-radius: 20px;
    box-shadow: 0 0 4px 0 rgb(0 0 0 / 49.3%) inset;
    color: black;
    column-gap: 10px;
    grid-template-columns: repeat(5, 1fr);
    row-gap: 1.25rem;
  }

  @media screen and (min-width: 400px) {
    .controls {
      left: calc((100% - 400px) / 2);
      width: 400px;
    }
  }

  .videoStatus {
    font-size: 1.25rem;
    grid-column: 1 / -1;
    justify-self: center;
  }

  .playbackTime {
    align-self: center;
    grid-column: 1 / span 2;
  }

  .playbackTime span {
    display: inline-block;
  }

  .playbackTime span:first-child {
    min-width: 2.75rem;
  }

  .playbackTime span:nth-child(3) {
    padding-left: 0.1rem;
  }

  .volumeIcon {
    height: 1.75rem;
    align-self: center;
    fill: rgb(78 78 78);
    grid-column: 3;
    justify-self: end;
  }

  #volume {
    width: 100%;
    grid-column: 4 / span 2;
  }

  .btnPrevious {
    grid-column: 2;
  }

  .empty {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
</style>
