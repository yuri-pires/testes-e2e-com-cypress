Cypress.Commands.add(
  "preencherFormularioDeSignupEEnviar",
  (emailAddress, password) => {
    cy.intercept("GET", "**/notes").as("getNotes");

    cy.visit("/signup");

    cy.get("#email").type(emailAddress);
    cy.get("#password").type(password, { log: false });
    cy.get("#confirmPassword").type(password, { log: false });
    cy.contains("button", "Signup").click();
    cy.get("#confirmationCode").should("be.visible");

    cy.mailosaurGetMessage(Cypress.env("MAILOSAUR_SERVER_ID"), {
      sentTo: emailAddress,
    }).then((message) => {
      const confirmationCode = message.html.body.match(/\d{6}/)[0];
      cy.get("#confirmationCode").type(`${confirmationCode}{enter}`);

      cy.wait("@getNotes");
    });
  }
);

Cypress.Commands.add(
  "guiLogin",
  (
    email: string = Cypress.env("USER_EMAIL"),
    password: string = Cypress.env("USER_PASSWORD")
  ) => {
    cy.intercept("GET", "**/notes").as("getNotes");

    cy.visit("/login");
    cy.get("#email").type(email);
    cy.get("#password").type(password, { log: false });
    cy.contains("button", "Login").should("be.visible").click();
    cy.wait("@getNotes");
  }
);

Cypress.Commands.add(
  "sessionLogin",
  (
    email: string = Cypress.env("USER_EMAIL"),
    password: string = Cypress.env("USER_PASSWORD")
  ) => {
    const login = () => cy.guiLogin(email, password);
    cy.session(email, login);
  }
);
