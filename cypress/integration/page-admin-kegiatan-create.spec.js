const frontendURL = Cypress.env('frontendURL')

beforeEach(function setUser() {
    cy.visit(`${frontendURL}/admin/kegiatan/create`)
})

describe('Test it is in the correct page', () => {
    it('Test if it contains "Create Kegiatan"', () => {
        cy.get('h5').contains('Create Kegiatan').should('exist')
    })

    it('Test if it contains "Edit Kegiatan"', () => {
        cy.get('p').contains('Edit Kegiatan').should('not.exist')
    })
})