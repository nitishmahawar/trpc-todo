"use client";
import React, { FC } from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Button } from "@nextui-org/button";
import { Trash2, Edit2 } from "lucide-react";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
import { Todo as TodoType } from "@prisma/client";
import EditModal from "./edit-modal";
import { format } from "date-fns";

interface TodoProps extends TodoType {}

const Todo: FC<TodoProps> = ({ createdAt, id, text }) => {
  const router = useRouter();
  const { mutate: deleteTodo, isLoading } = trpc.deleteTodo.useMutation({
    onError(error, variables, context) {},
    onSettled(data, error, variables, context) {
      router.refresh();
    },
  });
  return (
    <Card>
      <CardBody>
        <p className="text-lg">{text}</p>
      </CardBody>
      <CardFooter>
        <div className="flex gap-4 items-center justify-between w-full">
          <p>{format(createdAt, "d MMM, yyyy")}</p>
          <div className="space-x-4">
            <EditModal text={text} id={id} />
            <Button
              isIconOnly
              variant="flat"
              color="danger"
              onClick={() => deleteTodo({ id })}
            >
              {isLoading ? (
                <Spinner color="danger" size="sm" />
              ) : (
                <Trash2 size={20} />
              )}
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Todo;
