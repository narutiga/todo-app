import useSWRMutation from "swr/mutation";
import axios from "axios";

type Todo = {
  id?: string;
  title: string;
  dueDate: string;
  isDone?: boolean;
};

type TodoId = {
  id: string;
};

const todoCreateFetcher = async (url: string, { arg }: { arg: Todo }) => {
  const response = await axios.post(url, arg, {
    withCredentials: true,
  });
  return response.data;
};

export const useCreateTodo = () => {
  const { trigger: createTrigger, isMutating } = useSWRMutation(
    "http://localhost:8080/api/v1/todos",
    todoCreateFetcher
  );
  return {
    createTrigger,
    isMutating,
  };
};

const todoDeleteFetcher = async (url: string, { arg }: { arg: string }) => {
  const response = await axios.delete(`${url}/${arg}`, {
    withCredentials: true,
  });
  return response.data;
};

export const useDeleteTodo = () => {
  const { trigger: deleteTrigger, isMutating } = useSWRMutation(
    "http://localhost:8080/api/v1/todos",
    todoDeleteFetcher
  );
  return {
    deleteTrigger,
    isMutating,
  };
};

const todoUpdateFetcher = async (url: string, { arg }: { arg: Todo }) => {
  const response = await axios.put(`${url}/${arg.id}`, arg, {
    withCredentials: true,
  });
  return response.data;
};

export const useUpdateTodo = () => {
  const { trigger: updateTrigger, isMutating } = useSWRMutation(
    "http://localhost:8080/api/v1/todos",
    todoUpdateFetcher
  );
  return {
    updateTrigger,
    isMutating,
  };
};

const todoChangeDueDateFetcher = async (
  url: string,
  { arg }: { arg: Todo }
) => {
  const response = await axios.patch(
    `${url}/${arg.id}`,
    {
      dueDate: arg.dueDate,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const useChangeDueDateTodo = () => {
  const { trigger: changeDueDateTrigger, isMutating } = useSWRMutation(
    "http://localhost:8080/api/v1/todos",
    todoChangeDueDateFetcher
  );
  return {
    changeDueDateTrigger,
    isMutating,
  };
};
