describe("Navigation", () => {
  // Test case: Navigating to Tuesday
  it("should navigate to Tuesday", () => {
    // Visit the main page of the application
    cy.visit("/");
    // Find and click on the element representing Tuesday in the day selector
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      // Assert that the clicked day has a specific background color after selection
      .should("have.css", "background-color", "rgb(242, 242, 242)");
  });
});