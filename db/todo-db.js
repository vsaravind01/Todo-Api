import pg from "pg";

const pool = new pg.Pool({
	user: "postgres",
	host: "localhost",
	database: "Todo_SA",
	password: "aravind01",
	port: 5432,
});

const dbTodoExists = (id) => {
	return new Promise((resolve, reject) => {
		try {
			pool.query(`SELECT * FROM todos WHERE id=${id};`)
				.then((results) => {
					resolve(results);
				})
				.catch((error) => {
					console.error(error.stack);
					reject(error);
				});
		} catch (error) {
			console.error(error);
			reject(error);
		}
	});
};

const getAllTodos = () => {
	return new Promise((resolve, reject) => {
		try {
			pool.query("SELECT * FROM todos;")
				.then((results) => {
					resolve(results.rows);
				})
				.catch((error) => {
					console.error(error.stack);
					reject(error);
				});
		} catch (err) {
			console.error(error.stack);
			reject(error);
		}
	});
};

// to-do with both title and message
const dbAddTodoWithTitleAndMessage = (title, message) => {
	return pool.query(
		`INSERT INTO todos(title, message) values($1, $2) RETURNING *;`,
		[title, message]
	);
};

// to-do with only title
const dbAddTodoWithTitle = async (title) => {
	return pool.query(
		`INSERT INTO todos(title) values('${title}') RETURNING *;`
	);
};

// deleting a to-do
const dbDeleteTodo = (id) => {
	return pool.query(`DELETE FROM todos WHERE id = ${id} RETURNING *;`);
};

// completing a to-do
const dbTodoDone = (id) => {
	return pool.query(
		`UPDATE todos SET isCompleted=true WHERE id = ${id} RETURNING *;`
	);
};

// marking a done to-do as not done
const dbTodoUndo = (id) => {
	return pool.query(
		`UPDATE todos SET isCompleted=false WHERE id = ${id} RETURNING *;`
	);
};
const dbs = {
	getAllTodos,
	dbTodoExists,
	dbAddTodoWithTitle,
	dbAddTodoWithTitleAndMessage,
	dbDeleteTodo,
	dbTodoDone,
	dbTodoUndo,
};

export default dbs;
