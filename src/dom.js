import { Folder, FolderManager } from "./data.js";

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
mainArea.appendChild(addExpenseBtn);

const form = document.createElement("form");
form.classList.add("expense-form");
const title = document.createElement("input");
title.type = "text";
title.placeholder = "Title";
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

amountContainer.appendChild(currencySign);
amountContainer.appendChild(amount);
form.appendChild(amountContainer);



container.appendChild(mainArea);

addExpenseBtn.addEventListener("click", () => {

})

const folderManager = new FolderManager();

createFolderBtn.addEventListener("click", () => {
  const folder = new Folder("New Folder");
  folderManager.addFolder(folder);
  console.log(folderManager.folders); //temporary
  const listItem = document.createElement("li");

  listItem.textContent = folder.name;
  listItem.dataset.id = folder.id;
  list.appendChild(listItem);
});

listItem.addEventListener("click", () => {
  const clickedFolder = folderManager.getFolder(listItem.dataset.id);
});
