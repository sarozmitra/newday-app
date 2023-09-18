
import 'cypress-axe';
import 'cypress-real-events';

describe('App - Modal Functionality', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.injectAxe();
  });

  it('opens the modal when "Open Modal" button is clicked', () => {
    cy.get('button').contains('Open Modal').click();
    cy.get('[data-testid="modal-overlay"]').should('be.visible');
    cy.contains('Helping people move forward with credit').should('be.visible');
  });

  it('closes the modal when "Close" button is clicked', () => {
    cy.get('button').contains('Open Modal').click();
    cy.get('button').contains('Close').click();
    cy.get('[data-testid="modal-overlay"]').should('not.exist');
  });

  it('closes the modal when clicking outside', () => {
    cy.get('button').contains('Open Modal').click();
    cy.get('[data-testid="modal-overlay"]').click('topLeft');
    cy.get('[data-testid="modal-overlay"]').should('not.exist');
  });

  it('traps focus inside the modal', () => {
    cy.get('button').contains('Open Modal').click();

    cy.focused().should('have.attr', 'aria-label', 'Close modal');
    cy.realPress("Tab")

    cy.focused().should('contain', 'Close');
    cy.realPress("Tab")

    cy.focused().should('have.attr', 'aria-label', 'Close modal');
    cy.focused().should('contain', 'X');

});

  it('closes the modal with Escape key', () => {
    cy.get('button').contains('Open Modal').click();
    cy.get('body').type('{esc}');
    cy.get('[data-testid="modal-overlay"]').should('not.exist');
  });

  it('prevents body scroll when modal is open', () => {
    cy.get('body').should('not.have.css', 'overflow', 'hidden');
    cy.get('button').contains('Open Modal').click();
    cy.get('body').should('have.css', 'overflow', 'hidden');
    cy.get('button').contains('Close').click();
    cy.get('body').should('not.have.css', 'overflow', 'hidden');
  });

  it('should have no accessibility violations on app page', () => {
    cy.checkA11y(); 
  });

  it('should have no accessibility violations when modal is open', () => {
    cy.get('button').contains('Open Modal').click();
    cy.checkA11y('[data-testid="typography-h2"]');  
  });

});