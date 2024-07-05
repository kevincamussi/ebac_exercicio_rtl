///<reference types="cypress" />

describe('Testes para a agenda de contatos', () => {

    beforeEach(() => {
        cy.visit('https://agenda-contatos-react.vercel.app/')
    })

    it('Deve adicionar o contato com os dados fornecidos', () => {
        cy.visit('https://agenda-contatos-react.vercel.app/')

        cy.get('[type="text"]').type('kevin camussi')
        cy.get('[type="email"]').type('teste@gmail.com')
        cy.get('[type="tel"]').type('9999-8888')
        cy.get('.adicionar').click()
    })

    it('Deve alterar os dados do contato', () => {
        const nomeAdicional = 'teste';
        const emailAdicional = 'teste2'
        const telAdicional = '12345'

        cy.get(':nth-child(2) > .sc-gueYoa > .edit').click()

        cy.get(':nth-child(2) > .sc-dmqHEX > .sc-eDDNvR > :nth-child(1)').invoke('text')
            .then((nomeContato) => {
                cy.get('[type="text"]').invoke('val').should('equal', nomeContato)
            })

        cy.get(':nth-child(2) > .sc-dmqHEX > .sc-eDDNvR > :nth-child(3)').invoke('text')
            .then((emailContato) => {
                cy.get('[type="email"]').invoke('val').should('equal', emailContato)
            })

        cy.get(':nth-child(2) > .sc-dmqHEX > .sc-eDDNvR > :nth-child(2)').invoke('text')
            .then((telContato) => {
                cy.get('[type="tel"]').invoke('val').should('equal', telContato)
            })

        cy.get(':nth-child(2) > .sc-dmqHEX > .sc-eDDNvR > :nth-child(1)')
            .invoke('text')
            .then((nomeOriginal) => {
                cy.get(':nth-child(2) > .sc-dmqHEX > .sc-eDDNvR > :nth-child(3)').invoke('text')
                    .then((emailOriginal) => {
                        cy.get(':nth-child(2) > .sc-dmqHEX > .sc-eDDNvR > :nth-child(2)').invoke('text')
                            .then((telOriginal) => {
                                cy.get('[type="text"]').clear().type(nomeOriginal + nomeAdicional);
                                cy.get('[type="email"]').clear().type(emailOriginal + emailAdicional);
                                cy.get('[type="tel"]').clear().type(telOriginal + telAdicional);

                                cy.get('.alterar').click();

                                cy.get(':nth-child(2) > .sc-dmqHEX > .sc-eDDNvR > :nth-child(1)')
                                    .invoke('text')
                                    .should('equal', nomeOriginal + nomeAdicional);

                                cy.get(':nth-child(2) > .sc-dmqHEX > .sc-eDDNvR > :nth-child(3)')
                                    .invoke('text')
                                    .should('equal', emailOriginal + emailAdicional);

                                cy.get(':nth-child(2) > .sc-dmqHEX > .sc-eDDNvR > :nth-child(2)')
                                    .invoke('text')
                                    .should('equal', telOriginal + telAdicional);
                            })
                    })
            });
    })

    it('Deve remover um contato', () => {
        cy.get(':nth-child(2) > .sc-gueYoa > .delete').click()

        cy.get('.sc-iAEyYk').contains('.contato').should('not.exist')
    })
})