import type { Todo } from "../context";
import { useEffect, useRef, useState } from "react";
import { useTodo } from "../context";
import Input from "./Input";
import { BsCheck2Square } from "react-icons/bs";
import { TbRefresh } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";
import { toast } from "react-hot-toast";
import cn from "classnames";
import { motion } from "framer-motion";

export const TodoItem = (props: { todo: Todo }) => {
  const { todo } = props;

  const [editTodoText, setEditTodoText] = useState<string>("");
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const { deleteTodo, editTodo, updateTodoStatus } = useTodo();
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingTodoId !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingTodoId]);

  const handleEdit = (todoId: string, todoText: string) => {
    setEditingTodoId(todoId);
    setEditTodoText(todoText);

    if (editInputRef.current) {
      editInputRef.current.focus();
    }
  };

  const handleUpdate = (todoId: string) => {
    if (editTodoText.trim() !== "") {
      editTodo(todoId, editTodoText);
      setEditingTodoId(null);
      setEditTodoText("");
      toast.success("Todo updated successfully!");
    } else {
      toast.error("Todo field cannot be empty!");
    }
  };

  const handleDelete = (todoId: string) => {
    deleteTodo(todoId);
    toast.success("Todo deleted successfully!");
  };

  const handleStatusUpdate = (todoId: string) => {
    updateTodoStatus(todoId);
    toast.success("Todo status updated successfully!");
  };

  const handleChange = (e: any) => setEditTodoText(e.target.value);

  const updateBtn = (
    <button
      className="px-5 py-2 text-sm font-normal text-orange-300 bg-orange-900 border-2 border-orange-900 active:scale-95 rounded-xl"
      onClick={() => handleUpdate(todo.id)}
    >
      Update
    </button>
  );

  const editBtn = (
    <button
      onClick={() => handleEdit(todo.id, todo.text)}
      className="flex items-center gap-1"
    >
      <FaRegEdit />
      Edit
    </button>
  );

  const deleteBtn = (
    <button
      onClick={() => handleDelete(todo.id)}
      className="flex items-center gap-1 text-red-500"
    >
      <RiDeleteBin7Line />
      Delete
    </button>
  );

  return (
    <motion.li
      layout
      key={todo.id}
      className={cn(
        "p-5 rounded-xl bg-zinc-900",
        todo.status === "completed" && "bg-opacity-50 text-zinc-500",
      )}
    >
      {editingTodoId === todo.id ? (
        <motion.div layout className="flex gap2">
          <Input
            ref={editInputRef}
            type="text"
            value={editTodoText}
            onChange={handleChange}
          />
          {updateBtn}
        </motion.div>
      ) : (
        <div className="flex flex-col gap-5">
          <motion.span
            layout
            style={{
              textDecoration:
                todo.status === "completed" ? "line-through" : "none",
            }}
          >
            {todo.text}
          </motion.span>
          <div className="flex justify-between gap-5 text-white">
            <button onClick={()=> handleStatusUpdate(todo.id)}>
              {todo.status === "undone" ? (
                <span className="flex items-center gap-1">
                  <BsCheck2Square />
                  Mark Completed
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <TbRefresh />
                  Mark Completed
                </span>
              )}
            </button>
            <div className="flex items-center gap-2">
              {editBtn}
              {deleteBtn}
            </div>
          </div>
        </div>
      )}
    </motion.li>
  );
};
