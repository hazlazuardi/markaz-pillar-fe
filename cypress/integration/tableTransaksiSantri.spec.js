beforeEach(() => {
  const testEmail = `achmadafriza123@gmail.com`;
  cy.visit("http://localhost:3000/login");
  cy.get("#email").type(testEmail);
  cy.get("#password").type("Admin123");
  cy.get("#submitAtLogin").contains("Masuk").click();
  cy.wait(2000);
  cy.visit(
    "http://localhost:3000/admin/santri/donasi/2/transaksi/cmzi-blybp-kgbl"
  );
});

describe("Test it is in the correct page", () => {
  it('Test if admin santri transaksi page contains "Daftar Donasi" or not', () => {
    cy.get("[data-testid=titlePage-at-admin-or-user-template]")
      .contains("Daftar Donasi", { matchCase: false })
      .should("exist");
  });

  it('Test if admin transaksi page contains "This is admin page" or not', () => {
    cy.get("p").contains("This is admin page").should("not.exist");
  });

  it("Test if admin transaksi page redirect unauthorized users", () => {
    cy.viewport("iphone-5");
    cy.get("#menuIconButton").should("exist").click();
    cy.get("button").contains("Keluar").should("exist").click();
    cy.visit(
      "http://localhost:3000/admin/santri/donasi/2/transaksi/cmzi-blybp-kgbl"
    );
  });
});

describe(`Test if all components exist and visible`, () => {
  it("Test if all exists and visible", () => {
    cy.get("[data-testid=searchbar-at-admin-or-user-template]").should("exist");
    // cy.get('[data-testid=filterChipButton-at-admin-or-user-template]').should('exist')
    cy.get("[data-testid=name-at-table-row]").should("exist");
    cy.get("button").contains("Status").should("exist");
    cy.get("button").contains("download").should("exist");
    cy.get("[data-testid=showEntries-at-admin-or-user-template]")
      .should("exist")
      .click()
      .get("li")
      .contains("Show All")
      .should("exist")
      .click();
    cy.get("[data-testid=pagination-at-admin-or-user-template]")
      .contains("1")
      .should("exist")
      .click();
  });
});
