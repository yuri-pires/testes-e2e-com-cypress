import "./commands";
import "cypress-mailosaur";
import "cypress-iframe";

Cypress.on("uncaught:exception", () => {
  return false;
});
