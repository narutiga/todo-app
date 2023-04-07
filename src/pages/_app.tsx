import { Dispatch, SetStateAction, createContext, useState } from "react";
import type { CustomAppPage } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppMantineProvider } from "@/lib/mantine/AppMantineProvider";
import { Todo } from "@/lib/tanstackQuery/useQueryTodos";
import "@/styles/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const TODO: Todo = {
  id: "",
  title: "",
  isDone: false,
  dueDate: "today",
};

export const TodoContext = createContext<{
  editingTodo: Todo;
  setEditingTodo: Dispatch<SetStateAction<Todo>>;
}>({
  editingTodo: TODO,
  setEditingTodo: () => {
    throw Error("setEditingTodo is not defined.");
  },
});

const App: CustomAppPage = ({ Component, pageProps }) => {
  const [editingTodo, setEditingTodo] = useState(TODO);
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page;
    });

  return (
    <TodoContext.Provider value={{ editingTodo, setEditingTodo }}>
      <QueryClientProvider client={queryClient}>
        <AppMantineProvider>
          {getLayout(<Component {...pageProps} />)}
        </AppMantineProvider>
      </QueryClientProvider>
    </TodoContext.Provider>
  );
};

export default App;
