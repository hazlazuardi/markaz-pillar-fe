import jwt_decode from "jwt-decode";

// login just once using API
let jwtResponse
let currentUser
let currentUserRole
let currentAccessToken
let currentRefreshToken

const backendURL = Cypress.env('backendURL')
const frontendURL = Cypress.env('frontendURL')

const SANTRI_ID = '1'

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
  cy.visit(`${frontendURL}/admin/santri/${SANTRI_ID}/edit`)
})

describe('Test it is in the correct page', () => {
  it('Test if [progresid].js contains "Upload an Image" or not', () => {
    cy.get('h5').contains('Upload an Image').should('exist')
  })

  it('Test if [progresid].js contains "This is [progresid] page" or not', () => {
    cy.get('p').contains('This is [progresid] page').should('not.exist')
  })

  it('Test ArrowBack directs to Admin Markaz', () => {
    cy.get(`[data-testid="arrowback-at-modules"]`).should('exist')
    cy.get(`[data-testid="arrowback-at-modules"]`).click()
    cy.url().should('include', `${frontendURL}/admin/santri/${SANTRI_ID}`)
  })

  it('Test if admin [progresid] santri page redirect unauthorized users', () => {
    cy.get('#menuIconButton').should('exist').click()
    cy.get('button').contains('Keluar').should('exist').click()
    cy.visit(`${frontendURL}/admin/santri/${SANTRI_ID}/edit`)
    // cy.url().should('include', `${frontendURL}`)
  })

})

describe(`Test functionality of inputs when edit new santri`, () => {
  const testSantri = `test-santri-${Math.random()}`.slice(0, 19)
  it('Test if succeed', () => {
    cy.get(`[data-cy="dropzone"]`).attachFile('low.png', { subjectType: 'drag-n-drop' });
    cy.get(`[data-testid=dropzone-uploaded]`).should('exist');
    cy.get(`[data-testid=dropzone-uploaded]`).contains('low.png');
    cy.get('[data-testid=santri-name-at-AdminCreateOrEditSantri-module]').type(';').clear().type(testSantri)
    cy.get('[data-testid=santri-background-at-AdminCreateOrEditSantri-module]').should('not.be.empty').type(';').clear().type('test-santri-background')
    cy.get('[data-testid=santri-gender-at-AdminCreateOrEditSantri-module]').click().get('li').contains('Perempuan').click()
    cy.get('[data-testid=santri-markaz-at-AdminCreateOrEditSantri-module]').click().get('li').contains('0 Markaz 2').click()
    cy.get('[data-testid=santri-address-at-AdminCreateOrEditSantri-module]').should('not.be.empty').type(';').clear().type('0811122343')
    cy.get('[data-testid=santri-birthPlace-at-AdminCreateOrEditSantri-module]').should('not.be.empty').type(';').clear().type('test-santri-birthPlace')
    cy.get('[data-testid=santri-birthDate-at-AdminCreateOrEditSantri-module]').should('not.be.empty').type('2021-12-12').clear().type('2021-12-12')
    cy.get('[data-testid=santri-submit-button-at-AdminCreateOrEditSantri-module]').contains('Simpan').click()
    cy.get('[data-testid=snackbar-at-layout]').contains('Santri Edited').should('exist')

  });

  it('Test if fails if wrong format', () => {
    cy.get(`[data-cy="dropzone"]`).attachFile('low.png', { subjectType: 'drag-n-drop' });
    cy.get(`[data-testid=dropzone-uploaded]`).should('exist');
    cy.get(`[data-testid=dropzone-uploaded]`).contains('low.png');
    cy.get('[data-testid=santri-address-at-AdminCreateOrEditSantri-module]').should('not.be.empty').type(';').clear().type('0811122343')
    cy.get('[data-testid=santri-birthPlace-at-AdminCreateOrEditSantri-module]').should('not.be.empty').type(';').clear().type('test-santri-birthPlace')
    cy.get('[data-testid=santri-birthDate-at-AdminCreateOrEditSantri-module]').should('not.be.empty').type('2021-12-12').clear().type('2021-12-12')
    cy.get('[data-testid=santri-submit-button-at-AdminCreateOrEditSantri-module]').contains('Simpan').click()
    // cy.get('[data-testid=snackbar-at-layout]').contains('Incorrect information').should('exist')

  });

  it('Test if fails if image is too big', () => {
    cy.get(`[data-cy="dropzone"]`).attachFile('high.png', { subjectType: 'drag-n-drop' });
    cy.get('[data-testid=snackbar-at-layout]').contains("File is larger than 1 MB").should('exist')
    cy.get(`[data-testid=dropzone-uploaded]`).should('not.exist');
    cy.get('[data-testid=santri-address-at-AdminCreateOrEditSantri-module]').should('not.be.empty').type(';').clear().type('0811122343')
    cy.get('[data-testid=santri-birthPlace-at-AdminCreateOrEditSantri-module]').should('not.be.empty').type(';').clear().type('test-santri-birthPlace')
    cy.get('[data-testid=santri-birthDate-at-AdminCreateOrEditSantri-module]').should('not.be.empty').type('2021-12-12').clear().type('2021-12-12')
    cy.get('[data-testid=santri-submit-button-at-AdminCreateOrEditSantri-module]').contains('Simpan').click()
    cy.get('[data-testid=snackbar-at-layout]').should('exist')

  });
});
