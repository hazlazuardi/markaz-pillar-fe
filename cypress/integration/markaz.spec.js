beforeEach(() => {
    cy.visit('http://localhost:3000/markaz')
})


describe('Test it is in the correct page', () => {
    it('Test if admin markaz page contains "Daftar markaz" or not', () => {
        cy.get('[data-testid=titlePage-at-admin-or-user-template]').contains('Daftar markaz', { matchCase: false }).should('exist')
    })

    it('Test if admin markaz page contains "This is admin page" or not', () => {
        cy.get('p').contains('This is admin page').should('not.exist')
    })

})

describe('Navigation', () => {
    it('Should navigate to the detail.js page', () => {
        cy.get('[data-testid=lihat-detail-button-at-card]').contains("Lihat Detail", { timeout: 4000 }).click()
        cy.url().should('match', /markaz\/\d+/)
    })

    it('Should not navigate to the detail.js page', () => {
        cy.get('[data-testid=donasi-button-at-card]').contains("Donasi", { timeout: 4000 }).click()
        cy.url().should('not.match', /markaz\/\d+/)
    })
})

describe('Test for detail page, it is in the correct page', () => {
    it('Test if detail.js contains "Kebutuhan Fasilitas" or not', () => {
        cy.visit('http://localhost:3000/markaz/2')
        cy.get('[data-testid=inconsistent-key-at-profile-module]').contains('Kebutuhan Fasilitas', {timeout: 4000}).should('exist')
    })

    it('Test if detail.js contains "Kategori" or not', () => {
        cy.visit('http://localhost:3000/markaz/2')
        cy.get('[data-testid=inconsistent-key-at-profile-module]').contains('Kategori').should('exist')
    })
})

describe(`Test if all components exist and visible`, () => {
    it('Test if all exists and visible', () => {
        cy.get('[data-testid=searchbar-at-admin-or-user-template]').should('exist')
        // cy.get('[data-testid=filterChipButton-at-admin-or-user-template]').should('exist')
        cy.get('[data-testid=tab-grid-at-admin-or-user-template]').should('not.exist')
        cy.get('[data-testid=name-at-card]').should('exist');
        cy.get('[data-testid=tab-table-at-admin-or-user-template]').should('not.exist')
        cy.get('[data-testid=name-at-table-row]').should('not.exist');
        cy.get('[data-testid=pagination-at-admin-or-user-template]').contains('2').should('exist').click()
        cy.get('[data-testid=showEntries-at-admin-or-user-template]').should('exist').click().get('li').contains('100').should('exist').click()
        cy.get('[data-testid=pagination-at-admin-or-user-template]').contains('2').should('not.exist')
        cy.get('[data-testid=fab-at-admin-or-user-template]').should('exist')
    });
})
