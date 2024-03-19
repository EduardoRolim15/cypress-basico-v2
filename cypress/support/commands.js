Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {

    const longText = 'teste, teste, testeteste, teste, testeteste, teste, testeteste, teste, testeteste, teste, teste'
        cy.get('#firstName').type('Eduardo')
        cy.get('#lastName').type('Rolim')
        cy.get('#email').type('eduardorolim15@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })

        cy.get('.button').click()

})