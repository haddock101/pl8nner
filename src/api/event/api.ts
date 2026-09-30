import { useGetEvent, useCreateEvent } from "./requests";

export const useEventApi = () => {
  const {
    getEvent,
    isLoading: getEventLoading,
    data: getEventData,
  } = useGetEvent();

  const {
    createEvent,
    isLoading: createEventLoading,
    data: createEventData,
  } = useCreateEvent();

  return {
    getEvent: {
      query: getEvent,
      isLoading: getEventLoading,
      data: getEventData,
    },
    createEvent: {
      mutation: createEvent,
      isLoading: createEventLoading,
      data: createEventData,
    },
  };
};
