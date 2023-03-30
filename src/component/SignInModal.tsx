import { FC, ReactNode } from "react";
import { Modal, Button, Title, Text, Center } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import btn_google_signin from "./../../public/btn_google_signin.png";

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
              p={0}
              sx={(theme) => ({
                borderRadius: theme.radius.md,
                fontWeight: 600,
                boxShadow: theme.shadows.xs,
              })}
            >
              <Image
                src={btn_google_signin}
                alt="Google Sign In"
                sizes="100%"
                style={{ borderRadius: "1rem", objectFit: "cover" }}
              />
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
