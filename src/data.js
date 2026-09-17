class Folder {
  constructor(name) {
    this.name = name;
    this.expenses = [];
    this.id = crypto.randomUUID();
  }
  addExpense(expense) {
    this.expenses.push(expense);
  }
  removeExpense(expense) {
    const index = this.expenses.findIndex((e) => e.id === expense.id);

    if (index !== -1) {
      this.expenses.splice(index, 1);
    }
  }
  getExpense(id) { return this.expenses.find((e) => e.id === id); }
}
class Expense {
  constructor(title, amount, category, date) {
    this.title = title;
    this.amount = amount;
    this.category = category;
    this.date = date;
    this.id = crypto.randomUUID();
  }
}
class FolderManager {
  constructor() {
    this.folders = [];
  }
  addFolder(folder) {
    this.folders.push(folder);
    this.saveFolders();
  }
  removeFolder(id) {
    const index = this.folders.findIndex((f) => f.id === id);

    if (index !== -1) {
      this.folders.splice(index, 1);
      this.saveFolders();
    }
  }
  getFolder(id) {
    return this.folders.find((f) => f.id === id);
  }
  addExpenseToFolder(folderId, expense) {
  const folder = this.getFolder(folderId);

  if (folder) {
    folder.addExpense(expense);
    this.saveFolders();
  }
}

removeExpenseFromFolder(folderId, expense) {
  const folder = this.getFolder(folderId);

  if (folder) {
    folder.removeExpense(expense);
    this.saveFolders();
  }
}
  saveFolders() {
  const folders = JSON.stringify(this.folders);
  localStorage.setItem("folders", folders);
}
loadFolders() {
  const folders = JSON.parse(localStorage.getItem("folders"));

  if (!folders) {
    return;
  }

  folders.forEach((savedFolder) => {
    const folder = new Folder(savedFolder.name);
    folder.id = savedFolder.id;

    savedFolder.expenses.forEach((savedExpense) => {
      const expense = new Expense(
        savedExpense.title,
        savedExpense.amount,
        savedExpense.category,
        savedExpense.date,
      );

      expense.id = savedExpense.id;

      folder.addExpense(expense);
    });

    this.folders.push(folder);
  });
}
}



export { Folder, Expense, FolderManager };