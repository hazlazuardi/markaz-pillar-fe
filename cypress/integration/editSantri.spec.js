beforeEach(() => {
    const testEmail = `achmadafriza123@gmail.com`
    cy.visit('http://localhost:3000/login')
    cy.get('#email').type(testEmail)
    cy.get('#password').type('Admin123')
    cy.get('#submitAtLogin').contains('Masuk').click()
    cy.wait(2000)
    cy.visit('http://localhost:3000/admin/santri/edit/1')
})

describe('Test it is in the correct page', () => {
    it('Test if edit.js contains "Upload an Image" or not', () => {
        cy.get('h5').contains('Upload an Image').should('exist')
    })

    it('Test if edit.js contains "This is edit page" or not', () => {
        cy.get('p').contains('This is edit page').should('not.exist')
    })
})

describe(`Test functionality of inputs when edit new santri`, () => {
    const testSantri = `test-santri-${Math.random()}`
    it('Test if succeed', () => {
        cy.get(`[data-cy="dropzone"]`, { timeout: 40000 }).attachFile('low.png', { subjectType: 'drag-n-drop' });
        cy.get(`[data-testid=dropzone-uploaded]`, { timeout: 40000 }).should('exist');
        cy.get(`[data-testid=dropzone-uploaded]`).contains('low.png');
        cy.get('[data-testid=santri-name-at-AdminCreateOrEditSantri-module]', {timeout:4000}).type(';').clear().type(testSantri)
        cy.get('[data-testid=santri-background-at-AdminCreateOrEditSantri-module]').should('not.be.empty').type(';').clear().type('test-santri-background')
        cy.get('[data-testid=santri-gender-at-AdminCreateOrEditSantri-module]').click().get('li').contains('Perempuan').click()
        cy.get('[data-testid=santri-markaz-at-AdminCreateOrEditSantri-module]').click().get('li').contains('test-markaz').click()
        cy.get('[data-testid=santri-address-at-AdminCreateOrEditSantri-module]').should('not.be.empty').type(';').clear().type('0811122343')
        cy.get('[data-testid=santri-birthPlace-at-AdminCreateOrEditSantri-module]').should('not.be.empty').type(';').clear().type('test-santri-birthPlace')
        cy.get('[data-testid=santri-birthDate-at-AdminCreateOrEditSantri-module]').should('not.be.empty').type(';').clear().type('2021-12-12')
        cy.get('[data-testid=santri-submit-button-at-AdminCreateOrEditSantri-module]').contains('Simpan').click()
        cy.get('[data-testid=snackbar-at-layout]', { timeout: 40000 }).contains('Santri Edited').should('exist', { timeout: 5000 })
        cy.get('[data-testid=santri-submit-button-at-AdminCreateOrEditSantri-module]').contains('Simpan').should('not.be.disabled')
    });

    it('Test if fails if empty field(s)', () => {
        cy.get(`[data-cy="dropzone"]`, { timeout: 40000 }).attachFile('low.png', { subjectType: 'drag-n-drop' });
        cy.get(`[data-testid=dropzone-uploaded]`, { timeout: 40000 }).should('exist');
        cy.get(`[data-testid=dropzone-uploaded]`).contains('low.png');
        cy.get('[data-testid=santri-address-at-AdminCreateOrEditSantri-module]').should('not.be.empty').type(';').clear().type('0811122343')
        cy.get('[data-testid=santri-birthPlace-at-AdminCreateOrEditSantri-module]').should('not.be.empty').type(';').clear().type('test-santri-birthPlace')
        cy.get('[data-testid=santri-birthDate-at-AdminCreateOrEditSantri-module]').should('not.be.empty').type(';').clear().type('2021-12-12')
        cy.get('[data-testid=santri-submit-button-at-AdminCreateOrEditSantri-module]').contains('Simpan').click()
        cy.get('[data-testid=snackbar-at-layout]', { timeout: 40000 }).contains('Incorrect information').should('exist', { timeout: 5000 })
        cy.get('[data-testid=santri-submit-button-at-AdminCreateOrEditSantri-module]').contains('Simpan').should('not.be.disabled')
    });

    it('Test if fails if image is too big', () => {
        cy.get(`[data-cy="dropzone"]`).attachFile('high.png', { subjectType: 'drag-n-drop' });
        cy.get('[data-testid=snackbar-at-layout]', { timeout: 40000 }).contains("File is larger than 1 MB").should('exist', { timeout: 5000 })
        cy.get(`[data-testid=dropzone-uploaded]`).should('not.exist', { timeout: 5000 });
        cy.get('[data-testid=santri-address-at-AdminCreateOrEditSantri-module]').should('not.be.empty').type(';').clear().type('0811122343')
        cy.get('[data-testid=santri-birthPlace-at-AdminCreateOrEditSantri-module]').should('not.be.empty').type(';').clear().type('test-santri-birthPlace')
        cy.get('[data-testid=santri-birthDate-at-AdminCreateOrEditSantri-module]').should('not.be.empty').type(';').clear().type('2021-12-12')
        cy.get('[data-testid=santri-submit-button-at-AdminCreateOrEditSantri-module]').contains('Simpan').click()
        cy.get('[data-testid=snackbar-at-layout]', { timeout: 40000 }).contains('Incorrect information').should('exist', { timeout: 5000 })
        cy.get('[data-testid=santri-submit-button-at-AdminCreateOrEditSantri-module]').contains('Simpan').should('not.be.disabled')
    });
});
