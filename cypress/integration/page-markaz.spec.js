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
        cy.get('[data-testid=lihat-detail-button-at-card]').contains("Lihat Detail", { matchCase: false }).should('exist')
        cy.get('[data-testid=lihat-detail-button-at-card]').contains("Lihat Detail", { matchCase: false }).click()
        cy.url().should('match', /markaz\/\d+/)
    })

    it('Should not navigate to the detail.js page', () => {
        cy.get('[data-testid=donasi-button-at-card]').contains("Donasi", { matchCase: false }).should('exist')
        cy.get('[data-testid=donasi-button-at-card]').contains("Donasi", { matchCase: false }).click()
        cy.url().should('not.match', /markaz\/\d+/)
    })
})

describe('Test for detail page, it is in the correct page', () => {
    it('Test if detail.js contains "Kebutuhan Fasilitas" or not', () => {
        cy.get('[data-testid=lihat-detail-button-at-card]').contains("Lihat Detail", { matchCase: false }).click()
        cy.get('[data-testid=inconsistent-key-at-profile-module]').contains('Kategori', { matchCase: false }).should('exist')
    })

    it('Test if detail.js contains "Kategori" or not', () => {
        cy.get('[data-testid=lihat-detail-button-at-card]').first().click()
        cy.get('[data-testid=inconsistent-key-at-profile-module]').contains('Kategori', { matchCase: false }).should('exist')
    })
})

describe(`Test if all components exist and visible`, () => {
    it('Test if all exists and visible', () => {
        cy.get('[data-testid=searchbar-at-admin-or-user-template]').should('exist')
        cy.get('[data-testid=searchbar-at-admin-or-user-template]').type(";")
        cy.get('[data-testid=searchbar-at-admin-or-user-template]').should('exist')
        cy.get('[data-testid=searchbar-at-admin-or-user-template]').clear()
        cy.wait(600)
        // cy.get('[data-testid=filterChipButton-at-admin-or-user-template]').should('exist')
        cy.get('[data-testid=gridView-at-admin-or-user-template]').should('exist')
        cy.get('[data-testid=name-at-card]').should('exist');

        cy.get('[data-testid=pagination-at-admin-or-user-template]').contains('1').should('exist')
        cy.get('[data-testid=pagination-at-admin-or-user-template]').contains('1').click()

        cy.get('[data-testid=showEntries-at-admin-or-user-template]').should('exist')
        cy.get('[data-testid=showEntries-at-admin-or-user-template]').click()
        cy.get('[data-testid=showEntries-at-admin-or-user-template]').get('li').contains('Show All').should('exist')
        cy.get('[data-testid=showEntries-at-admin-or-user-template]').get('li').contains('Show All').click()
    });
})
