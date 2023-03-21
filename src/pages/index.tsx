import { Inter } from "@next/font/google";
import { AppShell, Avatar, Flex, Footer, Header, Title } from "@mantine/core";
import { TodosList } from "@/component/TodosList";
import { SignInModal } from "@/component/SignInModal";
import { useFetchUserData } from "@/lib/swr/useFetchUserData";
import { SignOutMenu } from "@/component/SignOutMenu";

const inter = Inter({ subsets: ["latin"] });

const data = [
  { dueDate: "today", color: "red", title: "今日する" },
  { dueDate: "tomorrow", color: "orange", title: "明日する" },
  { dueDate: "later", color: "yellow", title: "今度する" },
];

const Home = () => {
  const { user } = useFetchUserData();

  return (
    <>
      <AppShell
        header={
          <Header height="4rem">
            {
              <Flex px="2rem" h="4rem" justify="space-between" align="center">
                <Title order={1}>Todo</Title>
                {user ? (
                  <SignOutMenu
                    avatar={
                      <Avatar src={user.image} alt="it's me" radius="xl" />
                    }
                  />
                ) : (
                  <SignInModal />
                )}
              </Flex>
            }
          </Header>
        }
        footer={<Footer height={60}>{<p>&copy; 2023 Todo</p>}</Footer>}
      >
        <Flex justify="flex-start" align="flex-start" direction="column">
          {data.map((data) => (
            <TodosList
              key={data.dueDate}
              dueDate={data.dueDate}
              color={data.color}
              title={
                <Title order={2} mb={"2rem"} color={data.color}>
                  {data.title}
                </Title>
              }
            />
          ))}

          {/* <TodosList
            dueDate="today"
            color="red"
            title={
              <Title order={2} mb={"2rem"} color={"red"}>
                今日する
              </Title>
            }
          />
          <TodosList
            dueDate="tomorrow"
            color="orange"
            title={
              <Title order={2} mb={"2rem"} color={"orange"}>
                明日する
              </Title>
            }
          />
          <TodosList
            dueDate="later"
            color="yellow"
            title={
              <Title order={2} mb={"2rem"} color={"yellow"}>
                今度する
              </Title>
            }
          /> */}
        </Flex>
      </AppShell>
    </>
  );
};

export default Home;
