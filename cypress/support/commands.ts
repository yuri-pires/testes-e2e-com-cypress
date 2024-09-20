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
    password: string = Cypress.env("USER_PASSWORD"),
    { cache = true } = {}
  ) => {
    const login = () => cy.guiLogin(email, password);
    cy.session(email, login);
  }
);

const attachFileHandler = () => {
  cy.get("#file").selectFile("cypress/fixtures/example.json");
};

Cypress.Commands.add("createNote", (note, attachFile = false) => {
  cy.visit("/notes/new");
  cy.get("#content").type(note);

  if (attachFile) {
    attachFileHandler();
  }

  cy.contains("button", "Create").click();

  cy.contains(".list-group-item", note).should("be.visible");
});

Cypress.Commands.add("editNote", (note, newNoteValue, attachFile = false) => {
  cy.intercept("GET", "**/notes/**").as("getNote");

  cy.contains(".list-group-item", note).click();
  cy.wait("@getNote");

  cy.get("#content").as("contentField").clear();
  cy.get("@contentField").type(newNoteValue);

  if (attachFile) {
    attachFileHandler();
  }

  cy.contains("button", "Save").click();

  cy.contains(".list-group-item", newNoteValue).should("be.visible");
  cy.contains(".list-group-item", note).should("not.exist");
});

Cypress.Commands.add("deleteNote", (note) => {
  cy.contains(".list-group-item", note).click();
  cy.contains("button", "Delete").click();

  cy.get(".list-group-item").its("length").should("be.at.least", 1);
  cy.contains(".list-group-item", note).should("not.exist");
});
