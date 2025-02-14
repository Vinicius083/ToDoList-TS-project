import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Task {
  title: string;
  type: string;
  userId: string;
}

const tasksServices = {
  getTasks: async (userId: string) => {
    return await prisma.task.findMany({
      where: { userId: userId },
    });
  },

  createTask: async (task: Task) => {
    return await prisma.task.create({
      data: task,
    });
  },

  updateTask: async (id: string, task: Task) => {
    return await prisma.task.update({
      where: { id: id },
      data: task,
    });
  },

  deleteTask: async (id: string) => {
    return await prisma.task.delete({
      where: { id: id },
    });
  },
};

export default tasksServices;
