// <script src="/__cypress/tests?p=cypress/support/index.js"></script>



describe("Main Page", function () {
  beforeEach(() => {
    //cy.login();
  })
  describe('Basic tests', function () {
    it('prepare fixtures', function () {
      //cy.visit('http://api.budgy.local/fixtures');
      cy.log('Loading fixtures...');
      cy.exec("cd /var/www/budgy2/ && php bin/console doctrine:fixtures:load -n -e test");
      cy.visit('/')
    });

    it.skip('user can authorize', function () {
      cy.visit('/login');
      cy.get('[data-cy=authorize_button]').click()
      cy.wait(1000);
    })

    it('has all data blocks', function () {
      cy.visit('/');
      cy.get('[data-cy=transaction_list]');
      cy.get('[data-cy=free_money]');
      cy.get('[data-cy=account_list]');
      cy.get('[data-cy=income_list]');
      cy.get('[data-cy=expense_list]');
      cy.get('[data-cy=transaction_list_row').last().contains('Оплата кредита');
      cy.get('[data-cy=transaction_type').last().contains('expense');
      // TODO
      // проверка остальных полей в транзакции "Оплата кредита"
      cy.get('[data-cy=transaction_list_row').last().contains('Оплата кредита');
      cy.get('[data-cy=transaction_type').last().contains('expense');
      cy.get('[data-cy=transaction_account').last().contains('Наличные');

      cy.get('[data-cy=income_name').first().should('have.text', 'Зарплата');
      cy.get('[data-cy=income_amount').first().should('have.text', '200000')
    });

    it('all initial calculations are correct', function () {
      cy.get('[data-cy=free_money_amount]').should('have.text', freeMoneyAmount);

    });

    it('transaction modal has all fields', function () {
      cy.visit('/');
      // открыть модальное окно транзакции
      cy.get('[data-cy=create_transaction_button]').click();
      cy.get('[data-cy=transaction_modal]').invoke('show');

      // проверить наличие радиокнопок типа транзакции
      cy.get('[data-cy=modal_transaction_type_expense]');
      cy.get('[data-cy=modal_transaction_type_income]');
      cy.get('[data-cy=modal_transaction_type_saving]');

      // проверить наличие всех полей в окне расходной транзакции
      cy.get('[data-cy=modal_transaction_date]');
      // cy.get('[data-cy=modal_transaction_name]');
      cy.get('[data-cy=modal_transaction_amount]');
      cy.get('[data-cy=modal_transaction_category] > .v-select');
      cy.get('[data-cy=modal_transaction_expense] > .v-select');
      cy.get('[data-cy=modal_transaction_account_source] > .v-select');

      // проверить наличие всех полей в окне доходной транзакции
      cy.get('[data-cy=modal_transaction_type_income').click({force: true});
      cy.get('[data-cy=modal_transaction_date]');
      cy.get('[data-cy=modal_transaction_name_income]');
      cy.get('[data-cy=modal_transaction_amount]');
      cy.get('[data-cy=modal_transaction_account_receiver] > .v-select');

      // проверить наличие всех полей в окне накопительной транзакции
      cy.get('[data-cy=modal_transaction_type_saving').click({force: true});
      cy.get('[data-cy=modal_transaction_date]');
      // cy.get('[data-cy=modal_transaction_name]');
      cy.get('[data-cy=modal_transaction_amount]');
      cy.get('[data-cy=modal_transaction_account_source] > .v-select');
      cy.get('[data-cy=modal_transaction_account_receiver] > .v-select');
    })

  });

  const openModal = (type, params) => {
    if(type === undefined){
      // открыть модальное окно транзакции
      return cy
        .visit('/')
        .get('[data-cy=create_transaction_button]')
        .click()
        .get('[data-cy=transaction_modal]')
        .invoke('show')
    } else if(type === 'edit'){
      return cy
        .visit('/')
        .get('[data-cy=transaction_list_row]')
        .eq(params.row)
        .click()
        .get('[data-cy=transaction_modal]')
        .invoke('show')
    }
  };

  const fillName = (name, type) => {
    return cy
      .get('[data-cy=modal_transaction_name_' + type + ']').invoke('val', name);
  };

  const fillAmount = (amount) => {

    return cy
      .get('[data-cy=modal_transaction_amount').invoke('val', amount);
  };

  const checkTransactionType = (type, showAccount) => {

    return cy
      .get('[data-cy=modal_transaction_type_' + type)
      .click({force: true})
      .get('[data-cy=modal_transaction_account_' + showAccount + '] > .v-select')
      .invoke('show');
  };

  const selectExpense = (name) => {
    cy.get('#expensesFormGroup').find('button').click();
    cy.get('#expensesFormGroup').find('[id^="bs-select-"]').contains(name).click();
    cy.get('[data-cy=modal_transaction_expense] option:selected').should('have.text', name);
  };

  function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const selectAccount = (name, code, type, transactionType) => {
    cy.get('[data-cy=modal_transaction_container_' + transactionType + ']').find('[data-cy=modal_transaction_account_' + type + ']').as('accountSelector')
    cy.get('@accountSelector').click()
    cy.get('@accountSelector').find('li[id^="vs"]').contains(name).click()
    return cy.get('@accountSelector').find('.vs__selected-options').contains(name);
  };

  const selectIncome = (name) => {
    cy.get('[data-cy=modal_transaction_container_' + transactionType + ']').find('[data-cy=modal_transaction_income]').as('incomeSelector')
    cy.get('@incomeSelector').click()
    cy.get('@incomeSelector').find('li[id^="vs"]').contains(name).click()
    return cy.get('@incomeSelector').find('.vs__selected-options').contains(name);
  };

  const checkCurrentAccount = (code, type) => {
    //cy.get('[data-cy=modal_transaction_account_source] > .v-select');
    //return cy.get('#vs5__combobox > .vs__selected-options').should('have.value', code);
  };

  // проверить заполненность названия транзакции
  const checkTransactionTitle = (title) => {
    return cy.get('[data-cy=modal_transaction_name').should('have.value',title);
  }

  const saveTransaction = () => {
    return cy
      .get('[data-cy=save_transaction_button]').click()
  }

  const checkFreeMoneyAmount = () => {
    return cy
      .get('[data-cy=free_money_amount]')
      .should('have.text', freeMoneyAmount.toString());
  }

  let freeMoneyAmount = '318700';
  let tinkoffBalance = 100000;
  let cashBalance = 100000;

  const adjustFreeMoney = (amount) => {
    freeMoneyAmount = freeMoneyAmount - amount;
    return freeMoneyAmount;
  };

  let transactionAmount = '';
  let oldTransactionAmount = '';
  let transactionType = '';

  describe('Create transaction', function () {
    it('can create planned income transaction', function () {
      transactionAmount = 200000
      transactionType = 'income'
      openModal()
      checkTransactionType(transactionType, 'receiver');

      fillName('Зарплата', transactionType)

      cy.get('[data-cy=modal_transaction_amount_income').invoke('val', transactionAmount);

      selectIncome('Зарплата');
      selectAccount('Наличные', 'cash', 'receiver', transactionType);

      saveTransaction();
      //cy.get('[data-cy=save_transaction_button]').click()

      checkFreeMoneyAmount(freeMoneyAmount);
      cy.get('[data-cy=transaction_list_row').first().contains('Зарплата');
      cy.get('[data-cy=transaction_type').first().contains('Доход');

      cashBalance = transactionAmount + cashBalance;
      cy.get('[data-cy=account_cash_amount]').should('have.text', cashBalance.toString());
      cy.get('[data-cy=income_name').eq(0).should('have.text', '✅ Зарплата')
    });

    it('can create unplanned income transaction', function () {
      transactionAmount = 9000;
      openModal();
      fillName('Продажа планшета');
      fillAmount(transactionAmount);
      checkTransactionType('income', 'receiver');
      checkCurrentAccount('tinkoff', 'receiver');
      saveTransaction();

      cy.get('[data-cy=transaction_list_row').eq(0).contains('Продажа планшета');
      checkFreeMoneyAmount(adjustFreeMoney(transactionAmount * -1))

      tinkoffBalance = tinkoffBalance + transactionAmount;
      cy.get('[data-cy=account_tinkoff_amount]').should('have.text', tinkoffBalance.toString())
    });

    it('can create expense transaction from free money', function () {
      transactionAmount = 100;
      openModal();
      fillName('Билет на маршрутку');
      fillAmount(transactionAmount);

      // сменить значение категории на "Транспорт"
      cy.get('#categoryFormGroup').find('button').click();
      cy.get('[id^="bs-select-"]').contains('Транспорт').click();
      cy.get('[data-cy=modal_transaction_category] option:selected').should('have.text', 'Транспорт');

      saveTransaction();

      cy.get('[data-cy=transaction_name').first().contains('Билет на маршрутку');
      cy.get('[data-cy=transaction_category').first().contains('Транспорт');

      checkFreeMoneyAmount(adjustFreeMoney(transactionAmount))

      tinkoffBalance = tinkoffBalance - transactionAmount;
      cy.get('[data-cy=account_tinkoff_amount]').should('have.text', tinkoffBalance.toString())
    });

    it('can create expense transaction from planned expense', function () {
      transactionAmount = 52500;
      openModal();
      fillName('Платеж по ипотеке');
      fillAmount(transactionAmount);

      // установить значение категории на "Ипотека"
      cy.get('#categoryFormGroup').find('button').click();
      cy.get('[id^="bs-select-"]').contains('Ипотека').click();
      cy.get('[data-cy=modal_transaction_category] option:selected').should('have.text', 'Ипотека');
      cy.wait(500);

      // установить значение расходной статьи на "Ипотека"
      selectExpense('Ипотека');
      saveTransaction();

      cy.get('[data-cy=transaction_name').first().contains('Платеж по ипотеке');
      cy.get('[data-cy=transaction_category').first().contains('Ипотека');

      tinkoffBalance = tinkoffBalance - transactionAmount;

      checkFreeMoneyAmount(freeMoneyAmount);

      cy.get('[data-cy=account_tinkoff_amount]').should('have.text', tinkoffBalance.toString());
      cy.get('[data-cy=expense_amount]').first().should('have.text', '52500 / 0')
    });

    it('can create saving transaction', function () {
      transactionAmount = 25000;
      openModal();

      fillName('Перевод в EF');
      fillAmount(transactionAmount);
      // переключить тип транзакции на Накопление
      checkTransactionType('saving', 'receiver');

      selectExpense('В EF');

      checkCurrentAccount('tinkoff', 'source');

      // выбрать счет-получатель "Накопительный счет EF"
      cy.get('#accountReceiverGroup').find('button').click();
      cy.get('[id^="bs-select-"]').contains('Накопительный счет EF').click();
      cy.get('[data-cy=modal_transaction_account_receiver] option:selected').should('have.value','ef');

      saveTransaction();

      cy.get('[data-cy=transaction_name').eq(0).contains('Перевод в EF');

      checkFreeMoneyAmount(freeMoneyAmount)

      tinkoffBalance = tinkoffBalance - transactionAmount;
      cy.get('[data-cy=account_tinkoff_amount]').should('have.text', tinkoffBalance.toString());

      cy.get('[data-cy=account_ef_amount]').should('have.text', '30000');
      cy.get('[data-cy=expense_amount]').last().should('have.text', '25000 / 0')
    })
  });

  describe('Edit transaction', function () {
    it('can edit existing expense transaction with a lot of changes', function () {
      transactionAmount = 50500;
      oldTransactionAmount = 52500;
      openModal('edit', {row: 1})
      checkTransactionTitle('Платеж по ипотеке');

      // проверить заполненность суммы транзакции и заменить сумму
      cy.get('[data-cy=modal_transaction_amount').should('have.value', oldTransactionAmount.toString()).clear().type(transactionAmount.toString());

      // проверить значение категории "Ипотека"
      cy.get('[data-cy=modal_transaction_category] option:selected').should('have.text','Ипотека');

      // сменить значение категории на "Транспорт"
      cy.get('#categoryFormGroup').find('button').click();
      cy.get('[id^="bs-select-"]').contains('Транспорт').click();
      cy.get('[data-cy=modal_transaction_category] option:selected').should('have.text','Транспорт');
      cy.wait(500);

      selectExpense('из свободных средств');
      selectAccount('Наличные', 'cash', 'source');
      saveTransaction();

      cy.get('[data-cy=transaction_name').eq(1).contains('Платеж по ипотеке');
      cy.get('[data-cy=transaction_category').eq(1).contains('Транспорт');
      cy.get('[data-cy=transaction_account').eq(1).contains('Наличные');

      checkFreeMoneyAmount(adjustFreeMoney(transactionAmount))

      cy.get('[data-cy=expense_amount]').eq(0).should('have.text', '52500 / 52500');

      cashBalance = cashBalance - transactionAmount;
      tinkoffBalance = tinkoffBalance + oldTransactionAmount;

      cy.get('[data-cy=account_cash_amount]').should('have.text', cashBalance.toString());
      cy.get('[data-cy=account_tinkoff_amount]').should('have.text', tinkoffBalance.toString());
    });

    it('can edit existing saving transaction', function () {
      openModal('edit', {row: 0})

      oldTransactionAmount = 25000;
      transactionAmount = 20000;
      checkTransactionTitle('Перевод в EF');

      // проверить заполненность суммы транзакции и заменить сумму
      cy.get('[data-cy=modal_transaction_amount').should('have.value', oldTransactionAmount.toString()).clear().type(transactionAmount.toString());

      // сменить значение накопительной статьи на "На автошколу"
      // TODO проверить смену накопительной статьи с одной на другую
      // cy.get('#expensesFormGroup').find('button').click()
      // cy.get('#expensesFormGroup').find('[id^="bs-select-"]').contains('из свободных средств').click()
      // cy.get('[data-cy=modal_transaction_expense] option:selected').should('have.text','из свободных средств')

      selectAccount('Наличные', 'cash', 'source');

      cy.get('[data-cy=save_transaction_button]').click();
      cy.wait(1000);
      cy.visit('/');
      cy.get('[data-cy=transaction_name').eq(0).contains('Перевод в EF');
      cy.get('[data-cy=transaction_account').eq(0).contains('Наличные');

      checkFreeMoneyAmount(freeMoneyAmount)

      cy.get('[data-cy=expense_amount]').last().should('have.text', '25000 / 5000');
      cashBalance = cashBalance - transactionAmount;
      tinkoffBalance = tinkoffBalance + oldTransactionAmount;

      cy.get('[data-cy=account_cash_amount]').should('have.text', cashBalance.toString());
      cy.get('[data-cy=account_tinkoff_amount]').should('have.text', tinkoffBalance.toString())
    });

    it.skip('can edit existing planned income transaction', function () {
      cy.visit('/');
      // открыть модальное окно редактирования транзакции
      cy.get('[data-cy=transaction_list_row]').eq(0).click();
      cy.get('[data-cy=transaction_modal]').invoke('show')
    });

    it.skip('can edit existing unplanned income transaction', function () {

    })
  });

  describe('Transfer', function () {
    it('can transfer money from one account to another', function () {
      cy.visit('/');
      // открыть модальное окно транзакции
      cy.get('[data-cy=transfer_modal_button]').click();
      cy.get('[data-cy=transfer_modal]').invoke('show');

      transactionAmount = 10000;

      // заполнить сумму трансфера
      cy.get('[data-cy=modal_transfer_amount').type(transactionAmount.toString());

      cy.get('[data-cy=modal_transfer_source]').invoke('val', 'cash');
      cy.get('[data-cy=modal_transfer_receiver]').invoke('val', 'tinkoff');

      cy.get('[data-cy=save_transfer_button]').click();
      cy.visit('/');
      cy.get('[data-cy=transaction_name').first().contains('Трансфер между счетами');

      checkFreeMoneyAmount(freeMoneyAmount)
      tinkoffBalance = tinkoffBalance + transactionAmount;
      cashBalance = cashBalance - transactionAmount;
      cy.get('[data-cy=account_tinkoff_amount]').should('have.text', tinkoffBalance.toString());
      cy.get('[data-cy=account_cash_amount]').should('have.text', cashBalance.toString())
    })
  });

  describe('Delete transaction', function () {
    it('can delete transfer transaction', function () {
      cy.visit('/');
      // открыть модальное окно редактирования транзакции
      cy.get('[data-cy=transaction_list_row]').eq(0).click();
      cy.get('[data-cy=transaction_modal]').invoke('show');

      transactionAmount = 10000;

      cy.get('[data-cy=delete_transaction_button]').click();
      cy.visit('/');
      //cy.get('[data-cy=transaction_name]').eq(1).should('have.text', 'Билет на маршрутку');
      tinkoffBalance = tinkoffBalance - transactionAmount;
      cashBalance = cashBalance + transactionAmount;
      checkFreeMoneyAmount(freeMoneyAmount)
      cy.get('[data-cy=account_tinkoff_amount]').should('have.text', tinkoffBalance.toString());
      cy.get('[data-cy=account_cash_amount]').should('have.text', cashBalance.toString());
    });

    it.skip('can delete planned income transaction', function () {

    });

    it.skip('can delete unplanned income transaction', function () {

    });

    it.skip('can delete expense transaction from free money', function () {

    });

    it.skip('can delete expense transaction from planned expense', function () {

    });

    it.skip('can delete saving transaction', function () {

    })
  })
});
