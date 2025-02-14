import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro ao criar usuário
 */
router.post("/", (req, res) => {
  userController.createUser(req, res);
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Loga um usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário logado com sucesso
 *       400:
 *         description: Erro ao logar usuário
 */
router.post("/login", (req, res) => {
  userController.loginUser(req, res);
});

export default router;
