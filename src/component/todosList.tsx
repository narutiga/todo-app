import { FC, ReactNode } from "react";
import { useMutateTodo } from "@/lib/tanstackQuery/useMutateTodo";
import { useQueryTodos } from "@/lib/tanstackQuery/useQueryTodos";
import { v4 as uuidv4 } from "uuid";
import {
  ActionIcon,
  Button,
  Checkbox,
  Container,
  Flex,
  Group,
  List,
  MantineProvider,
  Modal,
  Skeleton,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { MenueButton } from "./MenueButton";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";

type Props = {
  dueDate: string;
  color: string;
  title: ReactNode;
};

export const TodosList: FC<Props> = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: todos, status } = useQueryTodos(props.dueDate);
  const { createTodoMutation, updateTodoMutation } = useMutateTodo();

  const form = useForm({
    initialValues: {
      id: uuidv4(),
      title: "",
      isDone: false,
      dueDate: props.dueDate,
    },
  });

  const theme = {
    primaryColor: props.color,
  };

  return (
    <MantineProvider theme={theme}>
      <Container mx={0} mb={"4rem"} w={"100%"}>
        <Flex>
          {props.title}
          <div>
            <Modal opened={opened} onClose={close} fullScreen>
              <form
                onSubmit={form.onSubmit((values) =>
                  createTodoMutation.mutate(values)
                )}
              >
                <Textarea
                  placeholder="add Todo."
                  {...form.getInputProps("title")}
                />
                <Button mt="2rem" type="submit" onClick={close}>
                  登録
                </Button>
              </form>
            </Modal>

            <Group position="center">
              <ActionIcon
                onClick={open}
                bg={props.color}
                m={"0.25rem"}
                radius="xl"
              >
                <IconPlus stroke="3px" color="white" />
              </ActionIcon>
            </Group>
          </div>
        </Flex>
        <List listStyleType={"none"}>
          {status === "loading" ? <Skeleton height={60} /> : null}
          {todos === undefined
            ? null
            : todos.map((todo) => (
                <List.Item key={todo.id} mb={"1rem"}>
                  <Flex>
                    <Checkbox
                      mr={"1rem"}
                      color={props.color}
                      radius="xl"
                      size="md"
                      checked={todo.isDone}
                      onChange={() =>
                        updateTodoMutation.mutate({
                          ...todo,
                          isDone: !todo.isDone,
                        })
                      }
                    />
                    <Text
                      w="400px"
                      c={todo.isDone ? "gray" : "dark"}
                      td={todo.isDone ? "line-through" : ""}
                    >
                      {todo.title}
                    </Text>
                    <MenueButton {...todo} />
                  </Flex>
                </List.Item>
              ))}
        </List>
      </Container>
    </MantineProvider>
  );
};
