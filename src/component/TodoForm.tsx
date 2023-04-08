import { FC, useContext } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "@mantine/form";
import { Box, Button, Group, MantineProvider, Textarea } from "@mantine/core";
import { TodoContext } from "@/pages/_app";
import { useMutateTodo } from "@/lib/tanstackQuery/useMutateTodo";

/** @package */
export const TodoForm: FC = () => {
  const { push } = useRouter();
  const { createTodoMutation, updateTodoMutation } = useMutateTodo();
  const { editingTodo } = useContext(TodoContext);
  const color =
    editingTodo.dueDate === "today"
      ? "red"
      : editingTodo.dueDate === "tomorrow"
      ? "orange"
      : "yellow";
  const theme = {
    primaryColor: color,
  };

  const form = useForm({
    initialValues: {
      id: editingTodo.id,
      title: editingTodo.title,
      isDone: editingTodo.isDone,
      dueDate: editingTodo.dueDate,
    },
  });

  return (
    <MantineProvider theme={theme}>
      <Box>
        <form
          onSubmit={form.onSubmit((values) =>
            values.id === ""
              ? createTodoMutation.mutate({ ...values, id: uuidv4() })
              : updateTodoMutation.mutate(values)
          )}
        >
          <Textarea placeholder="add Todo." {...form.getInputProps("title")} />
          <Group position="right">
            <Button mt="2rem" type="submit" onClick={() => push("/")}>
              {editingTodo.id === "" ? "登録" : "更新"}
            </Button>
          </Group>
        </form>
      </Box>
    </MantineProvider>
  );
};
