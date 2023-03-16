import { useFetchTodos } from "@/lib/swr/useFetchTodos";
import {
  useTodoCreate,
  useTodoDelete,
  useTodoUpdate,
} from "@/lib/swr/useTodoMutate";
import {
  ActionIcon,
  Center,
  Checkbox,
  Flex,
  List,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCirclePlus, IconTrash } from "@tabler/icons-react";

export const TodosList = (props: { dueDate: string; color: string }) => {
  const { createTrigger, isCreating } = useTodoCreate();
  const { updateTrigger, isUpdating } = useTodoUpdate();
  const { deleteTrigger, isDeleting } = useTodoDelete();

  const form = useForm({
    initialValues: {
      title: "",
    },
    validate: {},
  });

  const { todos, error, isLoading } = useFetchTodos(props.dueDate);

  if (error) {
    return <Center>Error</Center>;
  }
  if (isLoading) {
    return <Center>Loading...</Center>;
  }

  console.log(props.dueDate);
  return (
    <List listStyleType="none">
      {todos === undefined
        ? null
        : todos.map((todo) => {
            return (
              <List.Item key={todo.id} w="30rem" pb={"1rem"}>
                <Flex>
                  <Checkbox
                    color={props.color}
                    radius="xl"
                    pt={"0.25rem"}
                    pr={"1rem"}
                    checked={todo.isDone}
                    onChange={() =>
                      updateTrigger({
                        pass: todo.id,
                        data: {
                          title: todo.title,
                          isDone: !todo.isDone,
                          dueDate: todo.dueDate,
                        },
                      })
                    }
                  />
                  <Text
                    color={todo.isDone ? "dark.1" : "dark"}
                    td={todo.isDone ? "line-through" : ""}
                  >
                    {todo.title}
                  </Text>
                  <ActionIcon onClick={() => deleteTrigger(todo.id)}>
                    <IconTrash />
                  </ActionIcon>
                </Flex>
              </List.Item>
            );
          })}
      <List.Item key={"input"} w="30rem" pb={"1rem"}>
        <Flex>
          <IconCirclePlus color="gray" />
          <form
            onSubmit={form.onSubmit((values) =>
              createTrigger({ title: values.title, dueDate: props.dueDate })
            )}
          >
            <TextInput
              placeholder="Add a todo"
              required
              {...form.getInputProps("title")}
            />
            {/* <Button type="submit">追加</Button> */}
          </form>
        </Flex>
      </List.Item>
    </List>
  );
};
