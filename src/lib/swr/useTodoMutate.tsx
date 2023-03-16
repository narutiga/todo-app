import axios from "axios";
import { Arguments } from "swr";
import useSWRMutation from "swr/mutation";

type Args = {
  arg: {
    pass: string;
    data: { title: string; dueDate: string; isDone: boolean };
  };
};

type Todo = {
  id: string;
  title: string;
  isDone: boolean;
  dueDate: string;
};

type Arg = {
  arg: Arguments;
};

const createTodo = async (
  url: string,
  { arg }: { arg: Omit<Todo, "id" | "isDone"> }
) => {
  return axios.post(url, arg).then((res) => res.data);
};

export const useTodoCreate = () => {
  const {
    trigger: createTrigger,
    isMutating: isCreating,
    data: createData,
    error: createError,
  } = useSWRMutation("http://localhost:8080/api/v1/todos", createTodo);

  return {
    createTrigger,
    isCreating,
    createData,
    createError,
  };
};

const updateTodo = async (url: string, arg: Args) => {
  return axios
    .put(`${url}/${arg.arg.pass}`, arg.arg.data)
    .then((res) => res.data);
};

export const useTodoUpdate = () => {
  const {
    trigger: updateTrigger,
    isMutating: isUpdating,
    data: updateData,
    error: updateError,
  } = useSWRMutation("http://localhost:8080/api/v1/todos", updateTodo);

  return {
    updateTrigger,
    isUpdating,
    updateData,
    updateError,
  };
};

const deleteTodo = async (url: string, { arg }: Arg) => {
  const todoId: string | undefined = ((arg: Arguments) => {
    if (typeof arg !== "string") {
      return undefined;
    }
    return arg;
  })(arg);
  return axios.delete(`${url}/${todoId}`).then((res) => res.data);
};

export const useTodoDelete = () => {
  const {
    trigger: deleteTrigger,
    isMutating: isDeleting,
    data: deleteData,
    error: deleteError,
  } = useSWRMutation("http://localhost:8080/api/v1/todos", deleteTodo);

  return {
    deleteTrigger,
    isDeleting,
    deleteData,
    deleteError,
  };
};
