import express from "express";
import tasksController from "../controllers/tasksController";

const router = express.Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obter todas as tarefas de um usuário
 *     tags: [Tarefas]
 *     parameters:
 *       - in: query
 *         name: userId
 *         type: string
 *         required: true
 *         description: ID do usuário
 *
 *     responses:
 *       200:
 *         description: Tarefas obtidas com sucesso
 *       400:
 *         description: Erro ao obter tarefas
 */
router.get("/", (req, res) => {
  tasksController.getTasks(req, res);
});

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tarefas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Erro ao criar tarefa
 */
router.post("/", (req, res) => {
  tasksController.createTask(req, res);
});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       400:
 *         description: Erro ao atualizar tarefa
 */
router.put("/:id", (req, res) => {
  tasksController.updateTask(req, res);
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Deleta uma tarefa
 *     tags: [Tarefas]
 *     parameters:
 *       - in: path
 *         name: id
 *     responses:
 *       200:
 *         description: Tarefa deletada com sucesso
 *       400:
 *         description: Erro ao deletar tarefa
 */
router.delete("/:id", (req, res) => {
  tasksController.deleteTask(req, res);
});

export default router;
