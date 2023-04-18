import { FC, ReactNode } from "react";
import { useMutateTodo } from "@/lib/tanstackQuery/useMutateTodo";
import { useQueryTodos } from "@/lib/tanstackQuery/useQueryTodos";
import { Checkbox, Container, Flex, List, Text } from "@mantine/core";
import { MenuButton } from "./MenuButton";

type Props = {
  dueDate: string;
  color: string;
  title: ReactNode;
  form: ReactNode;
};

/** @package */
export const TodosList: FC<Props> = (props) => {
  const { data: todos, status } = useQueryTodos(props.dueDate);
  const { updateTodoMutation } = useMutateTodo();

  return (
    <Container p={0} mx={0} mb="4rem" w="100%">
      <Flex>
        {props.title}
        {props.form}
      </Flex>
      <List listStyleType="none">
        {todos === undefined
          ? null
          : todos.map((todo) => (
              <List.Item key={todo.id} mb="1rem">
                <Flex>
                  <Checkbox
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
                    mx="1rem"
                    size="lg"
                    c={todo.isDone ? "gray" : "dark"}
                    td={todo.isDone ? "line-through" : ""}
                  >
                    {todo.title}
                  </Text>
                  <MenuButton {...todo} />
                </Flex>
              </List.Item>
            ))}
      </List>
    </Container>
  );
};
