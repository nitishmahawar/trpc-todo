import prisma from "@/lib/prisma";
import { privateProcedure, publicProcedure, router } from "@/trpc/trpc";
import { z } from "zod";

export const appRouter = router({
  // for adding todo
  addTodo: privateProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ ctx: { userId }, input: { text } }) => {
      const todo = await prisma.todo.create({
        data: { text, userId },
      });
      return todo;
    }),
  // for getting todos
  getTodos: privateProcedure.query(async ({ ctx: { userId } }) => {
    const todos = await prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return todos;
  }),
  //   updating todo
  updateTodo: privateProcedure
    .input(z.object({ id: z.string(), text: z.string() }))
    .mutation(async ({ ctx: { userId }, input: { id, text } }) => {
      const todo = await prisma.todo.update({
        where: { id, userId },
        data: { text },
      });
      return todo;
    }),
  //   for deleting todos
  deleteTodo: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx: { userId }, input: { id } }) => {
      const todo = await prisma.todo.delete({ where: { id, userId } });
      return todo;
    }),
});

export type AppRouter = typeof appRouter;
