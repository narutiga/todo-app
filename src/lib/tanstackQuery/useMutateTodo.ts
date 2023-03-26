import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const URL = process.env.TODOS_API || "http://localhost:8080/api/v1/todos/";

type Todo = {
  id: string;
  title: string;
  dueDate: string;
  isDone: boolean;
};

type ChangeDueDateTodo = {
  id: string;
  title: string;
  isDone: boolean;
  dueDate: string;
  newDueDate: string;
};

export const useMutateTodo = () => {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: async (newTodo: Todo) => {
      const response = await axios.post(URL, newTodo, {
        withCredentials: true,
      });
      return response.data;
    },
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({
        queryKey: [`${newTodo.dueDate}todos`],
      });
      const previousTodos = queryClient.getQueryData([
        `${newTodo.dueDate}todos`,
      ]);
      queryClient.setQueryData([`${newTodo.dueDate}todos`], (old: any) => [
        ...old,
        newTodo,
      ]);
      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      if (context === undefined) return;
      queryClient.setQueryData(
        [`${newTodo.dueDate}todos`],
        context.previousTodos
      );
    },
    // onSettled: (newTodo) => {
    //   queryClient.invalidateQueries({ queryKey: [`${newTodo.dueDate}todos`] });
    // },
  });

  const updateTodoMutation = useMutation({
    mutationFn: async (updatedTodo: Todo) => {
      const response = await axios.put(URL + updatedTodo.id, updatedTodo, {
        withCredentials: true,
      });
      return response.data;
    },
    onMutate: async (updatedTodo: Todo) => {
      await queryClient.cancelQueries({
        queryKey: [`${updatedTodo.dueDate}todos`],
      });
      const previousTodos = queryClient.getQueryData([
        `${updatedTodo.dueDate}todos`,
      ]);
      queryClient.setQueryData([`${updatedTodo.dueDate}todos`], (old: any) => {
        return old.map((todo: any) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        );
      });
      return { previousTodos };
    },
    onError: (err, updatedTodo, context) => {
      if (context === undefined) return;
      queryClient.setQueryData(
        [`${updatedTodo.dueDate}todos`],
        context.previousTodos
      );
    },
    // onSettled: (updatedTodo) => {
    //   queryClient.invalidateQueries({
    //     queryKey: [`${updatedTodo.dueDate}todos`],
    //   });
    // },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: async (deletedTodo: Todo) => {
      const response = await axios.delete(URL + deletedTodo.id, {
        withCredentials: true,
      });
      return response.data;
    },
    onMutate: async (deletedTodo) => {
      await queryClient.cancelQueries({
        queryKey: [`${deletedTodo.dueDate}todos`],
      });
      const previousTodos = queryClient.getQueryData([
        `${deletedTodo.dueDate}todos`,
      ]);
      queryClient.setQueryData([`${deletedTodo.dueDate}todos`], (old: any) => {
        return old.filter((todo: any) => todo.id !== deletedTodo.id);
      });
      return { previousTodos };
    },
    onError: (err, deletedTodo, context) => {
      if (context === undefined) return;
      queryClient.setQueryData(
        [`${deletedTodo.dueDate}todos`],
        context.previousTodos
      );
    },
    // onSettled: (deletedTodo) => {
    //   queryClient.invalidateQueries({
    //     queryKey: [`${deletedTodo.dueDate}todos`],
    //   });
    // },
  });

  const changeDueDateMutation = useMutation({
    mutationFn: async (todo: ChangeDueDateTodo) => {
      const response = await axios.patch(
        URL + todo.id,
        { dueDate: todo.newDueDate },
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onMutate: async (todo) => {
      await queryClient.cancelQueries({
        queryKey: [`${todo.dueDate}todos`],
      });
      await queryClient.cancelQueries({
        queryKey: [`${todo.newDueDate}todos`],
      });
      const prevDueDateTodos = queryClient.getQueryData([
        `${todo.newDueDate}todos`,
      ]);
      const newDueDateTodos = queryClient.getQueryData([
        `${todo.newDueDate}todos`,
      ]);
      queryClient.setQueryData([`${todo.dueDate}todos`], (old: any) => {
        return old.filter((oldTodo: Todo) => oldTodo.id !== todo.id);
      });
      queryClient.setQueryData([`${todo.newDueDate}todos`], (old: any) => {
        return [...old, { ...todo, dueDate: todo.newDueDate }];
      });
      return { prevDueDateTodos, newDueDateTodos };
    },
    onError: (err, todo, context) => {
      if (context === undefined) return;
      queryClient.setQueryData(
        [`${todo.dueDate}todos`],
        context.prevDueDateTodos
      );
      queryClient.setQueryData(
        [`${todo.newDueDate}todos`],
        context.newDueDateTodos
      );
    },
    // onSettled: (todo) => {
    //   queryClient.invalidateQueries({ queryKey: [`${todo.dueDate}todos`] });
    //   queryClient.invalidateQueries({ queryKey: [`${todo.newDueDate}todos`] });
    // },
  });

  return {
    createTodoMutation,
    updateTodoMutation,
    deleteTodoMutation,
    changeDueDateMutation,
  };
};
