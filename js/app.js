class Controller {
  constructor(type, desc, inputNumber) {
    this.type = type;
    this.desc = desc;
    this.inputNumber = inputNumber;
  }
}

class BudgetController {
  addIncomeValue(budgetsExpenses) {
    const incomeTotal = document.querySelector(".budget__income--value");
    incomeTotal.textContent = budgetsExpenses.inc;
  }
  addExpenseValue(budgetsExpenses) {
    const expenseTotal = document.querySelector(".budget__expenses--value");
    expenseTotal.textContent = budgetsExpenses.exp;
  }
  addTotalBudget(budgetsExpenses) {
    const totalBudget = document.querySelector(".budget__value");
    let total = budgetsExpenses.inc - budgetsExpenses.exp;
    totalBudget.textContent = total;
  }
}

class UI {
  addExpense(controller) {
    const expenseList = document.querySelector(".expenses__list");
    const div = document.createElement("div");
    div.classList.add("item", "clearfix");
    div.innerHTML = `<div class="item__description">${controller.desc.value}</div>
                            <div class="over clearfix">
                                <div class="item__value">${controller.inputNumber.value}</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>`;
    expenseList.appendChild(div);
  }
  addIncome(controller) {
    const incomeList = document.querySelector(".income__list");
    const div = document.createElement("div");
    div.classList.add("item", "clearfix");
    div.innerHTML = ` <div class="item__description">${controller.desc.value}</div>
                            <div class="over clearfix">
                                <div class="item__value">${controller.inputNumber.value}</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>`;
    incomeList.appendChild(div);
  }
}

function eventListeners() {
  const submitBtn = document.querySelector(".add__btn");
  const type = document.querySelector(".add__type");
  const desc = document.querySelector(".add__description");
  const inputNumber = document.querySelector(".add__value");

  const budgetsExpenses = { exp: 0, inc: 0 };

  const controller = new Controller(type, desc, inputNumber);
  const ui = new UI();
  const budget = new BudgetController();

  const expenseList = document.querySelector(".expenses__list");
  const incomeList = document.querySelector(".income__list");

  expenseList.addEventListener("click", function(e) {
    if (e.target.parentElement.classList.contains("item__delete--btn")) {
      expenseList.removeChild(
        e.target.parentElement.parentElement.parentElement.parentElement
      );
      console.log(
        parseInt(
          e.target.parentElement.parentElement.previousElementSibling
            .textContent
        )
      );
      budgetsExpenses.exp -= parseInt(
        e.target.parentElement.parentElement.previousElementSibling.textContent
      );
      budget.addTotalBudget(budgetsExpenses);
      budget.addExpenseValue(budgetsExpenses);
    }
  });

  incomeList.addEventListener("click", function(e) {
    if (e.target.parentElement.classList.contains("item__delete--btn")) {
      incomeList.removeChild(
        e.target.parentElement.parentElement.parentElement.parentElement
      );
      console.log(
        parseInt(
          e.target.parentElement.parentElement.previousElementSibling
            .textContent
        )
      );
      budgetsExpenses.inc -= parseInt(
        e.target.parentElement.parentElement.previousElementSibling.textContent
      );
      budget.addTotalBudget(budgetsExpenses);
      budget.addIncomeValue(budgetsExpenses);
    }
  });

  submitBtn.addEventListener("click", function() {
    if (desc.value > "" && inputNumber.value > "") {
      if (controller.type.value === "exp") {
        ui.addExpense(controller);
        budgetsExpenses.exp += parseInt(inputNumber.value);
        budget.addExpenseValue(budgetsExpenses);
      } else {
        ui.addIncome(controller);
        budgetsExpenses.inc += parseInt(inputNumber.value);
        console.log(budgetsExpenses);
        budget.addIncomeValue(budgetsExpenses);
      }
    }
    budget.addTotalBudget(budgetsExpenses);
    desc.value = "";
    inputNumber.value = "";
    type.value = "inc";
  });
}

document.addEventListener("DOMContentLoaded", eventListeners);
