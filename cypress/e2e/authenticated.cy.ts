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
});
