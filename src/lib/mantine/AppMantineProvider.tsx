import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { FC, ReactNode } from "react";

const todoTheme: MantineThemeOverride = {};

/** @package */
export const AppMantineProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={todoTheme}>
      {children}
    </MantineProvider>
  );
};
