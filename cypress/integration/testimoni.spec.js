describe('Test it is in the correct page', () => {
    it('Test if it contains "Create Volunteer Testimoni Detail', () => {
        cy.visit('http://localhost:3000/admin/volunteer/donasi/create')
        cy.get('h5').contains('Create Volunteer Testimoni Detail').should('exist')
    })

    it('Test if it contains "Create Volunteer Donation Detail" or not', () => {
        cy.visit('http://localhost:3000/admin/volunteer/donasi/create')
        cy.get('p').contains('Create Volunteer Donation Detail').should('not.exist')
    })
})