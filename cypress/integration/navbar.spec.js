beforeEach(() => {
    cy.visit('http://localhost:3000/')
    localStorage.setItem("currentUser", JSON.stringify("Admin123@gmail.com"))
    localStorage.setItem("currentUserRole", JSON.stringify("ROLE_SUPERUSER"))
    localStorage.setItem("currentAccessToken", JSON.stringify('ey@9wersldgndg'))
    localStorage.setItem("currentRefreshToken", JSON.stringify('refresh'))
})

describe('Test the appbar buttons present', () => {
    it('Test if the appbar buttons present in desktop view', () => {
        cy.viewport(600,60)
        cy.get('a').contains('Markaz').should('be.visible')
        cy.get('a').contains('Santri').should('be.visible')
        cy.get('a').contains('Relawan').should('be.visible')
        cy.get('a').contains('Pengajar').should('be.visible')
        cy.get('a').contains('Profil').should('be.visible')
        cy.get('#menuIconButton').should('be.visible')
    })

    it('Test if the appbar buttons not present in mobile view', () => {
        cy.viewport(500,60)
        cy.get('a').contains('Markaz').should('not.visible')
        cy.get('a').contains('Santri').should('not.visible')
        cy.get('a').contains('Relawan').should('not.visible')
        cy.get('a').contains('Pengajar').should('not.visible')
        cy.get('a').contains('Profil').should('not.visible')
        cy.get('#menuIconButton').should('be.visible')
    })

})

describe('Test the drawer can be opened', () => {
    it('Test if the drawer buttons present', () => {
        cy.viewport(500,60)
        cy.get('#menuIconButton').should('exist').click()
        cy.get('div').contains('Markaz').should('exist')
        cy.get('div').contains('Santri').should('exist')
        cy.get('div').contains('Relawan').should('exist')
        cy.get('div').contains('Pengajar').should('exist')
        cy.get('div').contains('Profil').should('exist')
    })
})

describe('Test the drawer works well', () => {
    it('Test if the drawer logout button works well', () => {
        cy.viewport('iphone-5')
        cy.get('#menuIconButton').should('exist').click()
        cy.get('button').contains('Keluar').should('exist').click()
        cy.get('#snackbarAtLayout').contains(`Good bye`).should('exist')
    })
    it('Test if the drawer masuk button works well', () => {
        cy.viewport('iphone-5')
        cy.get('#menuIconButton').should('exist').click()
        cy.get('button').contains('Keluar').should('exist').click()
        cy.get('#menuIconButton').should('exist').click()
        cy.get('a').contains('Masuk').should('exist').click()
        cy.url().should('include', '/login')
    })
    it('Test if the drawer daftar button works well', () => {
        cy.viewport('iphone-5')
        cy.get('#menuIconButton').should('exist').click()
        cy.get('button').contains('Keluar').should('exist').click()
        cy.get('#menuIconButton').should('exist').click()
        cy.get('a').contains('Daftar').should('exist').click()
        cy.url().should('include', '/registration')
    })

})

