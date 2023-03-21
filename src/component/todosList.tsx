import { useFetchTodos } from "@/lib/swr/useFetchTodos";
import { useCreateTodo, useUpdateTodo } from "@/lib/swr/useMutateTodo";
import {
  ActionIcon,
  Checkbox,
  Container,
  Flex,
  Group,
  List,
  MantineProvider,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { FC, ReactNode } from "react";
import { MenueButton } from "./MenueButton";

type Props = {
  dueDate: string;
  color: string;
  title: ReactNode;
};

export const TodosList: FC<Props> = (props) => {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      title: "",
      dueDate: props.dueDate,
    },
  });
  const { todos, error, isLoading } = useFetchTodos(props.dueDate);
  const { createTrigger } = useCreateTodo();
  const { updateTrigger } = useUpdateTodo();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const theme = {
    primaryColor: props.color,
  };

  return (
    <MantineProvider theme={theme}>
      <Container mx={0} mb={"4rem"} w={"100%"}>
        <Flex>
          {props.title}
          <div>
            <Modal
              opened={opened}
              onClose={close}
              size="70%"
              overlayProps={{
                color: "gray",
                opacity: 0.2,
                blur: 3,
              }}
            >
              <form
                onSubmit={form.onSubmit((values) =>
                  createTrigger(values, {
                    optimisticData: (current) => current,
                    rollbackOnError: true,
                    onSuccess: close,
                  })
                )}
              >
                <TextInput
                  placeholder="add Todo."
                  {...form.getInputProps("title")}
                />
              </form>
            </Modal>

            <Group position="center">
              <ActionIcon
                onClick={open}
                color={props.color}
                m={"0.25rem"}
                radius="xl"
              >
                <IconPlus stroke="3px" />
              </ActionIcon>
            </Group>
          </div>
        </Flex>
        <List listStyleType={"none"}>
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
                        updateTrigger({ ...todo, isDone: !todo.isDone })
                      }
                    />
                    <Text w="400px">{todo.title}</Text>
                    <MenueButton {...todo} />
                  </Flex>
                </List.Item>
              ))}
        </List>
      </Container>
    </MantineProvider>
  );
};
