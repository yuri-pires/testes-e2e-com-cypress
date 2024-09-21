import "./commands";
import "cypress-mailosaur";
import "cypress-iframe";

// @ts-ignore
import registerCypressGrep = require("@cypress/grep");
registerCypressGrep();

Cypress.on("uncaught:exception", () => {
  return false;
});
