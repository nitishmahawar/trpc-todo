"use client";
import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

const AddTodo = () => {
  const [input, setInput] = useState("");
  const router = useRouter();

  const { mutate: addTodo, isLoading } = trpc.addTodo.useMutation({
    onSettled: () => {
      router.refresh();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo({ text: input });
    setInput("");
  };

  return (
    <form
      className="flex flex-col md:flex-row gap-4 md:items-end max-w-screen-lg mx-auto"
      onSubmit={handleSubmit}
    >
      <Input
        isRequired
        value={input}
        onValueChange={(value) => setInput(value)}
        label="Add Todo"
        placeholder="Wash the car"
        labelPlacement="outside"
        size="lg"
      />
      <Button
        type="submit"
        size="lg"
        className="font-semibold"
        color="primary"
        isLoading={isLoading}
      >
        Add Todo
      </Button>
    </form>
  );
};

export default AddTodo;
