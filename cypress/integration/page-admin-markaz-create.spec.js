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
  cy.visit(`${frontendURL}/admin/markaz/create`)
})

describe('Test it is in the correct page', () => {
  it('Test if create.js contains "Upload New Thumbnail" or not', () => {
    cy.get('h5').contains('Upload New Thumbnail').should('exist')
  })

  it('Test if create.js contains "This is create page" or not', () => {
    cy.get('p').contains('This is create page').should('not.exist')
  })

  it('Test ArrowBack directs to Admin Markaz', () => {
    cy.get(`[data-testid="arrowback-at-modules"]`).should('exist')
    cy.get(`[data-testid="arrowback-at-modules"]`).click()
    cy.url().should('eq', 'http://localhost:3000/admin/markaz')
  })

  it('Test if admin markaz page redirect unauthorized users', () => {
    cy.get('#menuIconButton').should('exist').click()
    cy.get('button').contains('Keluar').should('exist').click()
    cy.visit(`${frontendURL}/admin/markaz/create`)
    cy.url().should('eq', 'http://localhost:3000/')
})

})

describe(`Test functionality of inputs when create new markaz`, () => {
  const testMarkaz = `Markaz ${Math.random()}`
  it('Test if succeed', () => {
    cy.get(`[data-cy="dropzone"]`).attachFile('low.png', { subjectType: 'drag-n-drop' });
    cy.get(`#dropzone-uploaded`).should('exist');
    cy.get(`#dropzone-uploaded`).contains('low.png');
    cy.get('#markazNameAtComponentAdminCreateOrEditMarkaz').type(testMarkaz)
    cy.get('#markazBackgroundAtComponentAdminCreateOrEditMarkaz').type('test-fullName')
    cy.get('#category-select').click().get('li').contains('Markaz Umum').click()
    cy.get('#markazAddressAtComponentAdminCreateOrEditMarkaz').type('Bogor')
    cy.get('#markazContactInfoAtComponentAdminCreateOrEditMarkaz').type('0811122343')
    cy.get('#markazContactNameAtComponentAdminCreateOrEditMarkaz').type('Rija')
    cy.get('#markazSubmitAtComponentAdminCreateOrEditMarkaz').contains('Simpan').click()
    cy.get('#snackbarAtLayout').contains('Markaz Created').should('exist')
    cy.get('#markazSubmitAtComponentAdminCreateOrEditMarkaz').contains('Simpan').should('not.be.disabled')
  });

  it('Test if fails if empty field(s)', () => {
    cy.get(`[data-cy="dropzone"]`).attachFile('low.png', { subjectType: 'drag-n-drop' });
    cy.get(`#dropzone-uploaded`).should('exist');
    cy.get(`#dropzone-uploaded`).contains('low.png');
    cy.get('#markazNameAtComponentAdminCreateOrEditMarkaz').type("test-username")
    cy.get('#markazBackgroundAtComponentAdminCreateOrEditMarkaz').type('test-fullName')
    cy.get('#category-select').click().get('li').contains('Markaz Umum').click()
    cy.get('#markazSubmitAtComponentAdminCreateOrEditMarkaz').contains('Simpan').click()
    cy.get('#snackbarAtLayout').should('exist')
    cy.get('#markazSubmitAtComponentAdminCreateOrEditMarkaz').contains('Simpan').should('not.be.disabled')
  });

  it('Test if fails if image is too big', () => {
    cy.get(`[data-cy="dropzone"]`).attachFile('high.png', { subjectType: 'drag-n-drop' });
    cy.get(`#dropzone-uploaded`).should('not.exist');
    cy.get('#markazNameAtComponentAdminCreateOrEditMarkaz').type("test-username")
    cy.get('#markazBackgroundAtComponentAdminCreateOrEditMarkaz').type('test-fullName')
    cy.get('#category-select').click().get('li').contains('Markaz Umum').click()
    cy.get('#markazAddressAtComponentAdminCreateOrEditMarkaz').type('0811114433')
    cy.get('#markazSubmitAtComponentAdminCreateOrEditMarkaz').contains('Simpan').click()
    cy.get('#snackbarAtLayout').should('exist')
    cy.get('#markazSubmitAtComponentAdminCreateOrEditMarkaz').contains('Simpan').should('not.be.disabled')
  });
});
