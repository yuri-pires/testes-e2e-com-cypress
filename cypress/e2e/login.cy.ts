describe("Login", () => {
  it("Realizar login com um usuário com validação de e-mail", () => {
    cy.visit("/login");
    cy.get("#email").type(`${Cypress.env("USER_EMAIL")}`);
  });
});
