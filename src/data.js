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
  }
  removeFolder(id) {
    const index = this.folders.findIndex((f) => f.id === id);

    if (index !== -1) {
      this.folders.splice(index, 1);
    }
  }
  getFolder(id) {
    return this.folders.find((f) => f.id === id);
  }
}

export { Folder, Expense, FolderManager };