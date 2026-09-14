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

const folderManager = new FolderManager();

createFolderBtn.addEventListener("click", () => {
    const folder = new Folder("New Folder")
    folderManager.addFolder(folder);
    console.log(folderManager.folders); //temporary 
})