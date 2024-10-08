describe("Testing the sign up process of Tastytrove", () => {
  // navigate to the home page first
  // open the modal
  // check if the button is disabled when the form input has not being filled
  // fill in the form
  // check if the button is not disabled when the form inputs has being filled
  // intercept the login request
  // check for message

  beforeEach(() => {
    // navigating to the home page
    cy.visit("/");
  });
  // check to see if we can locate the navbar button
  //  the review component should be mounted
  it("Should Click the Navbar Sign Up Button", () => {
    cy.wait(6000);
    cy.getDataTest("navbar_login_button").click();
  });
  // check that button when the inputs field has not been filled
  // it("Should check the review button is disabled", () => {
  //   cy.wait(4000);
  //   cy.getDataTest("review_button").should("be.disabled");
  // });

  // it("Should fill in the form, sign up, submit the review form, and the review list items should show", () => {
  //   cy.wait(4000);
  //   cy.getDataTest("review_tab_4").click();
  //   cy.getDataTest("description").type("A nice meal");
  //   cy.getDataTest("review_button").click();
  //   cy.wait(3000);
  //   cy.getDataTest("loginmodal_button").click();
  //   cy.wait(4000);
  //   cy.getDataTest("review_button").click();
  //   // cy.wait(10000);
  // cy.intercept("POST", "/api/v1/review").as("createReview");
  // cy.wait("@createReview");
  //   // // cy.getDataTest("review_list_content").with(() => {
  //   // //   // cy.getDataTest(`[data-test^="review_list_content"]`);
  //   // // });
  //   cy.getDataTest("review_list_content").within(() => {
  //     cy.get(`[data-test^="review_list_item"]`).should("have.length", 1);
  //   });
  // });
  // submit the form
  // check that the review length is more than 1
});
