import { faker } from "@faker-js/faker/locale/en";

describe("Cenários onde a pré-condição é estar autenticado", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/notes").as("getNotes");
    cy.sessionLogin();
  });

  it("CRUDs a note", () => {
    const noteDescription = faker.lorem.words(4);

    cy.createNote(noteDescription);
    cy.wait("@getNotes");

    const updatedNoteDescription = faker.lorem.words(4);
    const attachFile = true;

    cy.editNote(noteDescription, updatedNoteDescription, attachFile);
    cy.wait("@getNotes");

    cy.deleteNote(updatedNoteDescription);
    cy.wait("@getNotes");
  });

  it("Enviar com sucesso o formulário de settings", () => {
    cy.intercept("POST", "**/prod/billing").as("paymentRequest");

    cy.fillSettingsFormAndSubmit();

    cy.wait("@getNotes");
    cy.wait("@paymentRequest").its("state").should("be.equal", "Complete");
  });

  it("Logout", { tags: "@desktop-and-tablet" }, () => {
    cy.visit("/");

    cy.wait("@getNotes");

    // Estratégia para ser usada em conjunto com as configs passadas via CLI
    // A depender do Width passado na CLI, nosso código irá executar esse if
    // Com um valor pré definido (viewportWidthBreakpoint), que como o próprio
    // nome sugere, é o ponto em que os menus colapsam e a responsividade é aplicada.
    if (
      Cypress.config("viewportWidth") < Cypress.env("viewportWidthBreakpoint")
    ) {
      cy.get(".navbar-toggle.collapsed").should("be.visible").click();
    }

    cy.contains("a", "Logout").should("be.visible").click();

    cy.get("#email").should("be.visible");
  });
});
