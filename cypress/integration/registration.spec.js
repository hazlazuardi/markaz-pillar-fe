// registration.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
const BASE_URL = process.env.BACKEND_HOST

describe('RedirectAfterSubmit', () => {
    it('should navigate to the login page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/registration')

        //   Fill the fields
        cy.request(`${BASE_URL}/register`, )

        // Find a link with an href attribute containing "about" and click it
        cy.get('a[href*="about"]').click()

        // The new url should include "/about"
        cy.url().should('include', '/about')

        // The new page should contain an h1 with "About page"
        cy.get('h1').contains('About Page')
    })
})