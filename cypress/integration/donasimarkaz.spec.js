<<<<<<< HEAD

describe('Test it is in the correct page', () => {
    it('Test if it contains "Create Markaz Donation Detail', () => {
        cy.visit('http://localhost:3000/admin/markaz/donasi/add/75')
        cy.get('h5').contains('Create Markaz Donation Detail').should('exist')
    })

    it('Test if it contains "Create Santri Donation Detail" or not', () => {
        cy.visit('http://localhost:300/admin/markaz/donasi/add/75')
        cy.get('p').contains('Create Santri Donation Detail').should('not.exist')
=======
describe('Test it is in the correct page', () => {
    it('Test if tambaheditmarkaz.js contains "UBAH MARKAZ', () => {
        cy.visit('http://localhost:3000/tambaheditmarkaz')
        cy.get('p').contains('UBAH MARKAZ').should('exist')
    })

    it('Test if tambaheditmarkaz.js contains "UBAH SANTRI" or not', () => {
        cy.visit('http://localhost:3000/tambaheditmarkaz')
        cy.get('p').contains('UBAH SANTRI').should('not.exist')
>>>>>>> 5428a9e (test: added testing for tambah/edit markaz)
    })
})