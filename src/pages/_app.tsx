import { AppMantineProvider } from "@/lib/mantine/AppMantineProvider";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { CustomAppPage } from "next/app";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App: CustomAppPage = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page;
    });

  return (
    <QueryClientProvider client={queryClient}>
      <AppMantineProvider>
        {getLayout(<Component {...pageProps} />)}
      </AppMantineProvider>
    </QueryClientProvider>
  );
};

export default App;
