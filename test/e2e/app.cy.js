/* eslint-disable no-undef */
describe("App", () => {
  const baseUrl = "http://localhost:3000/";

  it("should get a list of movies", () => {
    cy.visit(baseUrl);
    cy.get(".movie").should("have.length", 20);
  });
});
