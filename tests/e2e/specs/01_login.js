describe('Login Page', () => {

  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });
  
  afterEach(() => {
    cy.saveLocalStorageCache();
  });
  
  it('should fill out the form and then login', () => {
    cy.visit('localhost:8080')
    cy.contains('h1', 'ورود')

    cy.get('#input-9').type('atlas@gmail.com')
    cy.get('#input-12').type('atlasdemo')
    cy.get('button').click().then(() => {
      cy.url().should('include', '/dashboard')
    })

  })
})
