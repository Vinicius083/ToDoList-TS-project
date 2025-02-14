import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Task } from "@/types/Task";

const TaskModal = ({
  open,
  onClose,
  task,
  setTask,
  handleSubmit,
  isEditMode,
}: {
  open: boolean;
  onClose: () => void;
  task: Task;
  setTask: (task: Task) => void;
  handleSubmit: () => void;
  isEditMode: boolean;
}) => {
  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Atualizar Tarefa" : "Nova Tarefa"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tarefa" className="text-right">
              Tarefa
            </Label>
            <Input
              value={task?.title || ""}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              className="col-span-3 text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tipo" className="text-right">
              Tipo
            </Label>
            <Input
              value={task?.type || ""}
              onChange={(e) => setTask({ ...task, type: e.target.value })}
              className="col-span-3 text-white"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleFormSubmit}
            className="text-black bg-white px-4 py-6 rounded-md"
          >
            {isEditMode ? "Atualizar" : "Criar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
