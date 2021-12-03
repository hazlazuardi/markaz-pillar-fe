// import jwt_decode from "jwt-decode";

// // login just once using API
// let jwtResponse
// let currentUser
// let currentUserRole
// let currentAccessToken
// let currentRefreshToken

// const backendURL = Cypress.env('backendURL')
// const frontendURL = Cypress.env('frontendURL')


// before(function fetchUser() {
//   cy.request('POST', `${backendURL}/authenticate`, {
//     email: Cypress.env('email'),
//     password: Cypress.env('password'),
//   })
//     .its('body')
//     .then((res) => {
//       jwtResponse = jwt_decode(res.result.accessToken)
//       currentAccessToken = res.result.accessToken
//       currentRefreshToken = res.result.refreshToken
//       currentUser = jwtResponse.sub
//       currentUserRole = jwtResponse.role
//     })
// })

// // but set the user before visiting the page
// // so the app thinks it is already authenticated
// beforeEach(function setUser() {
//   cy.visit('/', {
//     onBeforeLoad(win) {
//       // and before the page finishes loading
//       // set the user object in local storage
//       win.localStorage.setItem('jwt', JSON.stringify(jwtResponse))
//       win.localStorage.setItem("currentUser", JSON.stringify(currentUser))
//       win.localStorage.setItem("currentUserRole", JSON.stringify(currentUserRole))
//       win.localStorage.setItem("currentAccessToken", JSON.stringify(currentAccessToken))
//       win.localStorage.setItem("currentRefreshToken", JSON.stringify(currentRefreshToken))

//     },
//   })
//   // the page should be opened and the user should be logged in
//   cy.visit(`${frontendURL}/relawan/kegiatan/1/registrasi`)
// })

// describe('Test it is in the correct page', () => {
//   it('Test if it contains "Add Volunteer Information', () => {
//     cy.get('h5').contains('Add Volunteer Information').should('exist')
//   })

//   it('Test if it contains "Create Santri Donation Detail" or not', () => {
//     cy.get('p').contains('Create Santri Donation Detail').should('not.exist')
//   })

// })