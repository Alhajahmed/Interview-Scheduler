describe("Appointments", () => {
  // This code is executed before each test case in the suite
  beforeEach(() => {
    // Reset the database state using a debug API endpoint
    cy.request("GET", "/api/debug/reset");

    // Visit the main page of the application
    cy.visit("/");

    // Ensure that the text "Monday" is present on the page
    cy.contains("Monday");
  });

  // Test case: Booking an interview
  it("should book an interview", () => {
    // Click on the "Add" button to initiate adding an interview
    cy.get("[alt=Add]").first().click();

    // Enter the student's name in the input field
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    // Select an interviewer by clicking on their name
    cy.get('[alt="Sylvia Palmer"]').click();

    // Click the "Save" button to confirm the interview booking
    cy.contains("Save").click();

    // Ensure that the booked student name and interviewer are displayed
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  // Test case: Editing an interview
  it("should edit an interview", () => {
    // Click on the "Edit" button of the first appointment card
    cy.get("[alt=Edit]").first().click({ force: true });

    // Clear the existing student name and enter a new one
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");

    // Select a different interviewer by clicking on their name
    cy.get("[alt='Tori Malcolm']").click();

    // Click the "Save" button to confirm the changes to the interview
    cy.contains("Save").click();

    // Ensure that the edited student name and new interviewer are displayed
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  // Test case: Canceling an interview
  it("should cancel an interview", () => {
    // Click on the "Delete" button to initiate interview cancellation
    cy.get("[alt=Delete]").click({ force: true });

    // Confirm the cancellation by clicking the "Confirm" button
    cy.contains("Confirm").click();

    // Check for the presence of the "Deleting" indicator
    cy.contains("Deleting").should("exist");

    // Ensure that the "Deleting" indicator disappears after cancellation
    cy.contains("Deleting").should("not.exist");

    // Ensure that the canceled appointment card is no longer displayed
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});