/* eslint-disable no-undef */
import { render, screen } from "@testing-library/svelte";

import VideoPlayer from "../../../src/components/VideoPlayer.svelte";

describe("VideoPlayer", () => {
  const videos = [
    {
      key: "JORN2hkXLyM",
      site: "YouTube",
      size: 1080,
      type: "Trailer",
    },
    {
      key: "X2m-08cOAbc",
      site: "YouTube",
      size: 1080,
      type: "Trailer",
    },
  ];

  test("should render", () => {
    render(VideoPlayer);
    expect(screen.getByText("No video available.")).toBeInTheDocument();
  });

  // Need to make npm package `youtube-player` an ES module for this test to work?
  // test("shows controls when there is a video", () => {
  //   render(VideoPlayer, { props: { videos } });
  //   expect(screen.getByLabelText("Volume")).toBeInTheDocument();
  // });
});
