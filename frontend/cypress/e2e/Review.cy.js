describe("Testing the menu review form fields", () => {
  beforeEach(() => {
    cy.visit("/restaurant/takeout/66e44ed2c776e46c6b4764af?category=desserts");
  });
  //  the review component should be mounted
  it("Should Test Subscribe form", () => {
    cy.wait(4000);
    cy.getDataTest("Review_header").should("exist", /Leave a Review/i);
  });
  // check that button when the inputs field has not been filled
  it("Should check the review button is disabled", () => {
    cy.wait(4000);
    cy.getDataTest("review_button").should("be.disabled");
  });
  // fill the input fields and select the review tab and check that the button is not disabled
  it("Should fill the input fields and select the review tab and the button should not be diabled", () => {
    cy.wait(4000);
    cy.getDataTest("review_tab_4").click();
    cy.getDataTest("description").type("A nice meal");
    cy.getDataTest("review_button").should("not.be.disabled");
  });

  // select only the review tab and check that the button should be disabled
  it("Should select only the review tab and check that the button should be disabled", () => {
    cy.wait(4000);
    cy.getDataTest("review_tab_4").click();
    cy.getDataTest("review_button").should("be.disabled");
  });
  // fill only the input fields and dont select the review tab and check that the button is disabled

  it("should fill only the input fields and don't select the review tab and also check that the button is disabled", () => {
    cy.wait(4000);
    cy.getDataTest("description").type("A nice meal");
    cy.getDataTest("review_button").should("be.disabled");
  });
  // Should display the login modal when the user does not exists
  it(" Should display the login modal when the user does not exists", () => {
    cy.wait(4000);
    cy.getDataTest("review_tab_4").click();
    cy.getDataTest("description").type("A nice meal");
    cy.getDataTest("review_button").click();
    cy.getDataTest("loginmodal").should("be.visible");
  });

  // Should display the login modal when the user does not exists and sign up
  it("Should display the login modal when the user does not exists and sign up", () => {
    cy.wait(4000);
    cy.getDataTest("review_tab_4").click();
    cy.getDataTest("description").type("A nice meal");
    cy.getDataTest("review_button").click();
    cy.wait(3000);
    cy.getDataTest("loginmodal_button").click();
    cy.wait(2000);
    cy.getDataTest("loginmodal").should("not.exist");
  });
  // should fill in the form, sign up, submit the review form, and the review list items should show

  it.only("Should fill in the form, sign up, submit the review form, and the review list items should show", () => {
    cy.wait(4000);
    cy.getDataTest("review_tab_4").click();
    cy.getDataTest("description").type("A nice meal");
    cy.getDataTest("review_button").click();
    cy.wait(3000);
    cy.getDataTest("loginmodal_button").click();
    cy.wait(4000);
     cy.getDataTest("description").type("A nice meal");
    cy.getDataTest("review_button").click();
    // cy.wait(10000);
    cy.intercept("POST", "/api/v1/review").as("createReview");
    cy.wait("@createReview");
    // // cy.getDataTest("review_list_content").with(() => {
    // //   // cy.getDataTest(`[data-test^="review_list_content"]`);
    // // });
    cy.getDataTest("review_list_content").within(()=> {
      cy.get(`[data-test^="review_list_item"]`).should('exist')
    });
  });
  // submit the form
  // check that the review length is more than 1
});
