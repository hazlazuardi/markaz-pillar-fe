// beforeEach(() => {
//     const testEmail = `achmadafriza123@gmail.com`
//     cy.visit('http://localhost:3000/login')
//     cy.get('#email').type(testEmail)
//     cy.get('#password').type('Admin123')
//     cy.get('#submitAtLogin').contains('Masuk').click()
//     cy.wait(2000)
//     cy.visit('http://localhost:3000/admin/santri')
// })

describe('Test it is in the correct page', () => {
    before(() => {
        const testEmail = `achmadafriza123@gmail.com`
        cy.visit('http://localhost:3000/login')
        cy.get('#email').type(testEmail)
        cy.get('#password').type('Admin123')
        cy.get('#submitAtLogin').contains('Masuk').click()
        cy.wait(2000)
        cy.visit('http://localhost:3000/admin/santri')    
    })

    it('Test if admin markaz page contains "Daftar Santri" or not', () => {
        cy.get('[data-testid=titlePage-at-admin-or-user-template]').contains('Daftar Santri', { matchCase: false }).should('exist')
    })

    it('Test if admin santri page contains "This is admin page" or not', () => {
        cy.get('p').contains('This is admin page').should('not.exist')
    })

    it('Test if admin santri page redirect unauthorized users', () => {
        cy.viewport('iphone-5')
        cy.get('#menuIconButton').should('exist').click()
        cy.get('button').contains('Keluar').should('exist').click()
        cy.visit('http://localhost:3000/admin/santri')
        cy.url().should('eq', 'http://localhost:3000/', { timeout: 1000 })
    })

})

describe(`Test if all components exist and visible`, () => {
    before(() => {
        const testEmail = `achmadafriza123@gmail.com`
        cy.visit('http://localhost:3000/login')
        cy.get('#email').type(testEmail)
        cy.get('#password').type('Admin123')
        cy.get('#submitAtLogin').contains('Masuk').click()
        cy.wait(2000)
        cy.visit('http://localhost:3000/admin/santri')    
    })
    it('Test if all exists and visible', () => {
        cy.get('[data-testid=searchbar-at-admin-or-user-template]').should('exist')
        cy.get('[data-testid=searchbar-at-admin-or-user-template]').type(";")
        cy.get('[data-testid=searchbar-at-admin-or-user-template]').should('exist')
        cy.get('[data-testid=searchbar-at-admin-or-user-template]').clear()
        
        // cy.get('[data-testid=filterChipButton-at-admin-or-user-template]').should('exist')
        cy.get('[data-testid=tab-grid-at-admin-or-user-template]').contains('Grid').should('exist')
        cy.get('[data-testid=gridView-at-admin-or-user-template]').should('exist')
        cy.get('[data-testid=name-at-card]').should('exist');
    
        cy.get('[data-testid=tab-table-at-admin-or-user-template]').contains('Table').should('exist')
        cy.get('[data-testid=tab-table-at-admin-or-user-template]').contains('Table').click()
        cy.get('[data-testid=tableView-at-admin-or-user-template]').should('exist')
        cy.get('[data-testid=name-at-table-row]').should('exist');
      
        cy.get('[data-testid=pagination-at-admin-or-user-template]', {timeout: 4000}).contains('1').should('exist')
        cy.get('[data-testid=pagination-at-admin-or-user-template]', {timeout: 4000}).contains('1').click()

        cy.get('[data-testid=showEntries-at-admin-or-user-template]').should('exist')
        cy.get('[data-testid=showEntries-at-admin-or-user-template]').click()
        cy.get('[data-testid=showEntries-at-admin-or-user-template]').get('li').contains('Show All').should('exist')
        cy.get('[data-testid=showEntries-at-admin-or-user-template]').get('li').contains('Show All').click()
       
       
        cy.get('[data-testid=fab-at-admin-or-user-template]').should('exist')
    });
})
