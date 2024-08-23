describe("Tetsing the menu review form fields", () => {
  beforeEach(() => {
    cy.visit(
      "/restaurant/takeout/669a7fb42dfb3b487c102f96?category=Main%20Course"
    );
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

  // fill an empty input fields and select the review tab and check that the button should be disabled
  it.only("Should fill the input fields and select the review tab and the button should not be diabled", () => {
    cy.wait(4000);
    cy.getDataTest("review_tab_4").click();
    cy.getDataTest("review_button").should("not.be.disabled");
  });
  // submit the form
  // check that the review length is more than 1
});
