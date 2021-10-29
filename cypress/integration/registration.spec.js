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

    it('Test if password field can toggle show password', () => {
        cy.visit('http://localhost:3000/registration')
        cy.get('#togglePasswordAtRegistration').click()
        cy.get('#password').get("[type='text']").should('exist')
        cy.get('#togglePasswordAtRegistration').click()
        cy.get('#password').get("[type='password']").should('exist')
    })


})

describe('Test type the fields and submit', () => {
    it('Test register and succeed', () => {
        const testEmail = `${Math.random()}@gmail.com`
        cy.visit('http://localhost:3000/registration')
        cy.get('#email').type(testEmail)
        cy.get('#username').type("test-username")
        cy.get('#fullName').type('test-fullName')
        cy.get('#phoneNum').type('0811114433')
        cy.get('#address').type('test-address')
        cy.get('#password').type('Admin123')
        cy.get('#submitAtRegistration').contains('Daftar').click()
        cy.get('#submitAtRegistration').contains('Daftar').should('be.disabled')
        cy.get('#snackbarAtLayout').contains(`Welcome, ${testEmail}`).should('exist')
        cy.get('#submitAtRegistration').contains('Daftar').should('not.be.disabled')
    })

    it('Test register and fail', () => {
        const testEmail = `achmadafriza123@gmail.com`
        cy.visit('http://localhost:3000/registration')
        cy.get('#email').type(testEmail)
        cy.get('#username').type("test-username")
        cy.get('#fullName').type('test-fullName')
        cy.get('#phoneNum').type('0811114433')
        cy.get('#address').type('test-address')
        cy.get('#password').type('Admin123')
        cy.get('#submitAtRegistration').contains('Daftar').click()
        cy.get('#submitAtRegistration').contains('Daftar').should('be.disabled')
        cy.get('#snackbarAtLayout').contains(`Alamat email sudah digunakan`).should('exist')
        cy.get('#submitAtRegistration').contains('Daftar').should('not.be.disabled')
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

        cy.url().should('not.include', '/landing')
    })
})