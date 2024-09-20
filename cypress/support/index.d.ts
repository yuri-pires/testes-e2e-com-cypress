declare namespace Cypress {
  interface Chainable<Subject = any> {
    preencherFormularioDeSignupEEnviar(email: string, password: string);

    guiLogin(email?: string, password?: string);
    sessionLogin(email?: string, password?: string);
    createNote(note, attachFile?);
    editNote(note, newNoteValue, attachFile);
    deleteNote(note);
  }
}
