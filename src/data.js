class Folder {
    constructor(name) { 
         this.name = name;
         this.expenses = [];
         this.id = crypto.randomUUID();
    }}
class Expense {
    constructor(title, amount, category, date) {
        this.title = title;
        this.amount = amount;
        this.category = category;
        this.date = date;
        this.id = crypto.randomUUID();
    }
}