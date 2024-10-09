describe("Testing the registration process for Tastytrove", () => {
  // navigate to the home page first
  // open the modal
  // check if the button is disabled when the form input has not being filled
  // fill in the form
  // check if the button is not disabled when the form inputs has being filled
  // intercept the registration request
  // check for message

  beforeEach(() => {
    // navigating to the home page
    cy.visit("/");
    cy.wait(7500);
    cy.getDataTest("navbar_login_button").click();
  });
  // check to see if we can locate the navbar button
  it("Should Click the Navbar Sign Up Button and the login modal shuld be displayed", () => {
    cy.wait(2000);
    cy.getDataTest("loginmodal").should("be.visible");
  });

  it("Should Click on the toggle button on the login modal to display the registration modal", () => {
    cy.wait(2000);
    cy.getDataTest("toggle_button").click();
    cy.wait(2000);
    // registerModal
    cy.getDataTest("registerModal").should("be.visible");
  });

  it("Should check that the registration button is disabled when the input fields are not filled", () => {
    cy.wait(2000);
    cy.getDataTest("toggle_button").click();
    cy.wait(2000);
    // registerModal
    cy.getDataTest("registration_button").should("be.disabled");
  });

  it("Should fill the input fields and check that register button is not be diabled", () => {
    cy.wait(2000);
    cy.getDataTest("toggle_button").click();
    cy.getDataTest("register_input_name").should("exist").type("Cynthia");
    cy.getDataTest("register_input_email")
      .should("exist")
      .type("Cynthia@gmail.com");
    cy.getDataTest("register_input_hashedPassword")
      .should("exist")
      .type("12345");
    cy.getDataTest("register_input_username").should("exist").type("Cynthia");
    cy.getDataTest("registration_button").should("not.be.disabled");
  });

  it.only("Should submit the registration form and wait for the API response", () => {
    cy.intercept("POST", "/api/v1/auth/register").as("registerUser");
    cy.getDataTest("toggle_button").click();
    // fill in the form fields
    cy.getDataTest("register_input_name").should("exist").type("Cynthia");
    cy.getDataTest("register_input_email")
      .should("exist")
      .type("Cynthia@gmail.com");
    // It should click the registration button to trigger the request
    cy.getDataTest("register_input_hashedPassword")
      .should("exist")
      .type("12345");
    cy.getDataTest("register_input_username").should("exist").type("Cynthia");
    cy.getDataTest("registration_button").click();

    cy.wait("@registerUser", );
    // cy.get('div[role="status"]').should("exist");
    cy.getDataTest("loginmodal").should("exist");
  });
});
