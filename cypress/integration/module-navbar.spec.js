import jwt_decode from "jwt-decode";

// login just once using API
let jwtResponse
let currentUser
let currentUserRole
let currentAccessToken
let currentRefreshToken

const backendURL = Cypress.env('backendURL')
const frontendURL = Cypress.env('frontendURL')


before(function fetchUser () {
  cy.request('POST', `${backendURL}/authenticate`, {
    email: Cypress.env('email'),
    password: Cypress.env('password'),
  })
  .its('body')
  .then((res) => {
    jwtResponse = jwt_decode(res.result.accessToken)
    currentAccessToken= res.result.accessToken
    currentRefreshToken= res.result.refreshToken
    currentUser = jwtResponse.sub
    currentUserRole = jwtResponse.role
  })
})

// but set the user before visiting the page
// so the app thinks it is already authenticated
beforeEach(function setUser () {
  cy.visit('/', {
    onBeforeLoad (win) {
      // and before the page finishes loading
      // set the user object in local storage
      win.localStorage.setItem('jwt', JSON.stringify(jwtResponse))
      win.localStorage.setItem("currentUser", JSON.stringify(currentUser))
      win.localStorage.setItem("currentUserRole", JSON.stringify(currentUserRole))
      win.localStorage.setItem("currentAccessToken", JSON.stringify(currentAccessToken))
      win.localStorage.setItem("currentRefreshToken", JSON.stringify(currentRefreshToken))

    },
  })
  // the page should be opened and the user should be logged in
  cy.visit(`${frontendURL}/`)
})

describe('Test the appbar buttons present', () => {
    it('Test if the appbar buttons present in desktop view', () => {
        cy.viewport(600, 60)
        cy.get('a').contains('Markaz').should('be.visible')
        cy.get('a').contains('Santri').should('be.visible')
        cy.get('a').contains('Relawan').should('be.visible')
        cy.get('a').contains('Pengajar').should('be.visible')
        cy.get('a').contains('Profil').should('be.visible')
        cy.get('#menuIconButton').should('be.visible')
    })

    it('Test if the appbar buttons not present in mobile view', () => {
        cy.viewport(500, 60)
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
        cy.viewport(500, 60)
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

