import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type User = {
  displayName: string;
  image: string;
};

export const useQueryUserData = () => {
  const getUserData = async () => {
    const response = await axios.get("http://localhost:8080/api/v1/user", {
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
