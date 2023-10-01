import React, { FC, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Edit2 } from "lucide-react";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";

interface EditModelProps {
  text: string;
  id: string;
}

const EditModal: FC<EditModelProps> = ({ text, id }) => {
  const [input, setInput] = useState<string>(text);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const router = useRouter();

  const { mutate: updateTodo, isLoading } = trpc.updateTodo.useMutation({
    onSuccess(data, variables, context) {
      router.refresh();
      onClose();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Button onPress={onOpen} isIconOnly variant="flat" color="primary">
        <Edit2 size={20} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Todo {text}
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit}>
                  <Input
                    label="Todo"
                    placeholder="Enter your todo"
                    labelPlacement="outside"
                    value={input}
                    onValueChange={(value) => setInput(value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && updateTodo({ id, text: input })
                    }
                    isRequired
                    autoFocus
                  />
                  <ModalFooter className="px-0">
                    <Button type="button" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      onPress={() => updateTodo({ id, text: input })}
                      isLoading={isLoading}
                    >
                      Update
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
