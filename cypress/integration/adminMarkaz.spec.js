beforeEach(() => {
    const testEmail = `achmadafriza123@gmail.com`
    cy.visit('http://localhost:3000/login')
    cy.get('#email').type(testEmail)
    cy.get('#password').type('Admin123')
    cy.get('#submitAtLogin').contains('Masuk').click()
    cy.wait(2000)
    cy.visit('http://localhost:3000/admin/markaz')
})

describe('Test it is in the correct page', () => {
    it('Test if admin markaz page contains "Daftar Markaz" or not', () => {
        cy.get('[data-testid=titlePage-at-admin-or-user-template]').contains('Daftar Markaz', { matchCase: false }).should('exist')
    })

    it('Test if admin markaz page contains "This is admin page" or not', () => {
        cy.get('p').contains('This is admin page').should('not.exist')
    })

    it('Test if admin markaz page redirect unauthorized users', () => {
        cy.viewport('iphone-5')
        cy.get('#menuIconButton').should('exist').click()
        cy.get('button').contains('Keluar').should('exist').click()
        cy.visit('http://localhost:3000/admin/markaz')
        cy.url().should('eq', 'http://localhost:3000/', {timeout: 1000})
    })

})

describe(`Test if all components exist and visible`, () => {
    it('Test if all exists and visible', () => {
        cy.get('[data-testid=searchbar-at-admin-or-user-template]').should('exist')
        cy.get('[data-testid=filterChipButton-at-admin-or-user-template]').should('exist')
        cy.get('[data-testid=tab-grid-at-admin-or-user-template]').contains('Grid').should('exist')
        cy.get('[data-testid=gridView-at-admin-or-user-template]').should('exist')
        cy.get('[data-testid=name-at-card]').should('exist');
        cy.get('[data-testid=tab-table-at-admin-or-user-template]').contains('Table').should('exist').click()
        cy.get('[data-testid=tableView-at-admin-or-user-template]').should('exist')
        cy.get('[data-testid=name-at-table-row]').should('exist');
        cy.get('[data-testid=pagination-at-admin-or-user-template]').contains('2').should('exist').click()
        cy.get('[data-testid=showEntries-at-admin-or-user-template]').should('exist').click().get('li').contains('50').should('exist').click()
        cy.get('[data-testid=pagination-at-admin-or-user-template]').contains('2').should('not.exist')
        cy.get('[data-testid=fab-at-admin-or-user-template]').should('exist')
    });
})
