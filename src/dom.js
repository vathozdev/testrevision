import { Folder, FolderManager } from "./data.js";

console.log("DOM JS loaded");
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
container.appendChild(mainArea);

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
