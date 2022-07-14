import e from "express";
import dbTodo from "../db/todo-db.js";

const addTodo = (req, res) => {
	console.log(req.body);
	if (!req.body.title) {
		res.status(400).send({
			success: false,
			message: "Please provide a todo title!",
		});
	} else {
		if (!req.body.message) {
			dbTodo
				.dbAddTodoWithTitle(req.body.title)
				.then((data) => {
					res.status(201);
					res.json({
						success: true,
						message: "Todo added successfully!",
						data: data.rows[0],
					});
				})
				.catch((error) => {
					res.status(500);
					res.json({
						success: false,
						message: "An error occurred while uploading your todo!",
						errorMsg: error.message,
					});
				});
		} else {
			dbTodo
				.dbAddTodoWithTitleAndMessage(req.body.title, req.body.message)
				.then((data) => {
					res.status(201);
					res.json({
						success: true,
						message: "Todo added successfully!",
						data: data.rows[0],
					});
				})
				.catch((error) => {
					res.status(500);
					res.json({
						success: false,
						message: "An error occurred while uploading your todo!",
						errorMsg: error.message,
					});
				});
		}
	}
};

const todos = (req, res) => {
	dbTodo
		.getAllTodos()
		.then((result) => {
			console.log(result);
			res.status(200);
			res.json({
				success: true,
				message: "Todos successfully retrieved!",
				data: result,
			});
		})
		.catch((error) => {
			res.status(500);
			res.json({
				success: false,
				message:
					"Unexpected error occurred while retrieving the todo in our database!",
				error: error.message,
			});
		});
};

const deleteTodo = (req, res) => {
	try {
		if (!req.body.id) {
			res.status(400);
			res.json({
				success: false,
				message: "Please provide a todo id to delete!",
			});
		} else {
			dbTodo
				.dbDeleteTodo(req.body.id)
				.then((data) => {
					if (!data.rows[0]) {
						res.status(400);
						res.json({
							success: false,
							message: `Todo with ID - ${req.body.id} does not exist!`,
						});
					} else {
						res.status(200);
						res.json({
							success: true,
							message: "Todo successfully deleted!",
							data: data.rows[0],
						});
					}
				})
				.catch((error) => {
					res.status(500);
					res.json({
						success: false,
						message:
							"Unexpected error occurred while deleting your todo from the database!",
						errorMsg: error.message,
					});
				});
		}
	} catch (error) {
		res.status(500);
		res.json({
			success: false,
			message:
				"Unknown error while deleting your todo from the database!",
			errorMsg: error.message,
		});
	}
};

const doneTodo = (req, res) => {
	try {
		dbTodo;
		if (!req.body.id) {
			res.status(400);
			res.json({
				success: false,
				message: "Please provide a Todo ID.",
			});
		} else {
			dbTodo
				.dbTodoDone(req.body.id)
				.then((data) => {
					res.status(200);
					res.json({
						success: true,
						message: `Todo with ID - ${data.rows[0].id} is updated successfully!`,
						data: data.rows[0],
					});
				})
				.catch((error) => {
					res.status(500);
					res.json({
						success: false,
						message:
							"Unknown error occurred while updating your todo in the database!",
						errorMsg: error.message,
					});
				});
		}
	} catch (error) {
		res.status(500);
		res.json({
			success: false,
			message: "Unknow error occurred in the database!",
			errorMsg: error.message,
		});
	}
};

const undoTodo = (req, res) => {
	try {
		dbTodo;
		if (!req.body.id) {
			res.status(400);
			res.json({
				success: false,
				message: "Please provide a Todo ID.",
			});
		} else {
			dbTodo
				.dbTodoUndo(req.body.id)
				.then((data) => {
					res.status(200);
					res.json({
						success: true,
						message: `Todo with ID - ${data.rows[0].id} is updated successfully!`,
						data: data.rows[0],
					});
				})
				.catch((error) => {
					res.status(500);
					res.json({
						success: false,
						message:
							"Unknown error occurred while updating your todo in the database!",
						errorMsg: error.message,
					});
				});
		}
	} catch (error) {
		res.status(500);
		res.json({
			success: false,
			message: "Unknow error occurred in the database!",
			errorMsg: error.message,
		});
	}
};

const manager = {
	addTodo,
	deleteTodo,
	doneTodo,
	undoTodo,
	todos,
};

export default manager;
