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
//     cy.request('POST', `${backendURL}/authenticate`, {
//         email: Cypress.env('email'),
//         password: Cypress.env('password'),
//     })
//         .its('body')
//         .then((res) => {
//             jwtResponse = jwt_decode(res.result.accessToken)
//             currentAccessToken = res.result.accessToken
//             currentRefreshToken = res.result.refreshToken
//             currentUser = jwtResponse.sub
//             currentUserRole = jwtResponse.role
//         })
// })

// // but set the user before visiting the page
// // so the app thinks it is already authenticated
// beforeEach(function setUser() {
//     cy.visit('/', {
//         onBeforeLoad(win) {
//             // and before the page finishes loading
//             // set the user object in local storage
//             win.localStorage.setItem('jwt', JSON.stringify(jwtResponse))
//             win.localStorage.setItem("currentUser", JSON.stringify(currentUser))
//             win.localStorage.setItem("currentUserRole", JSON.stringify(currentUserRole))
//             win.localStorage.setItem("currentAccessToken", JSON.stringify(currentAccessToken))
//             win.localStorage.setItem("currentRefreshToken", JSON.stringify(currentRefreshToken))

//         },
//     })
//     // the page should be opened and the user should be logged in
// })

// describe('Page elements', () => {
//     beforeEach(() => {
//         cy.visit(`${frontendURL}`).wait(400)
//         cy.visit(`${frontendURL}/profile`)
//     })

//     it('Test if the profile page contains "Kegiatan Saya"', () => {
//         cy.get('p').contains('Kegiatan Saya').should('exist')
//     })

//     it('Test if the profile page contains "This is admin page" or not', () => {
//         cy.get('p').contains('This is admin page').should('not.exist')
//     })
// })

// describe('Navigation', () => {
//     it('Test if the "Profile" link leads to the profile page', () => {
//         cy.visit(`${frontendURL}`)
//         cy.get('a').contains('Profil').should('exist').click()
//         cy.url().should('include', '/profile')
//     })

//     it('Test if the "Markaz" link does not lead to the profile page', () => {
//         cy.visit(`${frontendURL}`)
//         cy.get('a').contains('Markaz').should('exist').click()
//         cy.url().should('not.include', '/profile')
//     })
// })

// describe('Logged In User', () => {
//     it('Test if the page contains the "Masuk" button if no user is logged in', () => {
//         cy.get('#menuIconButton').should('exist').click()
//         cy.get('button').contains('Keluar').should('exist').click()
//         cy.get('#menuIconButton').should('exist').click()
//         cy.get('a').contains('Masuk').should('exist').click()
//     })

//     it('Test if admin transaksi santri page redirect unauthorized users', () => {
//         cy.get('#menuIconButton').should('exist').click()
//         cy.get('button').contains('Keluar').should('exist').click()
//         cy.visit(`${frontendURL}/profile`)
//         cy.url().should('include', `${frontendURL}`)
//     })

// })
