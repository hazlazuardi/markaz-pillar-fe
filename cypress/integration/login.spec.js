describe('Test it is in the correct page', () => {
    it('Test if login.js contains "Masuk ke akun anda" or not', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('h1').contains('Masuk ke akun anda').should('exist')
    })

    it('Test if login.js contains "hi" or not', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('p').contains('hi').should('not.exist')
    })
})

describe('Test it has all the fields', () => {
    it('Test if login.js contains all fields', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('#email').should('exist')
        cy.get('#password').should('exist')
    })

})

describe('Navigation', () => {
    it('Should navigate to the registration.js page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/login')

        cy.get('a').contains("Belum memiliki akun? Registrasi").click()

        cy.url().should('include', '/registration')
    })

    it('Should not navigate to the landing page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/login')

        cy.get('a').contains("Belum memiliki akun? Registrasi").click()

        cy.url().should('not.include', '/landing')
    })
})