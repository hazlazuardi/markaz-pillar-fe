
describe('Test it is in the correct page', () => {
    it('Test if it contains "Create Markaz Donation Detail', () => {
        cy.visit('http://localhost:3000/admin/markaz/donasi/create/2')
        cy.get('h5').contains('Create Markaz Donation Detail').should('exist')
    })

    it('Test if it contains "Create Santri Donation Detail" or not', () => {
        cy.visit('http://localhost:3000/admin/markaz/donasi/create/2')
        cy.get('p').contains('Create Santri Donation Detail').should('not.exist')
    })
})