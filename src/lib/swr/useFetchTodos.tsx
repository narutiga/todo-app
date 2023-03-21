import useSWRImmutable from "swr";
import axios from "axios";

type Todo = {
  id: string;
  title: string;
  isDone: boolean;
  dueDate: string;
};

const fetcher = async (dueDate: string) => {
  const response = await axios.get(
    `http://localhost:8080/api/v1/todos/?dueDate=${dueDate}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const useFetchTodos = (dueDate: string) => {
  const {
    data: todos,
    mutate,
    error,
    isLoading,
  } = useSWRImmutable<Todo[]>(dueDate, fetcher, {});

  return {
    todos,
    mutate,
    error,
    isLoading,
  };
};
