import { QueryClient } from "@tanstack/react-query";
import { retryDelay, retryTransient } from "@/lib/retry";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      // Queries are GETs, so retrying is always safe. The predicate retries only
      // transient failures — a cold-starting backend, or a 5xx — and gives up
      // immediately on a 4xx, which the previous flat `retry: 1` did not.
      retry: retryTransient,
      retryDelay,
      refetchOnWindowFocus: false,
    },
    mutations: {
      // Deliberately never retry by default: createMeeting, uploadDocument and
      // createOrganization are not idempotent, so retrying after a lost response
      // would duplicate the resource. Opt in per mutation where it is safe.
      retry: 0,
    },
  },
});

export default queryClient;
