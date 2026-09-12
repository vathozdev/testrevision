class Folder {
  constructor(name) {
    this.name = name;
    this.expenses = [];
    this.id = crypto.randomUUID();
  }
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
  }
  removeFolder(id) {
    this.folders.findIndex((f) => f.id === id);
    if (index !== -1) {
      this.folders.splice(index, 1);
    }
  }
}
