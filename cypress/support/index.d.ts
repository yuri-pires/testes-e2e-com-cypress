declare namespace Cypress {
  interface Chainable<Subject = any> {
    preencherFormularioDeSignupEEnviar(email: string, password: string);
  }
}
