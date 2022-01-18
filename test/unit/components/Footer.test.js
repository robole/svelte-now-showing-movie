/* eslint-disable no-undef */
import { render, screen } from "@testing-library/svelte";

import Footer from "../../../src/components/Footer.svelte";

describe("Footer", () => {
  test("should be a footer", () => {
    render(Footer);

    const footerElement = screen.getByRole("contentinfo");

    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveTextContent(
      "This product uses the TMDB API but is not endorsed or certified by TMDB."
    );
  });
});
