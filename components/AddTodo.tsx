import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useTodo } from "../context";
import Input from "./Input";

export const AddTodo = () => {
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLElement>(null);
  /* const [todos, setTodos] = useState<string[]>([]); */
  const { addTodo } = useTodo();

  const handleChange = (e: any) => setInput(e.target.value);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() !== "") {
      /* setTodos([...todos, input]); */
      addTodo(input);
      setInput("");
      toast.success("Todo added successfully!");
    } else {
      toast.error("Todo field cannot be empty");
    }
    console.log("Form has been submitted");
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const submitBtn = (
    <button
      type="submit"
      className="px-5 py-2 text-sm font-normal text-blue-300 bg-blue-900 border-2 border-blue-900 active:scale-95 rounded-xl"
    >
      Submit
    </button>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center w-full max-w-lg gap-2 p-5 m-auto">
        <Input
          value={input}
          ref={inputRef}
          onChange={handleChange}
          type="text"
          placeholder="start typing ..."
          className="w-full px-5 py-2 bg-transparent border-2 outline-none border-zinc-600 rounded-xl placeholder:text-zinc-500 focus:border-white"
        />
        {submitBtn}
      </div>
    </form>
  );
};
