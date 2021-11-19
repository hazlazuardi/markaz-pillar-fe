beforeEach(() => {
    cy.visit('http://localhost:3000/santri')
    cy.get('[data-testid=titlePage-at-admin-or-user-template]').contains('Daftar santri', { matchCase: false }).should('exist')
})


describe('Test it is in the correct page', () => {
    it('Test if admin santri page contains "Daftar santri" or not', () => {
        cy.get('[data-testid=titlePage-at-admin-or-user-template]').contains('Daftar santri', { matchCase: false }).should('exist')
    })

    it('Test if admin santri page contains "This is admin page" or not', () => {
        cy.get('p').contains('This is admin page').should('not.exist')
    })

})

describe('Navigation', () => {
    it('Should navigate to the detail.js page', () => {
        cy.get('[data-testid=lihat-detail-button-at-gridview-card]').contains("Lihat Detail", { matchCase: false }).should('exist').click({force: true})
        // cy.get('[data-testid=lihat-detail-button-at-gridview-card]').contains("Lihat Detail", { matchCase: false }).click({force: true})
        cy.url().should('match', /santri\/\d+/)
    })

    it('Should not navigate to the detail.js page', () => {
        cy.get('[data-testid=donasi-button-at-gridview-card]').contains("Donasi", { matchCase: false }).should('exist').click({force: true})
        // cy.get('[data-testid=donasi-button-at-gridview-card]').contains("Donasi", { matchCase: false }).click({force: true})
        cy.url().should('not.match', /santri\/\d+/)
    })
})

describe('Test for detail page, it is in the correct page', () => {
    it('Test if detail.js contains "Kebutuhan Fasilitas" or not', () => {
        cy.get('[data-testid=lihat-detail-button-at-gridview-card]').contains("Lihat Detail", { matchCase: false }).should('exist').click({force: true})
        cy.get('[data-testid=detail-at-detailview]').contains('Tempat Markaz', { matchCase: false }).should('exist')
    })

    it('Test if detail.js contains "Kategori" or not', () => {
        cy.get('[data-testid=lihat-detail-button-at-gridview-card]').contains("Lihat Detail", { matchCase: false }).should('exist').click({force: true})
        cy.get('[data-testid=detail-at-detailview]').contains('Tempat Markaz', { matchCase: false }).should('exist')
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
        cy.get('[data-testid=name-at-gridview-card]').should('exist');

        cy.get('[data-testid=pagination-at-admin-or-user-template]').contains('1').should('exist')
        cy.get('[data-testid=pagination-at-admin-or-user-template]').contains('1').click({force: true})

        cy.get('[data-testid=showEntries-at-admin-or-user-template]').should('exist')
        cy.get('[data-testid=showEntries-at-admin-or-user-template]').click()
        cy.get('[data-testid=showEntries-at-admin-or-user-template]').get('li').contains('Show All').should('exist')
        cy.get('[data-testid=showEntries-at-admin-or-user-template]').get('li').contains('Show All').click()
    });
})
