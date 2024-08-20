describe("Home spec", () => {
  const baseUrl = "http://localhost:3000";
  const nameInputSelector = ".name-input";
  const levelSelector = ".home-container > :nth-child(3)";

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  context("Empty Name", () => {
    it("should show error message", () => {
      cy.get(nameInputSelector).type(" ");
      cy.get(levelSelector).click();
      cy.contains("Please enter your name").should("exist");
    });
  });

  context("Valid Name", () => {
    it("should navigate to level page", () => {
      const name = "Sami";
      cy.get(nameInputSelector).type(name);
      cy.get(levelSelector).click();
      cy.url().should("include", `board/easy/${name}`);
    });
  });

  context("Name With Special Character", () => {
    it("should show error message", () => {
      const name = "Sami@";
      cy.visit(baseUrl);
      cy.get(nameInputSelector).type(name);
      cy.get(levelSelector).click();
      cy.contains("Please enter a valid name").should("exist");
    });
  });
});
