import {
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { ALL_PERSONS, FIND_PERSON } from "../graphql/persons/queries";
import { CREATE_PERSON, EDIT_NUMBER } from "../graphql/persons/mutations";
import { useEffect } from "react";
import { PERSON_ADDED } from "../graphql/persons/subscriptions";

export const usePersons = () => {
  const result = useQuery(ALL_PERSONS);

  return result;
};
export const useCreatePerson = (notifyError) => {
  const [createPerson] = useMutation(CREATE_PERSON, {
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message);
    },
  });
  return { createPerson };
};
export const useFindPerson = () => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON);
  return { getPerson, result };
};
export const useEditNumber = (notifyError) => {
  const [editNumber, result] = useMutation(EDIT_NUMBER, {
    //refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      console.log(result, "Person not found");
      notifyError("Person not found");
    }
  }, [result]);

  return { editNumber };
};
export const useAddedPersonSub = () => {
  const client = useApolloClient();

  useSubscription(PERSON_ADDED, {
    onData: (subscriptionData) => {
      console.log(subscriptionData);

      const { personAdded } = subscriptionData.data.data;

      const dataInStore = client.readQuery({ query: ALL_PERSONS });
      client.writeQuery({
        query: ALL_PERSONS,
        data: {
          ...dataInStore,
          allPersons: [...dataInStore.allPersons, personAdded],
        },
      });
    },
  });
};
