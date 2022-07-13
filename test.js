import dbs from "./db/todo-db.js";

console.log(await dbs.getAllTodos());
