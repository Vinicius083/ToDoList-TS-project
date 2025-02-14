"use client";

import { useState, useEffect } from "react";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "@/services/tasksServices";
import TaskModel from "@/components/TaskModel";
import TaskTableModel from "@/components/TaskTableModel";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { Task } from "@/types/Task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Task>({
    id: "",
    title: "",
    type: "",
    userId: "",
  });
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      setUserId(storedUser?.id || null);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      getTasks(userId)
        .then(setTasks)
        .catch(() => {
          toast({
            title: "Erro!",
            description: "Não foi possível buscar as tarefas do usuário.",
            variant: "destructive",
          });
        });
    }
  }, [userId]);

  const handleAddTask = () => {
    setIsEditMode(false);
    setTask({ id: "", title: "", type: "", userId: userId! });
    setOpenTaskModal(true);
  };

  const handleCreateTask = async () => {
    if (!task.title.trim()) {
      toast({
        title: "Erro!",
        description: "Por favor insira uma tarefa",
        variant: "destructive",
      });
      return;
    }

    try {
      await createTask(task.title, task.type, userId!);
      toast({ title: "Sucesso!", description: "Tarefa criada com sucesso!" });
      setTask({ id: "", title: "", type: "", userId: userId! });
      setOpenTaskModal(false);
      setTasks(await getTasks(userId!));
    } catch (error) {
      toast({
        title: "Erro!",
        description:
          error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
        action: <ToastAction altText="Fechar">Fechar</ToastAction>,
      });
    }
  };

  const handleEditTask = (task: Task) => {
    setTask(task);
    setIsEditMode(true);
    setOpenTaskModal(true);
  };

  const handleUpdateTask = async () => {
    if (!task.title.trim()) {
      toast({
        title: "Erro!",
        description: "Por favor insira uma tarefa",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateTask(task.id, task.title, task.type, task.userId);
      toast({
        title: "Sucesso!",
        description: "Tarefa atualizada com sucesso!",
      });
      setTask({ id: "", title: "", type: "", userId: userId! });
      setIsEditMode(false);
      setOpenTaskModal(false);
      setTasks(await getTasks(userId!));
    } catch (error) {
      toast({
        title: "Erro!",
        description:
          error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
        action: <ToastAction altText="Fechar">Fechar</ToastAction>,
      });
    }
  };

  const handleDeleteTask = async (task: Task) => {
    try {
      await deleteTask(task.id);
      toast({ title: "Sucesso!", description: "Tarefa deletada com sucesso!" });
      setTasks(await getTasks(userId!));
    } catch (error) {
      toast({
        title: "Erro!",
        description:
          error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
        action: <ToastAction altText="Fechar">Fechar</ToastAction>,
      });
    }
  };

  return (
    <div className="bg-gray-900 text-white">
      <TaskTableModel
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onAdd={handleAddTask}
      />

      <TaskModel
        open={openTaskModal}
        onClose={() => setOpenTaskModal(false)}
        task={task}
        setTask={setTask}
        handleSubmit={isEditMode ? handleUpdateTask : handleCreateTask}
        isEditMode={isEditMode}
      />
    </div>
  );
}
