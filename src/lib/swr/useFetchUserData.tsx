import useSWR from "swr";
import axios from "axios";

type User = {
  displayName: string;
  image: string;
};

const fetcher = async (url: string) => {
  const response = await axios.get(url, {
    withCredentials: true,
  });
  return response.data;
};

export const useFetchUserData = () => {
  const {
    data: user,
    error,
    isLoading,
  } = useSWR<User>("http://localhost:8080/api/v1/user", fetcher, {});

  return {
    user,
  };
};
