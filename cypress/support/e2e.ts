import "./commands";
import "cypress-mailosaur";
import "cypress-iframe";

const registerCypressGrep = require("@cypress/grep");
registerCypressGrep();

Cypress.on("uncaught:exception", () => {
  return false;
});
