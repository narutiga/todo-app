import axios from "axios";
import useSWR from "swr";

type Todo = {
  id: string;
  title: string;
  isDone: boolean;
  dueDate: string;
};

const fetcher = (dueDate: string) =>
  axios
    .get(`http://localhost:8080/api/v1/todos?dueDate=${dueDate}`)
    .then((res) => res.data);

export const useFetchTodos = (dueDate: string) => {
  const { data: todos, error, isLoading } = useSWR<Todo[]>(dueDate, fetcher);

  return {
    todos,
    error,
    isLoading,
  };
};
