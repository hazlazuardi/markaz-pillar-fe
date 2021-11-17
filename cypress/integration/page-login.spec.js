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

    it('Test if password field can toggle show password', () => {
        cy.visit('http://localhost:3000/login')
        cy.get('#togglePasswordAtLogin').click()
        cy.get('#password').get("[type='text']").should('exist')
        cy.get('#togglePasswordAtLogin').click()
        cy.get('#password').get("[type='password']").should('exist')
    })

})

describe('Test type the fields and submit', () => {
    it('Test login and succeed', () => {
        const testEmail = `achmadafriza123@gmail.com`
        cy.visit('http://localhost:3000/login')
        cy.get('#email').type(testEmail)
        cy.get('#password').type('Admin123')
        cy.get('#submitAtLogin').contains('Masuk').click()
        cy.get('#submitAtLogin').contains('Masuk').should('be.disabled')
        cy.get('#snackbarAtLayout').contains(`Welcome back, ${testEmail}`).should('exist')
        cy.get('#submitAtLogin').contains('Masuk').should('not.be.disabled')
    })

    it('Test login and fail', () => {
        const testEmail = `none@gmail.com`
        cy.visit('http://localhost:3000/login')
        cy.get('#email').type(testEmail)
        cy.get('#password').type('Admin123')
        cy.get('#submitAtLogin').contains('Masuk').click()
        cy.get('#submitAtLogin').contains('Masuk').should('be.disabled')
        cy.get('#snackbarAtLayout').contains(`Alamat email atau password salah`).should('exist')
        cy.get('#submitAtLogin').contains('Masuk').should('not.be.disabled')
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