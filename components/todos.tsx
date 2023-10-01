import { Todo as TodoType } from "@prisma/client";
import React, { FC } from "react";
import Todo from "./todo";

interface TodosProps {
  todos: TodoType[];
}

const Todos: FC<TodosProps> = ({ todos }) => {
  return (
    <div className="space-y-6 mt-6">
      <h2 className="text-xl font-semibold">Your Todos</h2>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {todos.map((todo) => (
          <Todo key={todo.id} {...todo} />
        ))}
      </div>
    </div>
  );
};

export default Todos;
