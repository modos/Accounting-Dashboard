
describe('Dashboard Page', () => {

  beforeEach(() => {
    cy.restoreLocalStorageCache();
  });
  
  afterEach(() => {
    cy.saveLocalStorageCache();
  });
  
    it('should show title in navbar', () => {
      cy.get('.v-app-bar-title__content').contains('نرم افزار حسابداری اطلس آذین')
    })
  
    it('should show welcome message ', () => {
      cy.contains('h3', 'کاربر آزمایشی خوش آمدید')
    })

    it('should dashboard title in navigation', () => {
      cy.get('.v-list-item__title').contains('داشبورد')
    })

    it('should show notes title', () => {
      cy.contains('.notes-title', 'یادداشت های شما')
    })

    it('should show add note dialog when clicked on button', () => {
      cy.get('.v-overlay__scrim').click()
      cy.get('.atlas-add-note-button').click()
    })

    it('should add note title correctly', () => {
      cy.contains('h3', 'افزودن یادداشت جدید')
    })

    it('should add new note', () => {
      cy.get('.atlas-input-note-title').last().type('یادداشت سایپرس')
      cy.get('.atlas-add-note-button-dialog').last().click()
      cy.get('.atlas-close-add-note-dialog-button').last().click()
    })

    it('should show new note has added', () => {
      cy.get('.v-card__title').contains('یادداشت سایپرس')
    })
  })
  