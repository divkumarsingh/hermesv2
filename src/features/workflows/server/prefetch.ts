import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, HydrateClient, trpc } from "@/trpc/server";

type Input = inferInput<typeof trpc.workflows.getMany>;

// prefetch all workflows

export const prefetchWorkflows = (params: Input) => {
    return prefetch(trpc.workflows.getMany.queryOptions(params))
};

//prefetch a single workflow
export const prefetchWorkflow = (workflowId: string) => {
    return prefetch(trpc.workflows.getOne.queryOptions({ id:workflowId }))
}

