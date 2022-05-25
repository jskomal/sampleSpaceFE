
import sampleKit from '../../src/sampleKit.js'

describe('/play endpoint', () => {
 beforeEach('Visit the page', () => {

   cy.intercept('https://sample-space-be.herokuapp.com/api/v1/kits/Andromeda%20Strain', {fixture: 'kit'})
   cy.visit('http://localhost:3000/play')
   cy.wait(500)
 })

 it('Should have a header with the Sample Space logo', () => {
   cy.get('header img')
    .should('have.attr', 'src', '/static/media/sample-space-logo.0b8cea83f06fa8ea8674e40bbf7391fb.svg')
 })

it('Should have a selector with three options', () => {
  cy.get('.kit-select')
    .children()
      .first()
        .contains('Andromeda Strain')
      .next()
        .contains('Magnetosphere')
      .next()
        .contains('Apollo 11')
})

 it('Should have 8 clickable buttons', () => {
   cy.fixture('kit').then((kit) => {
     let elements = Object.keys(kit.kit.elements);
     const urls = elements.map(element => kit.kit.elements[element].thumbnail_url)
     let buttons = cy.get('.pad-container')

      buttons.children()
        .should('have.length', 8)

      buttons.each(button => {
        cy.wait(500);
        cy.wrap(button)
          .children()
            .first()
              .invoke('attr', 'src').then($src => {
                expect(urls).to.include($src)
              })
          cy.wrap(button)
            .click()
        })
   })
 })

 it('Should have an info box', () => {
   cy.get('.info-box h2')
    .contains('Info Goes Here')
  .next()
    .contains('basic summary here')
  .get('.info-box button')
    .contains('Tell me more!')
    .click({force: true})
  .next()
    .contains('Tempo')
  .next()
    .contains('120')
 })
})
