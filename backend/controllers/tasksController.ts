import tasksServices from "../services/tasksServices";
import { Request, Response } from "express";

const tasksController = {
  getTasks: async (req: Request, res: Response) => {
    try {
      const { userId } = req.query;

      if (typeof userId !== "string") {
        return res.status(400).json({ message: "userId invalido" });
      }

      const tasks = await tasksServices.getTasks(userId);

      if (tasks) {
        return res.status(200).json(tasks);
      } else {
        return res
          .status(401)
          .json({ message: "Não existem tarefas para esse usuário" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar tarefas", error: error.message });
    }
  },

  createTask: async (req: Request, res: Response) => {
    try {
      const task = {
        title: req.body.title,
        type: req.body.type,
        userId: req.body.userId,
      };

      const response = await tasksServices.createTask(task);

      if (response) {
        return res.status(201).json(response);
      } else {
        return res
          .status(401)
          .json({ message: "Não foi possivel criar tarefa" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao tentar criar tarefa", error: error.message });
    }
  },

  updateTask: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const task = {
        title: req.body.title,
        type: req.body.type,
        userId: req.body.userId,
      };

      const response = await tasksServices.updateTask(id, task);

      if (response) {
        return res
          .status(201)
          .json({ message: "Tarefa atualizada com sucesso", response });
      } else {
        return res
          .status(401)
          .json({ message: "Não foi possivel atualizar tarefa" });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao tentar atualizar tarefa",
        error: error.message,
      });
    }
  },

  deleteTask: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const response = await tasksServices.deleteTask(id);

      if (response) {
        return res.status(201).json({ message: "Tarefa deletada com sucesso" });
      } else {
        return res
          .status(401)
          .json({ message: "Não foi possivel deletar tarefa" });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao tentar deletar tarefa",
        error: error.message,
      });
    }
  },
};

export default tasksController;
