/// <reference types="cypress" />

context('Setup', () => {
  beforeEach(() => {
    // cy.get('[value="Continue"]').click().as('ClickContinue')
  })

describe('Back office edit', () => {
  it('edits a waste exemption', () => {

    // sign in as admin agent
    console.log("Password is " + Cypress.env('WEX_DEFAULT_PASSWORD'))
    cy.visit('')
    cy.get('#user_email').type('super_agent@wex.gov.uk')
    cy.get('#user_password').type(Cypress.env('WEX_DEFAULT_PASSWORD'))
    cy.get('[value="Sign in"]').click()

    // search for an exemption and click Edit
    cy.get('#term').type('waste')
    cy.get('[name="commit"]').click()
    cy.get('.heading-large').should('contain', 'dashboard')
    cy.contains('View details').first().click()    
    cy.get('.heading-large').should('contain', 'Registration details')
    cy.contains('Edit').first().click()
    cy.get('.heading-large').should('contain', 'Edit')

    // update operator name
    cy.get('[href*="operator_name"').click()
    var newName = 'Cypress waste name edit ' + Math.floor(Math.random() * 1000000).toString()
    cy.get('#operator_name_form_operator_name').clear().type(newName)
    cy.get('[value="Continue"]').click()

    // submit declaration
    cy.get('[value="Continue"]').click()
    cy.get('#content').should('contain', 'You can be prosecuted')
    cy.get('#declaration_form_declaration').click()
    cy.get('[value="Continue"]').click()
    
    // edit complete
    cy.get('.heading-large').should('contain', 'Edit complete')
    cy.contains('View registration').click()
    cy.get('.heading-large').should('contain', 'Edit')
    cy.get('#content').should('contain', newName)
  })
})
})

// Alternatively, to make assertion more robust, add route alias:
// see https://stackoverflow.com/a/63901984/14221649
//
// beforeEach(() => {
//   cy.server()
//   cy.route("/registrations/**").as("registrationDetails")
// })
//
// cy.wait("@registrationDetails").then(() => {
//   // next get called after response resolves
//   cy.get('.heading-large').should('contain', 'Registration details')
// })