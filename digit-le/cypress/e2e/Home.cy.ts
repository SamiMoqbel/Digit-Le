describe("template spec", () => {
  context("Empty Name", () => {
    it("should show error message", () => {
      cy.visit("http://localhost:3000");
      cy.get(".name-input").type(" ");
      cy.get(".home-container > :nth-child(3)").click();
      cy.contains("Please enter your name").should("exist");
    });
  });
});
