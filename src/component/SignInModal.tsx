import { FC, ReactNode, useState } from "react";
import { Modal, Button, Title, Text } from "@mantine/core";

type Props = {
  button: ReactNode;
};

/** @package */
export const SignInModal: FC = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size={400}
        radius="lg"
        styles={{}}
      >
        <Title ta="center">Todoアプリ</Title>
        <Text fz="xs" mt="sm" mb="sm">
          学習目的で作成したシンプルなTodoアプリです。
        </Text>
        <form method="get" action="http://localhost:8080/api/v1/auth/google">
          <Button
            type="submit"
            variant="default"
            size="md"
            sx={(theme) => ({
              borderRadius: theme.radius.md,
              fontWeight: 600,
              boxShadow: theme.shadows.xs,
            })}
          >
            Login with Google
          </Button>
        </form>

        <Text fz="xs" mt="sm" sx={(theme) => ({ color: theme.colors.gray[6] })}>
          利用規約、プライバシーポリシーに同意した上でログインしてください。
        </Text>
      </Modal>

      <Button color="red" onClick={() => setOpened(true)} size="sm">
        Log in
      </Button>
    </>
  );
};
