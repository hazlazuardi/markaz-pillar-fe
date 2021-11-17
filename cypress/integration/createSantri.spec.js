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
  cy.visit(`${frontendURL}/admin/santri/create`)
})

describe('Test it is in the correct page', () => {
    it('Test if create.js contains "Upload an Image" or not', () => {
        cy.get('h5').contains('Upload an Image').should('exist')
    })

    it('Test if create.js contains "This is create page" or not', () => {
        cy.get('p').contains('This is create page').should('not.exist')
    })

    it('Test ArrowBack directs to Admin Markaz', () => {
      cy.get(`[data-testid="arrowback-at-modules"]`).should('exist')
      cy.get(`[data-testid="arrowback-at-modules"]`).click()
      cy.url().should('eq', 'http://localhost:3000/admin/santri')
    })
  
})

describe(`Test functionality of inputs when create new santri`, () => {
    const testSantri = `Santri ${Math.random()}`
    it('Test if succeed', () => {
        cy.get(`[data-cy="dropzone"]`).attachFile('low.png', { subjectType: 'drag-n-drop' });
        cy.get(`[data-testid=dropzone-uploaded]`).should('exist');
        cy.get(`[data-testid=dropzone-uploaded]`).contains('low.png');
        cy.get('[data-testid=santri-name-at-AdminCreateOrEditSantri-module]').type(testSantri)
        cy.get('[data-testid=santri-background-at-AdminCreateOrEditSantri-module]').type('test-santri-background')
        cy.get('[data-testid=santri-gender-at-AdminCreateOrEditSantri-module]').click().get('li').contains('Perempuan').click()
        cy.get('[data-testid=santri-markaz-at-AdminCreateOrEditSantri-module]').click().get('li').contains('test-markaz').click()
        cy.get('[data-testid=santri-address-at-AdminCreateOrEditSantri-module]').type('0811122343')
        cy.get('[data-testid=santri-birthPlace-at-AdminCreateOrEditSantri-module]').type('test-santri-birthPlace')
        cy.get('[data-testid=santri-birthDate-at-AdminCreateOrEditSantri-module]').type('2021-12-12')
        cy.get('[data-testid=santri-submit-button-at-AdminCreateOrEditSantri-module]').contains('Simpan').click()
        cy.get('[data-testid=snackbar-at-layout]').contains('Santri Created').should('exist')
        cy.get('[data-testid=santri-submit-button-at-AdminCreateOrEditSantri-module]').contains('Simpan').should('not.be.disabled')
    });

    it('Test if fails if empty field(s)', () => {
        cy.get(`[data-cy="dropzone"]`).attachFile('low.png', { subjectType: 'drag-n-drop' });
        cy.get(`[data-testid=dropzone-uploaded]`).should('exist');
        cy.get(`[data-testid=dropzone-uploaded]`).contains('low.png');
        cy.get('[data-testid=santri-address-at-AdminCreateOrEditSantri-module]').type('0811122343')
        cy.get('[data-testid=santri-birthPlace-at-AdminCreateOrEditSantri-module]').type('test-santri-birthPlace')
        cy.get('[data-testid=santri-birthDate-at-AdminCreateOrEditSantri-module]').type('2021-12-12')
        cy.get('[data-testid=santri-submit-button-at-AdminCreateOrEditSantri-module]').contains('Simpan').click()
        cy.get('[data-testid=snackbar-at-layout]').contains('Incorrect information').should('exist')
        cy.get('[data-testid=santri-submit-button-at-AdminCreateOrEditSantri-module]').contains('Simpan').should('not.be.disabled')
    });

    it('Test if fails if image is too big', () => {
        cy.get(`[data-cy="dropzone"]`).attachFile('high.png', { subjectType: 'drag-n-drop' });
        cy.get('[data-testid=snackbar-at-layout]').contains("File is larger than 1 MB").should('exist')
        cy.get(`[data-testid=dropzone-uploaded]`).should('not.exist');
        cy.get('[data-testid=santri-address-at-AdminCreateOrEditSantri-module]').type('0811122343')
        cy.get('[data-testid=santri-birthPlace-at-AdminCreateOrEditSantri-module]').type('test-santri-birthPlace')
        cy.get('[data-testid=santri-birthDate-at-AdminCreateOrEditSantri-module]').type('2021-12-12')
        cy.get('[data-testid=santri-submit-button-at-AdminCreateOrEditSantri-module]').contains('Simpan').click()
        cy.get('[data-testid=snackbar-at-layout]').contains('Incorrect information').should('exist')
        cy.get('[data-testid=santri-submit-button-at-AdminCreateOrEditSantri-module]').contains('Simpan').should('not.be.disabled')
    });
});
