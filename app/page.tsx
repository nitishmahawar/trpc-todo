import AddTodo from "@/components/add-todo";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import { serverClient } from "./_trpc/serverClient";
import Todos from "@/components/todos";

const Page = async () => {
  const todos = await serverClient.getTodos();
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-6">
      <AddTodo />
      <Todos todos={todos} />
    </div>
  );
};

export default Page;
