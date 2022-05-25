describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("Should find and click on Tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]","Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});