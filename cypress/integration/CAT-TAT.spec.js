describe('Central de Atendimento ao Cliente TAT', () => {

    beforeEach(() => cy.visit('./src/index.html'))

    it('preenche os campos obrigatórios e envia o formulário', function () {

        const longText = 'teste, teste, testeteste, teste, testeteste, teste, testeteste, teste, testeteste, teste, teste'
        cy.get('#firstName').type('Eduardo')
        cy.get('#lastName').type('Rolim')
        cy.get('#email').type('eduardorolim15@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })

        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        const longText = 'teste, teste, testeteste, teste, testeteste, teste, testeteste, teste, testeteste, teste, teste'
        cy.get('#firstName').type('Eduardo')
        cy.get('#lastName').type('Rolim')
        cy.get('#email').type('eduardorolim15@gmail,com')
        cy.get('#open-text-area').type(longText, { delay: 0 })

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('se um valor não-numérico for digitado, seu valor continuará vazio.',
        function () {

            cy.get('#phone').type('opskoksopksop', { delay: 0 }).should('have.value', '')



        })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',
        function () {

            const longText = 'teste, teste, testeteste, teste, testeteste, teste, testeteste, teste, testeteste, teste, teste'
            cy.get('#firstName').type('Eduardo')
            cy.get('#lastName').type('Rolim')
            cy.get('#email').type('eduardorolim15@gmail,com')
            cy.get('#open-text-area').type(longText, { delay: 0 })
            cy.get('#phone-checkbox').click()

            cy.contains('button', 'Enviar').click()

            cy.get('.error').should('be.visible')

        })

    it('preenche e limpa os campos nome, sobrenome, email e telefone',
        function () {

            const longText = 'teste, teste, testeteste, teste, testeteste, teste, testeteste, teste, testeteste, teste, teste'
            cy.get('#firstName').type('Eduardo').should('have.value', 'Eduardo')
                .clear().should('have.value', '')

            cy.get('#lastName').type('Rolim').should('have.value', 'Rolim')
                .clear().should('have.value', '')

            cy.get('#email').type('eduardorolim15@gmail.com').should('have.value', 'eduardorolim15@gmail.com')
                .clear().should('have.value', '')

            cy.get('#open-text-area').type(longText, { delay: 0 }).should('have.value', longText)
                .clear().should('have.value', '')

        })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',
        function () {

            cy.contains('button', 'Enviar').click()

            cy.get('.error').should('be.visible')

        })

    it('envia o formuário com sucesso usando um comando customizado',
        function () {

            cy.fillMandatoryFieldsAndSubmit()

            cy.get('.success').should('be.visible')

        })

    it('seleciona um produto (youtube) por seu texto', function () {

        cy.get('#product').select('YouTube').should('have.value', 'youtube')

    })

    it('marca o tipo de atendimento "Feedback"', function () {

        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })
    it('marca ambos checkboxes, depois desmarca o último', function () {

        cy.get('input[type="checkbox"]')
            .as('checkboxes')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')

    })
    it('seleciona um arquivo da pasta fixtures', function () {

        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .then(input => {
            console.log(input)
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })  
    

    it('seleciona um arquivo simulando um drag-and-drop', function () {

        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action : 'drag-drop'})
        .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo com alias', function () {

        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
            
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {

        cy.get('a')
        .should('have.attr', 'target', '_blank')
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {

        cy.get('a')
        .invoke('removeAttr', 'target').click()
    })

    it('testa a página da política de privacidade de forma independente', function () {

        cy.get('a')
        .should('have.attr', 'target', '_blank')
        .invoke('removeAttr', 'target').click()
        cy.get('#title')
        .should('be.visible')
    })
})
