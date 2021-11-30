// const frontendURL = Cypress.env("frontendURL");

// beforeEach(function setUser() {
//   cy.visit(`${frontendURL}/relawan/kegiatan`);
// });

// describe("Test it is in the correct page", () => {
//   it('Test if relawan kegiatan page contains "Kegiatan Relawan" or not', () => {
//     cy.get("h1").contains("Kegiatan Relawan").should("exist");
//   });

//   it('Test if registration.js contains "hi" or not', () => {
//     cy.get("p").contains("hi").should("not.exist");
//   });
// });

// describe("Navigation", () => {
//   it("Should navigate to the registrasi relawan page", () => {
//     cy.get("[data-testid=daftar-sekarang-button-relawan-kegiatan]")
//       .contains("Daftar Sekarang", { matchCase: false })
//       .should("exist")
//       .click({ force: true });
//     cy.url().should("match", /relawan\/kegiatan\/\d+/);
//   });

//   it("Should not navigate to the registrasi page", () => {
//     cy.get("[data-testid=lihat-detail-button-relawan-kegiatan]")
//       .contains("Lihat Detail", { matchCase: false })
//       .should("exist")
//       .click({ force: true });
//     cy.url().should("not.match", /relawan\/kegiatan\/\d+/);
//   });
// });

// describe(`Test if landing grid view exist`, () => {
//   it("Test if all exists and visible", () => {
//     cy.get("[landing-grid-view]").should("exist");
//   });
// });
