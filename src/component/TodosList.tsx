import { FC, ReactNode } from "react";
import { useMutateTodo } from "@/lib/tanstackQuery/useMutateTodo";
import { useQueryTodos } from "@/lib/tanstackQuery/useQueryTodos";
import { Checkbox, Container, Flex, List, Skeleton, Text } from "@mantine/core";
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
    <Container mx={0} mb={"4rem"} w={"100%"}>
      <Flex>
        {props.title}
        {props.form}
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
                  <MenuButton {...todo} />
                </Flex>
              </List.Item>
            ))}
      </List>
    </Container>
  );
};
