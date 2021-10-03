describe('Test it is in the correct page', () => {
    it('Test if registration.js contains "Daftarkan diri anda" or not', () => {
        cy.visit('http://localhost:3000/registration')
        cy.get('h1').contains('Daftarkan diri anda').should('exist')
    })

    it('Test if registration.js contains "hi" or not', () => {
        cy.visit('http://localhost:3000/registration')
        cy.get('p').contains('hi').should('not.exist')
    })
})

describe('Test it has all the fields', () => {
    it('Test if registration.js contains all fields', () => {
        cy.visit('http://localhost:3000/registration')
        cy.get('#email').should('exist')
        cy.get('#username').should('exist')
        cy.get('#fullName').should('exist')
        cy.get('#phoneNum').should('exist')
        cy.get('#address').should('exist')
        cy.get('#password').should('exist')
    })

})

describe('Navigation', () => {
    it('Should navigate to the login.js page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/registration')

        cy.get('a').contains("Sudah memiliki akun? Masuk").click()

        cy.url().should('include', '/login')
    })

    it('Should not navigate to the landing page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/registration')

        cy.get('a').contains("Sudah memiliki akun? Masuk").click()

        cy.url().should('not.include', '/')
    })
})