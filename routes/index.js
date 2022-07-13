import express from "express";
import manager from "../controllers/todo-manager.js";
const router = express.Router();

router.get("/todos", manager.todos);
// add-todo
router.post("/todo-add", manager.addTodo);
router.put("/todo-done", manager.doneTodo);
router.put("/todo-undo", manager.undoTodo);
router.delete("/todo-delete", manager.deleteTodo);

export default router;
