describe('login form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('displays login form', () => {
    cy.get('input[name="userId"]').should('have.length', 1)
    cy.get('.popup__text').first().should('have.text', 'Ingrese su número de identificación:')
    cy.get('button').first().should('have.text', 'Aceptar')
  })

  it('can not when back failed', () => {
    cy.get('input[name="userId"]').type('1')
    cy.get('button').first().should('have.text', 'Aceptar').click()
    cy.contains('Error al obtener la información del usuario')
    cy.get('button').first().should('have.text', 'Recargar página')
  })

  it('can not login without input value', () => {
    cy.get('button').first().should('have.text', 'Aceptar').click()
    cy.get('input[name="userId"]').then(($input) => {
      expect($input[0].validationMessage).to.include(
          'Completa este campo'
      )
    })
  })

  it('can login', () => {
    cy.get('input[name="userId"]').type('1')
    cy.get('button').first().should('have.text', 'Aceptar').click()
    cy.contains('Oferta de materias')
    cy.contains('Matricula')
  })
})
