import { useEffect } from "react";
import { LOGIN } from "../graphql/users/mutations";
import { useMutation } from "@apollo/client";

export const useLogin = (notifyError, setToken) => {
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const { value: token } = result.data.login;
      setToken(token);
      localStorage.setItem("token", token);
    }
  }, [result.data]);

  return [login];
};
