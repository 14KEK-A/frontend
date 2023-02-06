context("Basic", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("basic nav", () => {
    cy.url().should("eq", "http://127.0.0.1:8080/");

    cy.contains("Jedlik Vite-Quasar").should("exist");
  });
});
