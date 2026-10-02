// requests.ts

import { CreateEventInput, GetEventInput, Event } from "./types"


export const useGetEvent = () => {
 // adding <Event> after useFetch will give the "data" value the type Event.
 // This really helps to flesh out the quality of life for the API and is part
 // of creating something that is self documenting. We put Event because we know
 // that is what this endpoint will always return.
  const { commonFetch, isLoading, data } = useFetch<Event>({
    url: "http://localhost:3000/api/Events/get",
  });

  // using typescript to define the input here means no mistakes can be
  // made downstream when actually using our API layer
  const getEvent = (input: GetEventInput) => commonFetch({ input, method: "GET" });

  return { getEvent, isLoading, data };
};

export const useCreateEvent = () => {
  const { commonFetch, isLoading, data } = useFetch<Event>({
    url: "http://192.168.1.11:3000/api/Events/create",
  });

  const createEvent = (input: CreateEventInput ) => commonFetch({ input, method: "POST" });

  return { createEvent, isLoading, data };
};
