import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const URL = process.env.TODOS_API || "http://localhost:8080/api/v1/todos/";

type Todo = {
  id: string;
  title: string;
  isDone: boolean;
  dueDate: string;
};

export const useQueryTodos = (dueDate: string) => {
  const getTodos = async () => {
    const response = await axios.get(URL + `?dueDate=${dueDate}`, {
      withCredentials: true,
    });
    if (!response.data) {
      throw new Error("No data found");
    } else {
      return response.data;
    }
  };
  return useQuery<Todo[], Error>({
    queryKey: [`${dueDate}todos`],
    queryFn: getTodos,
    staleTime: Infinity,
  });
};
