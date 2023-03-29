import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const URL = process.env.USER_API || "http://localhost:8080/api/v1/user";

type User = {
  displayName: string;
  image: string;
};

export const useQueryUserData = () => {
  const getUserData = async () => {
    const response = await axios.get(URL, {
      withCredentials: true,
    });
    if (!response.data) {
      return null;
    } else {
      return response.data;
    }
  };
  return useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: getUserData,
    staleTime: Infinity,
  });
};
