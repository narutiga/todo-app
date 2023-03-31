import { FC, ReactNode } from "react";
import { Menu } from "@mantine/core";
import { IconDoorExit } from "@tabler/icons-react";

const URL =
  process.env.NEXT_PUBLIC_SIGN_OUT_API ||
  "http://localhost:8080/api/v1/auth/google/logout";

type Props = {
  avatar: ReactNode;
};

/** @package */
export const SignOutMenu: FC<Props> = (props) => {
  return (
    <Menu>
      <Menu.Target>{props.avatar}</Menu.Target>
      <Menu.Dropdown>
        <form method="post" action={URL}>
          <Menu.Item icon={<IconDoorExit color="gray" />} type="submit">
            ログアウト
          </Menu.Item>
        </form>
      </Menu.Dropdown>
    </Menu>
  );
};
