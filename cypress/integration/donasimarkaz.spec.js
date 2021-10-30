describe('Test it is in the correct page', () => {
    it('Test if tambaheditmarkaz.js contains "UBAH MARKAZ', () => {
        cy.visit('http://localhost:3000/tambaheditmarkaz')
        cy.get('p').contains('UBAH MARKAZ').should('exist')
    })

    it('Test if tambaheditmarkaz.js contains "UBAH SANTRI" or not', () => {
        cy.visit('http://localhost:3000/tambaheditmarkaz')
        cy.get('p').contains('UBAH SANTRI').should('not.exist')
    })
})