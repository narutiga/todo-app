import { useChangeDueDateTodo, useDeleteTodo } from "@/lib/swr/useMutateTodo";
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
                changeDueDateTrigger({
                  ...todo,
                  dueDate: todo.dueDate === "tomorrow" ? "today" : "tomorrow",
                })
              }
            />
          </Menu.Item>
          <Menu.Item display={todo.dueDate === "later" ? "inline" : "none"}>
            <IconChevronsUp
              color="gray"
              onClick={() =>
                changeDueDateTrigger({ ...todo, dueDate: "today" })
              }
            />
          </Menu.Item>
          <Menu.Item display={todo.dueDate === "later" ? "none" : "inline"}>
            <IconChevronDown
              color="gray"
              onClick={() =>
                changeDueDateTrigger({
                  ...todo,
                  dueDate: todo.dueDate === "tomorrow" ? "later" : "tomorrow",
                })
              }
            />
          </Menu.Item>
          <Menu.Item display={todo.dueDate === "today" ? "inline" : "none"}>
            <IconChevronsDown
              color="gray"
              onClick={() =>
                changeDueDateTrigger({ ...todo, dueDate: "later" })
              }
            />
          </Menu.Item>
          <Menu.Item>
            <IconTrash color="gray" onClick={() => deleteTrigger(todo.id)} />
          </Menu.Item>
        </Flex>
      </Menu.Dropdown>
    </Menu>
  );
};
