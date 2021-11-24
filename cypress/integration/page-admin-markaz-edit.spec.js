import jwt_decode from "jwt-decode";

// login just once using API
let jwtResponse
let currentUser
let currentUserRole
let currentAccessToken
let currentRefreshToken

const backendURL = Cypress.env('backendURL')
const frontendURL = Cypress.env('frontendURL')

const MARKAZ_ID = '1'


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
  cy.visit(`${frontendURL}/admin/markaz/${MARKAZ_ID}/edit`)
})

describe('Test it is in the correct page', () => {
  it('Test if [progresid] contains "Edit Thumbnail" or not', () => {
    cy.get('h5').contains('Edit Thumbnail').should('exist')
  })

  it('Test if [progresid] contains "This is [progresid] page" or not', () => {
    cy.get('p').contains('This is [progresid] page').should('not.exist')
  })

  it('Test ArrowBack directs to Admin Markaz', () => {
    cy.get(`[data-testid="arrowback-at-modules"]`).should('exist')
    cy.get(`[data-testid="arrowback-at-modules"]`).click()
    cy.url().should('include', `${frontendURL}/admin/markaz/${MARKAZ_ID}`)
  })

  it('Test if admin [progresid] markaz page redirect unauthorized users', () => {
    cy.get('#menuIconButton').should('exist').click()
    cy.get('button').contains('Keluar').should('exist').click()
    cy.visit(`${frontendURL}/admin/markaz/${MARKAZ_ID}/edit`)
    // cy.url().should('include', `${frontendURL}`)
  })


})

describe(`Test functionality of inputs when edit new markaz`, () => {
  it('Test if succeed', () => {
    cy.get(`[data-cy="dropzone"]`).attachFile('low.png', { subjectType: 'drag-n-drop' });
    cy.get(`#dropzone-uploaded`).should('exist');
    cy.get(`#dropzone-uploaded`).contains('low.png');
    cy.get('#markazNameAtComponentAdminCreateOrEditMarkaz').clear().type("test-markaz")
    cy.get('#markazBackgroundAtComponentAdminCreateOrEditMarkaz').clear().type('test-markaz-background')
    cy.get('#category-select').click().get('li').contains('Markaz Umum').click()
    cy.get('#markazAddressAtComponentAdminCreateOrEditMarkaz').clear().type('Bogor')
    cy.get('#markazContactInfoAtComponentAdminCreateOrEditMarkaz').click().focused().clear().type('0811122343')
    cy.get('#markazContactNameAtComponentAdminCreateOrEditMarkaz').clear().type('Rija')
    cy.get('#markazSubmitAtComponentAdminCreateOrEditMarkaz').contains('Simpan').click()
    cy.get('#snackbarAtLayout').contains('Markaz Edited').should('exist')
    cy.get('#markazSubmitAtComponentAdminCreateOrEditMarkaz').contains('Simpan').should('not.be.disabled')
  });

  it('Test if fails if empty field(s)', () => {
    cy.get(`[data-cy="dropzone"]`).attachFile('low.png', { subjectType: 'drag-n-drop' });
    cy.get(`#dropzone-uploaded`).should('exist');
    cy.get(`#dropzone-uploaded`).contains('low.png');
    cy.get('#markazNameAtComponentAdminCreateOrEditMarkaz').click().focused().clear()
    cy.get('#markazBackgroundAtComponentAdminCreateOrEditMarkaz').clear().type('test-markaz-background')
    cy.get('#category-select').click().get('li').contains('Markaz Umum').click()
    cy.get('#markazSubmitAtComponentAdminCreateOrEditMarkaz').contains('Simpan').click()
    cy.get('#snackbarAtLayout').contains('Incorrect edited information').should('exist')
    cy.get('#markazSubmitAtComponentAdminCreateOrEditMarkaz').contains('Simpan').should('not.be.disabled')
  });

  it('Test if fails if image is too big', () => {
    cy.get(`[data-cy="dropzone"]`).attachFile('high.png', { subjectType: 'drag-n-drop' });
    cy.get('#snackbarAtLayout').contains('File is larger than 1 MB').should('exist')
    cy.get(`#dropzone-uploaded`).should('not.exist');
  });
});
