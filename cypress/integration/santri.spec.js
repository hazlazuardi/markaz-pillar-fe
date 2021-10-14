describe('Test it is in the correct page', () => {
    it('Test if showAll.js contains "Daftar Santri" or not', () => {
        cy.visit('http://localhost:3000/santri')
        cy.get('h2').contains('Daftar Santri').should('exist')
    })

    it('Test if showAll.js.js contains "hi" or not', () => {
        cy.visit('http://localhost:3000/santri')
        cy.get('p').contains('hi').should('not.exist')
    })
})

describe('Navigation', () => {
    it('Should navigate to the detail.js page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/santri')

        cy.get('button').contains("Lihat Detail").click()

        cy.url().should('match', /santri\/\d+/)
    })

    it('Should not navigate to the landing page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/santri')

        cy.get('button').contains("Cari").click()

        cy.url().should('not.match', /santri\/\d+/)
    })
})