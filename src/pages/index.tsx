import { useContext } from "react";
import { useRouter } from "next/router";
import { TodoContext } from "./_app";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Button,
  Flex,
  Footer,
  Header,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useQueryUserData } from "@/lib/tanstackQuery/useQueryUserData";
import { SignInModal, SignOutMenu, TodosList } from "@/component";
import Link from "next/link";

const listAttributes = [
  { dueDate: "today", color: "red", title: "今日する" },
  { dueDate: "tomorrow", color: "orange", title: "明日する" },
  { dueDate: "later", color: "yellow", title: "今度する" },
];

const Home = () => {
  const { data: user, status } = useQueryUserData();
  const { setEditingTodo } = useContext(TodoContext);
  const { push } = useRouter();
  const navigateToCreateForm = (props: string) => {
    setEditingTodo((prev) => ({
      ...prev,
      id: "",
      title: "",
      isDone: false,
      dueDate: props,
    })),
      push("/form");
  };

  console.log("rendered Home");

  return (
    <AppShell
      header={
        <Header height="4rem">
          {
            <Flex px="2rem" h="4rem" justify="space-between" align="center">
              <Link href="/">
                <Title order={1}>Todo</Title>
              </Link>

              {status === "loading" ? (
                <Skeleton width={40} height={40} radius="xl" />
              ) : user ? (
                <SignOutMenu
                  avatar={<Avatar src={user.image} alt="it's me" radius="xl" />}
                />
              ) : (
                <SignInModal
                  button={
                    <Button color="red" size="sm">
                      Login
                    </Button>
                  }
                />
              )}
            </Flex>
          }
        </Header>
      }
      footer={
        <Footer height={60}>
          <Text mt="1rem" c="gray" ta="center">
            &copy; 2023 Todo
          </Text>
        </Footer>
      }
    >
      <Flex
        mt="xl"
        mx="auto"
        maw="32rem"
        justify="flex-start"
        align="flex-start"
        direction="column"
      >
        {listAttributes.map((attribute) => (
          <TodosList
            key={attribute.dueDate}
            dueDate={attribute.dueDate}
            color={attribute.color}
            title={
              <Title order={2} mr="1rem" mb="2rem" color={attribute.color}>
                {attribute.title}
              </Title>
            }
            form={
              user ? (
                <ActionIcon
                  onClick={() => navigateToCreateForm(attribute.dueDate)}
                  bg={attribute.color}
                  m={"0.25rem"}
                  radius="xl"
                >
                  <IconPlus stroke="3px" color="white" />
                </ActionIcon>
              ) : (
                <SignInModal
                  button={
                    <ActionIcon bg={attribute.color} m={"0.25rem"} radius="xl">
                      <IconPlus stroke="3px" color="white" />
                    </ActionIcon>
                  }
                />
              )
            }
          />
        ))}
      </Flex>
    </AppShell>
  );
};

export default Home;
