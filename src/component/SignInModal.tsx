import { FC, ReactNode } from "react";
import Image from "next/image";
import { Modal, Button, Title, Text, Center } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import btn_google_signin from "./../../public/btn_google_signin.png";
import Link from "next/link";

const URL =
  process.env.NEXT_PUBLIC_SIGN_IN_API ||
  "http://localhost:8080/api/v1/auth/google";

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
          Todo
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
                boxShadow: theme.shadows.xs,
              })}
            >
              <Image
                src={btn_google_signin}
                alt="Google SignIn Button"
                style={{ objectFit: "cover" }}
              />
            </Button>
          </form>
        </Center>
        <Text m="lg" fz="xs" sx={(theme) => ({ color: theme.colors.gray[6] })}>
          利用規約、
          <Link href="/privacy-policy">プライバシーポリシー</Link>
          に同意した上でログインしてください。
        </Text>
      </Modal>

      <a onClick={open}>{props.button}</a>
    </>
  );
};
