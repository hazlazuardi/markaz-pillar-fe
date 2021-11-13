beforeEach(() => {
    const testEmail = `achmadafriza123@gmail.com`
    cy.visit('http://localhost:3000/login')
    cy.get('#email').type(testEmail)
    cy.get('#password').type('Admin123')
    cy.get('#submitAtLogin').contains('Masuk').click()
    cy.wait(2000)
    cy.visit('http://localhost:3000/admin/markaz/edit/1')
})

describe('Test it is in the correct page', () => {
    it('Test if edit contains "Edit Thumbnail" or not', () => {
        cy.get('h5').contains('Edit Thumbnail').should('exist')
    })

    it('Test if edit contains "This is edit page" or not', () => {
        cy.get('p').contains('This is edit page').should('not.exist')
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
        cy.get('#snackbarAtLayout').contains('Markaz Edited').should('exist', { timeout: 5000 })
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
        cy.get('#snackbarAtLayout').contains('Incorrect edited information').should('exist', { timeout: 5000 })
        cy.get('#markazSubmitAtComponentAdminCreateOrEditMarkaz').contains('Simpan').should('not.be.disabled')
    });

    it('Test if fails if image is too big', () => {
        cy.get(`[data-cy="dropzone"]`).attachFile('high.png', { subjectType: 'drag-n-drop' });
        cy.get('#snackbarAtLayout').contains('File is larger than 1 MB').should('exist', {timeout: 5000})
        cy.get(`#dropzone-uploaded`).should('not.exist', {timeout: 5000});
        cy.get('#markazNameAtComponentAdminCreateOrEditMarkaz').clear().type("test-markaz")
        cy.get('#markazBackgroundAtComponentAdminCreateOrEditMarkaz').clear().type('test-markaz-background')
        cy.get('#category-select').click().get('li').contains('Markaz Umum').click()
        cy.get('#markazAddressAtComponentAdminCreateOrEditMarkaz').clear().type('0811114433')
        cy.get('#markazSubmitAtComponentAdminCreateOrEditMarkaz').contains('Simpan').click()
        cy.get('#snackbarAtLayout').contains('Markaz Edited').should('exist', {timeout: 5000})
        cy.get('#markazSubmitAtComponentAdminCreateOrEditMarkaz').contains('Simpan').should('not.be.disabled')
    });
});
