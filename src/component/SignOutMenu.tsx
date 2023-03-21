import { FC, ReactNode, useState } from "react";
import { Button, Menu } from "@mantine/core";
import { IconDoorExit } from "@tabler/icons-react";

type Props = {
  avatar: ReactNode;
};

/** @package */
export const SignOutMenu: FC<Props> = (props) => {
  return (
    <Menu>
      <Menu.Target>{props.avatar}</Menu.Target>
      <Menu.Dropdown>
        <form
          method="post"
          action="http://localhost:8080/api/v1/auth/google/logout"
        >
          <Menu.Item icon={<IconDoorExit color="gray" />} type="submit">
            ログアウト
          </Menu.Item>
        </form>
      </Menu.Dropdown>
    </Menu>
  );
};
