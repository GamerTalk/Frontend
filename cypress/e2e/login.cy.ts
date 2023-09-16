describe('Sign in', () => {
  it('should log in with valid credentials', () => {
    cy.visit('/auth/signin');
    cy.get('#email').type(Cypress.env("username"));
    cy.get('#password').type(Cypress.env("user_password"));
    cy.get('form').submit();
  })
})