import { FC, ReactNode } from "react";
import { Modal, Button, Title, Text, Center } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const URL =
  process.env.SIGN_IN_URL || "http://localhost:8080/api/v1/auth/google";

type Props = {
  button: ReactNode;
};

/** @package */
export const SignInModal: FC<Props> = (props) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        padding="0.5rem"
        size={400}
        radius="lg"
      >
        <Title mb="lg" ta="center">
          Todoアプリ
        </Title>
        <Text mx="lg" my="sm" fz="xs">
          学習目的で作成したシンプルなTodoアプリです。
        </Text>
        <Center>
          <form method="get" action={URL}>
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
        </Center>
        <Text m="lg" fz="xs" sx={(theme) => ({ color: theme.colors.gray[6] })}>
          利用規約、プライバシーポリシーに同意した上でログインしてください。
        </Text>
      </Modal>

      <a onClick={open}>{props.button}</a>
    </>
  );
};
