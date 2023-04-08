import { TodoForm } from "@/component/TodoForm";
import { Container, Flex, Footer, Text } from "@mantine/core";

const Form = () => {
  return (
    <Flex direction="column">
      <Container pt="5rem" px="4rem" mih="100vh" w="100%">
        <TodoForm />
      </Container>
      <Footer height={60}>
        <Text mt="1rem" c="gray" ta="center">
          &copy; 2023 Todo
        </Text>
      </Footer>
    </Flex>
  );
};

export default Form;
