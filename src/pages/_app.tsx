import { AppMantineProvider } from "@/lib/mantine/AppMantineProvider";
import "@/styles/globals.css";
import type { AppProps, CustomAppPage } from "next/app";

const App: CustomAppPage = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page;
    });

  return (
    <AppMantineProvider>
      {getLayout(<Component {...pageProps} />)}
    </AppMantineProvider>
  );
};

export default App;
