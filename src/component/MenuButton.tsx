import { FC, useContext } from "react";
import { useRouter } from "next/router";
import { Flex, Menu } from "@mantine/core";
import {
  IconChevronDown,
  IconChevronsDown,
  IconChevronsUp,
  IconChevronUp,
  IconDots,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { useMutateTodo } from "@/lib/tanstackQuery/useMutateTodo";
import { Todo } from "@/lib/tanstackQuery/useQueryTodos";
import { TodoContext } from "@/pages/_app";

/** @package */
export const MenuButton: FC<Todo> = (todo) => {
  const { deleteTodoMutation } = useMutateTodo();
  const { changeDueDateMutation } = useMutateTodo();
  const { setEditingTodo } = useContext(TodoContext);
  const { push } = useRouter();
  const navigateToEditForm = (todo: Todo) => {
    setEditingTodo((prev: Todo) => {
      return { ...prev, ...todo };
    });
    push("/form");
  };

  return (
    <Menu shadow="xs" width={202} radius="md">
      <Menu.Target>
        <IconDots color="gray" />
      </Menu.Target>

      <Menu.Dropdown>
        <Flex>
          <Menu.Item display={todo.dueDate === "today" ? "none" : "inline"}>
            <IconChevronUp
              color="gray"
              onClick={() =>
                changeDueDateMutation.mutate({
                  ...todo,
                  newDueDate:
                    todo.dueDate === "tomorrow" ? "today" : "tomorrow",
                })
              }
            />
          </Menu.Item>
          <Menu.Item display={todo.dueDate === "later" ? "inline" : "none"}>
            <IconChevronsUp
              color="gray"
              onClick={() =>
                changeDueDateMutation.mutate({ ...todo, newDueDate: "today" })
              }
            />
          </Menu.Item>
          <Menu.Item display={todo.dueDate === "later" ? "none" : "inline"}>
            <IconChevronDown
              color="gray"
              onClick={() =>
                changeDueDateMutation.mutate({
                  ...todo,
                  newDueDate:
                    todo.dueDate === "tomorrow" ? "later" : "tomorrow",
                })
              }
            />
          </Menu.Item>
          <Menu.Item display={todo.dueDate === "today" ? "inline" : "none"}>
            <IconChevronsDown
              color="gray"
              onClick={() =>
                changeDueDateMutation.mutate({ ...todo, newDueDate: "later" })
              }
            />
          </Menu.Item>
          <Menu.Item>
            <IconPencil color="gray" onClick={() => navigateToEditForm(todo)} />
          </Menu.Item>
          <Menu.Item>
            <IconTrash
              color="gray"
              onClick={() => deleteTodoMutation.mutate(todo)}
            />
          </Menu.Item>
        </Flex>
      </Menu.Dropdown>
    </Menu>
  );
};
