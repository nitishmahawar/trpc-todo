import AddTodo from "@/components/add-todo";
import React from "react";
import { serverClient } from "./_trpc/serverClient";
import Todos from "@/components/todos";
import Navbar from "@/components/navbar";

const Page = async () => {
  const todos = await serverClient.getTodos();
  return (
    <main>
      <Navbar />
      <div className="max-w-screen-lg mx-auto px-4 py-6">
        <AddTodo />
        <Todos todos={todos} />
      </div>
    </main>
  );
};

export default Page;
