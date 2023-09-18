declare namespace Cypress {
  interface Chainable {
    tab(options?: any): Chainable<Element>;
  }
}