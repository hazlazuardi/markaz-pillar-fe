describe('Test', () => {
  it('Test if index.js contains "hi" or not', () => {
    cy.visit('http://localhost:3005')
    cy.get('p').contains('hi').should('not.exist')
  })
})

describe('Navigation', () => {
  it('Should navigate to the index.js page', () => {
    // Start from the index page
    cy.visit('http://localhost:3005/landing')

    cy.get('a').contains("Logo").click()

    cy.url().should('include', '/')
  })
})