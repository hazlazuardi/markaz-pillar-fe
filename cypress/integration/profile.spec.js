describe('Page elements', () => {
    it('Test if the profile page contains "Kegiatan Saya"', () => {
        cy.visit('http://localhost:3000/profile')
        cy.wait(4000)
        cy.get('p').contains('Kegiatan Saya').should('exist')
    })

    it('Test if the profile page contains "This is admin page" or not', () => {
        cy.visit('http://localhost:3000/profile')
        cy.wait(4000)
        cy.get('p').contains('This is admin page').should('not.exist')
    })
})

describe('Navigation', () => {
    it('Test if the "Profile" link leads to the profile page', () => {
        cy.visit('http://localhost:3000')
        cy.get('a').contains('Profil').should('exist').click()
        cy.wait(4000)
        cy.url().should('include', '/profile')
    })

    it('Test if the "Markaz" link does not lead to the profile page', () => {
        cy.visit('http://localhost:3000')
        cy.get('a').contains('Markaz').should('exist').click()
        cy.wait(4000)
        cy.url().should('not.include', '/profile')
    })
})

describe('Logged In User', () => {
    it('Test if the page contains the avatar if a user is logged in', () => {
        const testEmail = `achmadafriza123@gmail.com`
        cy.visit('http://localhost:3000/login')
        cy.wait(3000)
        cy.get('#email').type(testEmail)
        cy.get('#password').type('Admin123')
        cy.get('#submitAtLogin').contains('Masuk').click()
        cy.wait(2000)
        cy.visit('http://localhost:3000/profile')
        cy.wait(3000)
        cy.get('.MuiAvatar-circular').should('exist')
    })

    it('Test if the page contains the "Masuk" button if no user is logged in', () => {
        cy.visit('http://localhost:3000/profile')
        cy.wait(2000)
        cy.get('a').contains('Masuk').should('exist')
    })
})
