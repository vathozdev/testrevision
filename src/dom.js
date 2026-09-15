import { Folder, FolderManager, Expense } from "./data.js";

console.log("DOM JS loaded"); //temporary
const container = document.querySelector(".container");
const sideBar = document.createElement("div");
sideBar.classList.add("side-bar");
const createFolderBtn = document.createElement("button");
createFolderBtn.classList.add("create-folder");
createFolderBtn.textContent = "Create a new folder";
sideBar.appendChild(createFolderBtn);
const list = document.createElement("ul");
sideBar.appendChild(list);
container.appendChild(sideBar);

const mainArea = document.createElement("div");
mainArea.classList.add("main-area");
const addExpenseBtn = document.createElement("button");
addExpenseBtn.classList.add("expense-btn");
addExpenseBtn.textContent = "Add Expense";
addExpenseBtn.disabled = true;
const expensesContainer = document.createElement("div");
mainArea.appendChild(expensesContainer);
mainArea.appendChild(addExpenseBtn);

const form = document.createElement("form");
form.classList.add("expense-form");
const title = document.createElement("input");
title.type = "text";
title.placeholder = "Title";
title.name = "title";
form.appendChild(title);

const amountContainer = document.createElement("div");
amountContainer.classList.add("amount-container");

const currencySign = document.createElement("span");
currencySign.innerText = "$";
currencySign.classList.add("currency-sign");

const amount = document.createElement("input");
amount.type = "number";
amount.placeholder = "0.00";
amount.step = "0.01";
amount.min = "0";
amount.name = "amount";

amountContainer.appendChild(currencySign);
amountContainer.appendChild(amount);
form.appendChild(amountContainer);

const categoryContainer = document.createElement("div");
categoryContainer.classList.add("category-container");

const categoryLabel = document.createElement("label");
categoryLabel.textContent = "Category:";
categoryLabel.setAttribute("for", "category");

const categorySelect = document.createElement("select");
categorySelect.name = "category";
categorySelect.id = "category";

const categories = [
  "Food",
  "Transport",
  "Entertainment",
  "Utilities",
  "Other",
  "Saving",
  "Health",
  "Education",
  "Shopping",
  "Travel",
  "Gifts",
  "Insurance",
  "Taxes",
  "Debt",
  "Investments",
];
categories.forEach((cat) => {
  const option = document.createElement("option");
  option.value = cat;
  option.textContent = cat;
  categorySelect.appendChild(option);
});
categoryContainer.appendChild(categoryLabel);
categoryContainer.appendChild(categorySelect);
form.appendChild(categoryContainer);

const date = document.createElement("input");
date.type = "date";
date.name = "date";
form.appendChild(date);

const submitBtn = document.createElement("button");
submitBtn.classList.add("submit-btn");
form.appendChild(submitBtn);

form.style.display = "none";
mainArea.appendChild(form);
container.appendChild(mainArea);

let selectedFolder;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const submittedForm = new Expense(
    title.value,
    amount.value,
    categorySelect.value,
    date.value,
  );
  selectedFolder.addExpense(submittedForm);
  console.log(selectedFolder.expenses); //temporary
  const expenseDiv = document.createElement("div");
  const expenseTitle = document.createElement("div");
  expenseTitle.textContent = submittedForm.title;
  const expenseAmount = document.createElement("div");
  expenseAmount.textContent = `$${submittedForm.amount}`;
  const expenseCategory = document.createElement("div");
  expenseCategory.textContent = submittedForm.category;
  const expenseDate = document.createElement("div");
  expenseDate.textContent = submittedForm.date;

  expenseDiv.appendChild(expenseTitle);
  expenseDiv.appendChild(expenseAmount);
  expenseDiv.appendChild(expenseCategory);
  expenseDiv.appendChild(expenseDate);

  expensesContainer.appendChild(expenseDiv);

  form.reset();
  form.style.display = "none";
});

addExpenseBtn.addEventListener("click", () => {
  form.style.display = "block";
});

const folderManager = new FolderManager();

createFolderBtn.addEventListener("click", () => {
  const folder = new Folder("New Folder");
  folderManager.addFolder(folder);
  console.log(folderManager.folders); //temporary
  const listItem = document.createElement("li");
  listItem.addEventListener("click", () => {
    selectedFolder = folderManager.getFolder(listItem.dataset.id);
    addExpenseBtn.disabled = false;
    console.log(selectedFolder);
    if (selectedFolder) {
      expensesContainer.replaceChildren();
    }
    selectedFolder.expenses.forEach(expense => {
 const expenseDiv = document.createElement("div");
 const expenseTitle = document.createElement("div");
 expenseTitle.textContent = expense.title;
 const expenseAmount = document.createElement("div");
 expenseAmount.textContent = `$${expense.amount}`;
 const expenseCategory = document.createElement("div");
 expenseCategory.textContent = expense.category;
 const expenseDate = document.createElement("div");
 expenseDate.textContent = expense.date;

 expenseDiv.appendChild(expenseTitle);
 expenseDiv.appendChild(expenseAmount);
 expenseDiv.appendChild(expenseCategory);
 expenseDiv.appendChild(expenseDate);

 expensesContainer.appendChild(expenseDiv);
});


  });

  listItem.textContent = folder.name;
  listItem.dataset.id = folder.id;
  list.appendChild(listItem);
});
console.log(selectedFolder); //temporary
