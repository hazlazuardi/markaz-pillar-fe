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

        cy.wait(5000)

        cy.get('a').contains("Lihat Detail").click()

        cy.wait(5000)

        cy.url().should('match', /santri\/\d+/)
    })

    it('Should not navigate to the detail.js page', () => {
        // Start from the index page
        cy.visit('http://localhost:3000/santri')

        cy.get('a').contains("Markaz").click()

        cy.url().should('not.match', /santri\/\d+/)
    })
})

describe('Test for detail page, it is in the correct page', () => {
    it('Test if detail.js contains "Jenis Kelamin" or not', () => {
        cy.visit('http://localhost:3000/santri/1')
        cy.get('p').contains('Jenis Kelamin').should('exist')
    })

    it('Test if detail.js contains "Kategori" or not', () => {
        cy.visit('http://localhost:3000/santri/1')
        cy.get('p').contains('Kategori').should('not.exist')
    })
})