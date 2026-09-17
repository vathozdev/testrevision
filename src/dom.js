import { Folder, FolderManager, Expense } from "./data.js";

console.log("DOM JS loaded"); // temporary

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

const folderManager = new FolderManager();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const submittedForm = new Expense(
    title.value,
    amount.value,
    categorySelect.value,
    date.value,
  );

  folderManager.addExpenseToFolder(selectedFolder.id, submittedForm);

  console.log(selectedFolder.expenses); // temporary

  const expenseDiv = document.createElement("div");

  const expenseTitle = document.createElement("div");
  expenseTitle.textContent = submittedForm.title;

  const expenseAmount = document.createElement("div");
  expenseAmount.textContent = `$${submittedForm.amount}`;

  const expenseCategory = document.createElement("div");
  expenseCategory.textContent = submittedForm.category;

  const expenseDate = document.createElement("div");
  expenseDate.textContent = submittedForm.date;

  const removeExpenseBtn = document.createElement("button");
  removeExpenseBtn.classList.add("remove-btn");
  removeExpenseBtn.textContent = "X";

  removeExpenseBtn.addEventListener("click", () => {
    folderManager.removeExpenseFromFolder(
      selectedFolder.id,
      submittedForm,
    );

    console.log(selectedFolder.expenses); // temporary

    expensesContainer.removeChild(expenseDiv);
  });

  const editExpenseBtn = document.createElement("button");
  editExpenseBtn.classList.add("edit-btn");
  editExpenseBtn.textContent = "Edit";

  editExpenseBtn.addEventListener("click", () => {
    editExpenseBtn.disabled = true;
    addExpenseBtn.disabled = true;

    const editForm = document.createElement("form");

    const editTitle = document.createElement("input");
    editTitle.type = "text";
    editTitle.name = "title";
    editTitle.value = submittedForm.title;

    editForm.appendChild(editTitle);

    const editAmountContainer = document.createElement("div");
    editAmountContainer.classList.add("amount-container");

    const editCurrencySign = document.createElement("span");
    editCurrencySign.innerText = "$";
    editCurrencySign.classList.add("currency-sign");

    const editAmount = document.createElement("input");
    editAmount.type = "number";
    editAmount.step = "0.01";
    editAmount.min = "0";
    editAmount.name = "amount";
    editAmount.value = submittedForm.amount;

    editAmountContainer.appendChild(editCurrencySign);
    editAmountContainer.appendChild(editAmount);
    editForm.appendChild(editAmountContainer);

    const editCategoryContainer = document.createElement("div");
    editCategoryContainer.classList.add("category-container");

    const editCategoryLabel = document.createElement("label");
    editCategoryLabel.textContent = "Category:";
    editCategoryLabel.setAttribute("for", "category");

    const editCategorySelect = document.createElement("select");
    editCategorySelect.name = "category";
    editCategorySelect.id = "category";

    categories.forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;

      if (cat === submittedForm.category) {
        option.selected = true;
      }

      editCategorySelect.appendChild(option);
    });

    editCategoryContainer.appendChild(editCategoryLabel);
    editCategoryContainer.appendChild(editCategorySelect);
    editForm.appendChild(editCategoryContainer);

    const editDate = document.createElement("input");
    editDate.type = "date";
    editDate.name = "date";
    editDate.value = submittedForm.date;

    editForm.appendChild(editDate);

    expenseDiv.appendChild(editForm);
    editForm.style.display = "block";

    const finishEditing = () => {
      submittedForm.title = editTitle.value;
      submittedForm.amount = editAmount.value;
      submittedForm.category = editCategorySelect.value;
      submittedForm.date = editDate.value;

      expenseTitle.textContent = submittedForm.title;
      expenseAmount.textContent = `$${submittedForm.amount}`;
      expenseCategory.textContent = submittedForm.category;
      expenseDate.textContent = submittedForm.date;

      folderManager.saveFolders();

      editExpenseBtn.disabled = false;
      addExpenseBtn.disabled = false;

      editForm.style.display = "none";
    };

    editForm.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        finishEditing();
      }
    });

    document.addEventListener("click", (e) => {
      if (
        !editForm.contains(e.target) &&
        !editExpenseBtn.contains(e.target)
      ) {
        editForm.style.display = "none";
        editExpenseBtn.disabled = false;
        addExpenseBtn.disabled = false;
      }
    });
  });

  expenseDiv.appendChild(expenseTitle);
  expenseDiv.appendChild(expenseAmount);
  expenseDiv.appendChild(expenseCategory);
  expenseDiv.appendChild(expenseDate);
  expenseDiv.appendChild(removeExpenseBtn);
  expenseDiv.appendChild(editExpenseBtn);

  expensesContainer.appendChild(expenseDiv);

  form.reset();
  form.style.display = "none";
});

addExpenseBtn.addEventListener("click", () => {
  form.style.display = "block";
});

function renderFolder(folder) {
  const listItem = document.createElement("li");

  const folderName = document.createElement("span");
  folderName.textContent = folder.name;
  folderName.dataset.id = folder.id;

  const removeFolderBtn = document.createElement("button");
  removeFolderBtn.classList.add("remove-btn");
  removeFolderBtn.textContent = "X";

  removeFolderBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    folderManager.removeFolder(folder.id);

    console.log(folderManager.folders); // temporary

    list.removeChild(listItem);

    if (selectedFolder && selectedFolder.id === folder.id) {
      selectedFolder = null;
      addExpenseBtn.disabled = true;
      expensesContainer.replaceChildren();
    }
  });

  listItem.appendChild(folderName);
  listItem.appendChild(removeFolderBtn);
  list.appendChild(listItem);

