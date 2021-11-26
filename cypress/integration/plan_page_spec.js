beforeEach(() => {
  cy.login();
})

describe("Plan Page", function () {

  it('prepares databases', function () {
    cy.exec("php bin/console doctrine:fixtures:load -n -e test")
  });

  it('successfully loads', function () {
    cy.visit('/');
    cy.get('[data-cy=edit_current_period_button]').click();
    cy.get('[data-cy=expense_list]');
    cy.get('[data-cy=income_list]');
    cy.get('[data-cy=free_money]')
  });

  it('can add new expense', function () {
    cy.visit('/plan');

    cy.get('[data-cy=add_expense_button]').click();
    cy.get('[data-cy=expense_modal]').invoke('show');
    cy.get('[data-cy=modal_expense_name]').type('Капоэра');
    cy.get('[data-cy=modal_expense_amount]').invoke('val','2500');
    cy.get('[data-cy=save_expense_button]').click();
    cy.visit('/plan');
    cy.get('[data-cy=expense_name]').last().should('have.text', 'Капоэра');
    cy.get('[data-cy=expense_amount]').last().should('have.text', '2500 / 2500')
  });

  it('can copy expenses from previous period', function () {
    cy.visit('/plan');
    cy.get('[data-cy=copy_expenses_button]').click();
    cy.get('[data-cy=copied_expense_name]').last().should('have.text', 'Транспорт');
    cy.get('[data-cy=copied_expense_amount]').last().should('have.text', '3800');
    cy.get('[data-cy=delete_copied_expense_button]').last().click();
    cy.wait(500);
    cy.get('[data-cy=copied_expense_name]').last().should('have.text', 'Перекресток');
    cy.get('[data-cy=save_copied_expenses_button]').click();
    cy.visit('/plan');
    cy.get('[data-cy=expense_name]').last().should('have.text', 'Перекресток');
    cy.get('[data-cy=expense_amount]').last().should('have.text', '15000 / 15000')
  });

  it(' can edit regular expenses', function () {
    cy.visit('/plan');

    cy.get('[data-cy=expense_amount]').first().click();
    cy.get('[data-cy=modal_expense_title]').contains('Редактирование расхода \'Ипотека\'');
    cy.get('[data-cy=modal_expense_amount]').invoke('val', 50000);
    cy.get('[data-cy=save_expense_button]').click();
    cy.wait(500);
    cy.get('[data-cy=expense_amount]').first().should('have.text', '50000 / 50000')
  });

  it(' can edit saving expenses', function () {
    cy.visit('/plan');
    cy.get('.table-warning > [data-cy=expense_amount]').click();

    cy.get('[data-cy=modal_expense_title]').contains('Редактирование расхода \'В EF\'');
    cy.get('[data-cy=modal_expense_amount]').clear().type('20000');
    cy.get('[data-cy=save_expense_button]').click();
    cy.wait(500);
    cy.get('.table-warning > [data-cy=expense_amount]').should('have.text', '20000 / 20000')
  });

  it('can change type of expense', function () {
    cy.visit('/plan');
    cy.get('.table-warning > [data-cy=expense_amount]').click();

    cy.get('[data-cy=modal_expense_title]').contains('Редактирование расхода \'В EF\'');
    cy.get('[data-cy=modal_expense_saving]').click();
    cy.get('[data-cy=save_expense_button]').click();
    cy.wait(500);
    cy.get('.table-danger > [data-cy=expense_amount]').last().should('have.text', '15000 / 15000');

    cy.get('[data-cy=expense_amount]').last().click();
    cy.get('[data-cy=modal_expense_saving]').click();
    cy.get('[data-cy=save_expense_button]').click();
    cy.wait(500);
    cy.get('.table-warning > [data-cy=expense_amount]').last().should('have.text', '15000 / 15000');
  });
});
