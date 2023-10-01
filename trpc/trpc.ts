import { auth, clerkClient } from "@clerk/nextjs";
import { TRPCError, initTRPC } from "@trpc/server";

const t = initTRPC.create();
const middleware = t.middleware;

const isAuth = middleware((opts) => {
  const { userId } = auth();
  if (!userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const user = clerkClient.users.getUser(userId);
  return opts.next({
    ctx: {
      userId,
      user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
