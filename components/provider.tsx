"use client";
import React, { FC, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "@/app/_trpc/client";
import { httpBatchLink } from "@trpc/client";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: FC<ProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${process.env.NEXT_PUBLIC_APP_URL}/api/trpc`,
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>{children}</NextUIProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Provider;
