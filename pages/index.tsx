import Image from "next/image";
import { Inter } from "next/font/google";
import { TodoList, AddTodo } from "../components";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Toaster position="bottom-center" />
      <AddTodo />
      <TodoList />
    </div>
  );
}
