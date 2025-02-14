import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Task } from "@/types/Task";
import { Pencil, Trash2, ListCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const TaskTableModel = ({
  tasks,
  onEdit,
  onDelete,
  onAdd,
}: {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onAdd: () => void;
}) => {
  const [filter, setFilter] = useState("");
  const filteredTasks = tasks.filter((task) =>
    task.title?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-center mb-20 mt-5">
          <ListCheck size={45} />
          <h1 className="text-4xl font-bold tracking-wide">ToDo List</h1>
        </div>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Filtrar tarefas..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded w-full bg-gray-800 text-white"
          />
          <Button
            variant="outline"
            onClick={() => onAdd()}
            className="text-black bg-white px-4 py-5 rounded-md"
          >
            Adicionar
          </Button>
        </div>

        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[500px]">Tarefas</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.type}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button
                    className="bg-white text-black"
                    size="icon"
                    onClick={() => onEdit(task)}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    className="bg-white text-black"
                    size="icon"
                    onClick={() => onDelete(task)}
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TaskTableModel;
