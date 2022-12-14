import jwt_decode from "jwt-decode";

// login just once using API
let jwtResponse
let currentUser
let currentUserRole
let currentAccessToken
let currentRefreshToken

const DONASI_ID = 'cnav-ylsii-bqao'
const SANTRI_ID = 1;

const backendURL = Cypress.env('backendURL')
const frontendURL = Cypress.env('frontendURL')


before(function fetchUser() {
  cy.request('POST', `${backendURL}/authenticate`, {
    email: Cypress.env('email'),
    password: Cypress.env('password'),
  })
    .its('body')
    .then((res) => {
      jwtResponse = jwt_decode(res.result.accessToken)
      currentAccessToken = res.result.accessToken
      currentRefreshToken = res.result.refreshToken
      currentUser = jwtResponse.sub
      currentUserRole = jwtResponse.role
    })
})

// but set the user before visiting the page
// so the app thinks it is already authenticated
beforeEach(function setUser() {
  Cypress.Cookies.debug(true)
  cy.setCookie("currentUser", JSON.stringify(currentUser))
  cy.setCookie("currentUserRole", JSON.stringify(currentUserRole))
  cy.setCookie("currentAccessToken", JSON.stringify(currentAccessToken))
  cy.setCookie("currentRefreshToken", JSON.stringify(currentRefreshToken))
  Cypress.Cookies.preserveOnce("currentUser", JSON.stringify(currentUser))
  Cypress.Cookies.preserveOnce("currentUserRole", JSON.stringify(currentUserRole))
  Cypress.Cookies.preserveOnce("currentAccessToken", JSON.stringify(currentAccessToken))
  Cypress.Cookies.preserveOnce("currentRefreshToken", JSON.stringify(currentRefreshToken))
  cy.visit('/', {
    onBeforeLoad(win) {
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
  cy.visit(`${frontendURL}/admin/santri/${SANTRI_ID}/donasi/${DONASI_ID}/transaksi`)
})


describe("Test it is in the correct page", () => {

  it('Test if admin santri transaksi page contains "Daftar Donasi" or not', () => {
    cy.get("[data-testid=titlePage-at-admin-or-user-template]")
      .contains("Daftar Transaksi", { matchCase: false })
      .should("exist");
  });

  it('Test if admin transaksi page contains "This is admin page" or not', () => {
    cy.get("p").contains("This is admin page").should("not.exist");
  });

  it('Test ArrowBack directs to Admin Markaz', () => {
    cy.get(`[data-testid="arrowback-at-modules"]`).should('exist')
    cy.get(`[data-testid="arrowback-at-modules"]`).click()
    cy.url().should('include', `${frontendURL}/admin/santri/${SANTRI_ID}/donasi`)
  })

  it('Test if admin transaksi santri page redirect unauthorized users', () => {
    cy.get('#menuIconButton').should('exist').click()
    cy.get('button').contains('Keluar').should('exist').click()
    cy.visit(`${frontendURL}/admin/santri/${SANTRI_ID}/donasi/${DONASI_ID}/transaksi`)
    cy.url().should('include', `${frontendURL}`)
  })
});

describe(`Test if all components exist and visible`, () => {
  it('Test if all exists and visible', () => {

    // cy.get('[data-testid=filterChipButton-at-admin-or-user-template]').should('exist')
    // cy.get('[data-testid=tableView-at-admin-or-user-template]').should('exist')
    // cy.get('[data-testid=name-at-table-row]').should('exist');

    // cy.get('[data-testid=pagination-at-admin-or-user-template]').contains('1').should('exist')
    // cy.get('[data-testid=pagination-at-admin-or-user-template]').contains('1').click()

    // cy.get('[data-testid=showEntries-at-admin-or-user-template]').should('exist')
    // cy.get('[data-testid=showEntries-at-admin-or-user-template]').click()
    // cy.get('[data-testid=showEntries-at-admin-or-user-template]').get('li').contains('Show All').should('exist')
    // cy.get('[data-testid=showEntries-at-admin-or-user-template]').get('li').contains('Show All').click()


    // cy.get('[data-testid=fab-at-admin-or-user-template]').should('exist')
  });
})
