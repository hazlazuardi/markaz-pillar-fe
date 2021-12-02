import jwt_decode from "jwt-decode";

// login just once using API
let jwtResponse
let currentUser
let currentUserRole
let currentAccessToken
let currentRefreshToken

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
  cy.visit(`${frontendURL}/admin/kegiatan`)
})

describe('Test it is in the correct page', () => {
  it('Test if admin kegiatan page contains "Daftar Kegiatan" or not', () => {
    cy.get('[data-testid=titlePage-at-admin-or-user-template]').contains('Daftar Kegiatan', { matchCase: false }).should('exist')
  })

  it('Test if admin kegiatan page contains "This is admin page" or not', () => {
    cy.get('p').contains('This is admin page').should('not.exist')
  })

  it('Test if admin kegiatan page redirect unauthorized users', () => {
    cy.get('#menuIconButton').should('exist').click()
    cy.get('button').contains('Keluar').should('exist').click()
    cy.visit(`${frontendURL}/admin/kegiatan`)
    cy.url().should('include', `${frontendURL}`)
  })

})

describe(`Test if all components exist and visible`, () => {
  it('Test if all exists and visible', () => {
    cy.get('[data-testid=searchbar-at-admin-or-user-template]').should('exist')
    cy.get('[data-testid=searchbar-at-admin-or-user-template]').type(";")
    cy.get('[data-testid=searchbar-at-admin-or-user-template]').should('exist')
    cy.get('[data-testid=searchbar-at-admin-or-user-template]').clear()

    // cy.get('[data-testid=filterChipButton-at-admin-or-user-template]').should('exist')
    cy.get('[data-testid=tab-grid-at-admin-or-user-template]').contains('Grid').should('exist')
    cy.get('[data-testid=gridView-at-admin-or-user-template]').should('exist')
    cy.get('[data-testid=name-at-gridview-card]').should('exist');

    cy.get('[data-testid=tab-table-at-admin-or-user-template]').contains('Table').should('exist')
    cy.get('[data-testid=tab-table-at-admin-or-user-template]').contains('Table').click()
    cy.get('[data-testid=tableView-at-admin-or-user-template]').should('exist')

    cy.get('[data-testid=pagination-at-admin-or-user-template]').contains('1').should('exist')
    cy.get('[data-testid=pagination-at-admin-or-user-template]').contains('1').click()

    cy.get('[data-testid=showEntries-at-admin-or-user-template]').should('exist')
    cy.get('[data-testid=showEntries-at-admin-or-user-template]').click()
    cy.get('[data-testid=showEntries-at-admin-or-user-template]').get('li').contains('Show All').should('exist')
    cy.get('[data-testid=showEntries-at-admin-or-user-template]').get('li').contains('Show All').click()

    cy.get('[data-testid=fab-at-admin-or-user-template]').should('exist')
  });
})