listItem.addEventListener("click", () => {
  document
    .querySelectorAll(".active-folder")
    .forEach((folder) => {
      folder.classList.remove("active-folder");
    });

  listItem.classList.add("active-folder");

  selectedFolder = folderManager.getFolder(folderName.dataset.id);

  addExpenseBtn.disabled = false;

  console.log(selectedFolder); // temporary

  expensesContainer.replaceChildren();

  selectedFolder.expenses.forEach((expense) => {
   
  });
});
      const expenseDiv = document.createElement("div");

      const expenseTitle = document.createElement("div");
      expenseTitle.textContent = expense.title;

      const expenseAmount = document.createElement("div");
      expenseAmount.textContent = `$${expense.amount}`;

      const expenseCategory = document.createElement("div");
      expenseCategory.textContent = expense.category;

      const expenseDate = document.createElement("div");
      expenseDate.textContent = expense.date;

      const removeExpenseBtn = document.createElement("button");
      removeExpenseBtn.classList.add("remove-btn");
      removeExpenseBtn.textContent = "X";

      removeExpenseBtn.addEventListener("click", () => {
        folderManager.removeExpenseFromFolder(
          selectedFolder.id,
          expense,
        );

        console.log(selectedFolder.expenses); // temporary

        expensesContainer.removeChild(expenseDiv);
      });

      const editExpenseBtn = document.createElement("button");
      editExpenseBtn.classList.add("edit-btn");
      editExpenseBtn.textContent = "Edit";

      editExpenseBtn.addEventListener("click", () => {
        editExpenseBtn.disabled = true;
        addExpenseBtn.disabled = true;

        const editForm = document.createElement("form");

        const editTitle = document.createElement("input");
        editTitle.type = "text";
        editTitle.name = "title";
        editTitle.value = expense.title;

        editForm.appendChild(editTitle);

        const editAmountContainer = document.createElement("div");
        editAmountContainer.classList.add("amount-container");

        const editCurrencySign = document.createElement("span");
        editCurrencySign.innerText = "$";
        editCurrencySign.classList.add("currency-sign");

        const editAmount = document.createElement("input");
        editAmount.type = "number";
        editAmount.step = "0.01";
        editAmount.min = "0";
        editAmount.name = "amount";
        editAmount.value = expense.amount;

        editAmountContainer.appendChild(editCurrencySign);
        editAmountContainer.appendChild(editAmount);
        editForm.appendChild(editAmountContainer);

        const editCategoryContainer = document.createElement("div");
        editCategoryContainer.classList.add("category-container");

        const editCategoryLabel = document.createElement("label");
        editCategoryLabel.textContent = "Category:";
        editCategoryLabel.setAttribute("for", "category");

        const editCategorySelect = document.createElement("select");
        editCategorySelect.name = "category";
        editCategorySelect.id = "category";

        categories.forEach((cat) => {
          const option = document.createElement("option");
          option.value = cat;
          option.textContent = cat;

          if (cat === expense.category) {
            option.selected = true;
          }

          editCategorySelect.appendChild(option);
        });

        editCategoryContainer.appendChild(editCategoryLabel);
        editCategoryContainer.appendChild(editCategorySelect);
        editForm.appendChild(editCategoryContainer);

        const editDate = document.createElement("input");
        editDate.type = "date";
        editDate.name = "date";
        editDate.value = expense.date;

        editForm.appendChild(editDate);

        expenseDiv.appendChild(editForm);
        editForm.style.display = "block";

        const finishEditing = () => {
          expense.title = editTitle.value;
          expense.amount = editAmount.value;
          expense.category = editCategorySelect.value;
          expense.date = editDate.value;

          expenseTitle.textContent = expense.title;
          expenseAmount.textContent = `$${expense.amount}`;
          expenseCategory.textContent = expense.category;
          expenseDate.textContent = expense.date;

          folderManager.saveFolders();

          editExpenseBtn.disabled = false;
          addExpenseBtn.disabled = false;

          editForm.style.display = "none";
        };

        editForm.addEventListener("keydown", (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            finishEditing();
          }
        });

        document.addEventListener("click", (e) => {
          if (
            !editForm.contains(e.target) &&
            !editExpenseBtn.contains(e.target)
          ) {
            editForm.style.display = "none";
            editExpenseBtn.disabled = false;
            addExpenseBtn.disabled = false;
          }
        });
      });

      expenseDiv.appendChild(expenseTitle);
      expenseDiv.appendChild(expenseAmount);
      expenseDiv.appendChild(expenseCategory);
      expenseDiv.appendChild(expenseDate);
      expenseDiv.appendChild(removeExpenseBtn);
      expenseDiv.appendChild(editExpenseBtn);

      expensesContainer.appendChild(expenseDiv);
    });
  });

  folderName.addEventListener("dblclick", (e) => {
    e.target.setAttribute("contentEditable", "true");

    e.target.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();

        e.target.setAttribute("contentEditable", "false");

        const folder = folderManager.getFolder(e.target.dataset.id);

        if (folder) {
          folder.name = e.target.textContent;
          folderManager.saveFolders();
        }
      }
    });

    document.addEventListener("click", (e) => {
      if (!folderName.contains(e.target)) {
        folderName.setAttribute("contentEditable", "false");

        const folder = folderManager.getFolder(folderName.dataset.id);

        if (folder) {
          folder.name = folderName.textContent;
          folderManager.saveFolders();
        }
      }
    });
  });
}

createFolderBtn.addEventListener("click", () => {
  const folder = new Folder("New Folder");

  folderManager.addFolder(folder);

  console.log(folderManager.folders); // temporary

  renderFolder(folder);
});

folderManager.loadFolders();

folderManager.folders.forEach((folder) => {
  renderFolder(folder);
});

console.log(folderManager.folders); // temporary