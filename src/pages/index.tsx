import { SignInModal, SignOutMenu, TodosList } from "@/component";
import { useQueryUserData } from "@/lib/tanstackQuery/useQueryUserData";
import {
  AppShell,
  Avatar,
  Flex,
  Footer,
  Header,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";

const listAttributes = [
  { dueDate: "today", color: "red", title: "今日する" },
  { dueDate: "tomorrow", color: "orange", title: "明日する" },
  { dueDate: "later", color: "yellow", title: "今度する" },
];

const Home = () => {
  const { data: user, status } = useQueryUserData();

  return (
    <AppShell
      header={
        <Header height="4rem">
          {
            <Flex px="2rem" h="4rem" justify="space-between" align="center">
              <Title order={1}>Todo</Title>
              {status === "loading" ? (
                <Skeleton width={40} height={40} radius="xl" />
              ) : user ? (
                <SignOutMenu
                  avatar={<Avatar src={user.image} alt="it's me" radius="xl" />}
                />
              ) : (
                <SignInModal />
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
              <Title order={2} mb={"2rem"} color={attribute.color}>
                {attribute.title}
              </Title>
            }
          />
        ))}
      </Flex>
    </AppShell>
  );
};

export default Home;