describe('Test CRUD Kegiatan', () => {
  const testKegiatan = `0 test Kegiatan ${Math.random()}`
  it('Test Create Kegiatan', () => {
    cy.visit(`${frontendURL}/admin/kegiatan/create`)
    cy.get(`[data-cy="dropzone"]`).attachFile('low.png', { subjectType: 'drag-n-drop' });
    cy.get(`[data-testid=dropzone-uploaded]`).should('exist');
    cy.get(`[data-testid=dropzone-uploaded]`).contains('low.png');
    cy.get('[data-testid=kegiatan-name-at-AdminCreateOrEditKegiatan-module]').type(testKegiatan)
    cy.get('[data-testid=kegiatan-description-at-AdminCreateOrEditKegiatan-module]').type('test-Kegiatan-description')
    cy.get('[data-testid=kegiatan-term-at-AdminCreateOrEditKegiatan-module]').type('test-Kegiatan-term')
    cy.get('[data-testid=kegiatan-benefit-at-AdminCreateOrEditKegiatan-module]').type('test-Kegiatan-benefit')
    cy.get('[data-testid=kegiatan-volunteerNeeded-at-AdminCreateOrEditKegiatan-module]').type('20')
    cy.get('[data-testid=kegiatan-location-at-AdminCreateOrEditKegiatan-module]').type('test-Kegiatan-location')
    cy.get('[data-testid=kegiatan-schedule-at-AdminCreateOrEditKegiatan-module]').type('test-Kegiatan-schedule')
    cy.get('[data-testid=kegiatan-submit-button-at-AdminCreateOrEditKegiatan-module]').contains('Simpan').click()
    cy.get('[data-testid=snackbar-at-layout]').contains('Kegiatan Created').should('exist')
    cy.get('[data-testid=kegiatan-submit-button-at-AdminCreateOrEditKegiatan-module]').contains('Simpan').should('not.be.disabled')
  })

  it('Test Read Kegiatan', () => {
    cy.get('[data-testid=showEntries-at-admin-or-user-template]').should('exist')
    cy.get('[data-testid=showEntries-at-admin-or-user-template]').click()
    cy.get('[data-testid=showEntries-at-admin-or-user-template]').get('li').contains('Show All').should('exist')
    cy.get('[data-testid=showEntries-at-admin-or-user-template]').get('li').contains('Show All').click()

    cy.get('[data-testid=card-action-area-at-gridview-card]').contains(testKegiatan, { matchCase: false }).should('exist').click({ force: true })
    // cy.get('[data-testid=lihat-detail-button-at-gridview-card]').contains("Lihat Detail", { matchCase: false }).click({force: true})
    cy.url().should('match', /admin\/kegiatan\/\d+/)
  })

  it('Test Update Kegiatan', () => {
    cy.get('[data-testid=showEntries-at-admin-or-user-template]').should('exist')
    cy.get('[data-testid=showEntries-at-admin-or-user-template]').click()
    cy.get('[data-testid=showEntries-at-admin-or-user-template]').get('li').contains('Show All').should('exist')
    cy.get('[data-testid=showEntries-at-admin-or-user-template]').get('li').contains('Show All').click()

    cy.get('[data-testid=searchbar-at-admin-or-user-template]').should('exist')
    cy.get('[data-testid=searchbar-at-admin-or-user-template]').type(testKegiatan)
    cy.wait(1000)

    cy.get('[data-testid=card-action-area-at-gridview-card]').contains(testKegiatan, { matchCase: false }).should('exist').get('[data-testid=edit-button-at-gridview-card]').contains('Edit').should('exist').click({ force: true })
    // cy.get('[data-testid=lihat-detail-button-at-gridview-card]').contains("Lihat Detail", { matchCase: false }).click({force: true})
    cy.url().should('match', /admin\/kegiatan\/\d+/)

    cy.get(`[data-cy="dropzone"]`).attachFile('low.png', { subjectType: 'drag-n-drop' });
    cy.get(`[data-testid=dropzone-uploaded]`).should('exist');
    cy.get(`[data-testid=dropzone-uploaded]`).contains('low.png');
    cy.get('[data-testid=kegiatan-name-at-AdminCreateOrEditKegiatan-module]').type('d').clear().type(testKegiatan + ' Edited')
    cy.get('[data-testid=kegiatan-description-at-AdminCreateOrEditKegiatan-module]').type('d').clear().type('test-Kegiatan-description')
    cy.get('[data-testid=kegiatan-term-at-AdminCreateOrEditKegiatan-module]').type('d').clear().type('test-Kegiatan-term')
    cy.get('[data-testid=kegiatan-benefit-at-AdminCreateOrEditKegiatan-module]').type('d').clear().type('test-Kegiatan-benefit')
    cy.get('[data-testid=kegiatan-volunteerNeeded-at-AdminCreateOrEditKegiatan-module]').type('d').clear().type('20')
    cy.get('[data-testid=kegiatan-location-at-AdminCreateOrEditKegiatan-module]').type('d').clear().type('test-Kegiatan-location')
    cy.get('[data-testid=kegiatan-schedule-at-AdminCreateOrEditKegiatan-module]').type('d').clear().type('test-Kegiatan-schedule')
    cy.get('[data-testid=kegiatan-submit-button-at-AdminCreateOrEditKegiatan-module]').contains('Simpan').click()
    cy.get('[data-testid=snackbar-at-layout]').contains('Kegiatan Edited').should('exist')
    cy.get('[data-testid=kegiatan-submit-button-at-AdminCreateOrEditKegiatan-module]').contains('Simpan').should('not.be.disabled')

  })

  it('Test Delete Kegiatan', () => {

    cy.get('[data-testid=showEntries-at-admin-or-user-template]').should('exist')
    cy.get('[data-testid=showEntries-at-admin-or-user-template]').click()
    cy.get('[data-testid=showEntries-at-admin-or-user-template]').get('li').contains('Show All').should('exist')
    cy.get('[data-testid=showEntries-at-admin-or-user-template]').get('li').contains('Show All').click()

    cy.get('[data-testid=searchbar-at-admin-or-user-template]').should('exist')
    cy.get('[data-testid=searchbar-at-admin-or-user-template]').type(testKegiatan + " Edited")
    cy.wait(1000)

    cy.get('[data-testid=delete-button-at-gridview-card]').contains('Delete').should('exist').click({ force: true })
    // cy.get('[data-testid=lihat-detail-button-at-gridview-card]').contains("Lihat Detail", { matchCase: false }).click({force: true})
    cy.get('[data-testid=not-found-at-AdminOrUserTemplate]').contains('No data found', { matchCase: false }).should('exist')
  })

})
