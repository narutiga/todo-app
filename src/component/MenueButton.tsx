import { useChangeDueDateTodo, useDeleteTodo } from "@/lib/swr/useMutateTodo";
import { useMutateTodo } from "@/lib/tanstackQuery/useMutateTodo";
import { Flex, Menu } from "@mantine/core";
import {
  IconChevronDown,
  IconChevronsDown,
  IconChevronsUp,
  IconChevronUp,
  IconDots,
  IconTrash,
} from "@tabler/icons-react";

export const MenueButton = (todo: any) => {
  const { changeDueDateTrigger } = useChangeDueDateTodo();
  const { deleteTrigger } = useDeleteTodo();
  const { deleteTodoMutation } = useMutateTodo();
  const { changeDueDateMutation } = useMutateTodo();

  return (
    <Menu shadow="xs" width={180} radius="md">
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
