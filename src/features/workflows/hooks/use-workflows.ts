// In this we are fetching all the workflows using suspense.

import { useTRPC } from "@/trpc/client"
import { QueryClientContext, useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useWorkflowsParams } from "./use-workflow-params";
import { DatabaseArrowDown } from "lucide-react";

export const useSuspenseWorkflows = () => {
    const trpc = useTRPC();
    const [params] = useWorkflowsParams();
    return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params,));
};

export const useCreateWorkflow = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const trpc = useTRPC();

    return useMutation(
        trpc.workflows.create.mutationOptions({
            onSuccess: (data) => {
                toast.success(`Workflow "${data.name}" created`);
                console.log(`data is ${data.id}`);
                router.push(`/workflows/${data.id}`);
                queryClient.invalidateQueries(
                    trpc.workflows.getMany.queryOptions({})
                );
            },
            onError: (error) => {
                toast.error(`Failed to create workflow: ${error.message}`);
            },
        })
    )
};

    //create hook to remove workflow
export const useRemoveWorkflow = () => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    return useMutation(
        trpc.workflows.delete.mutationOptions({
            onSuccess: async(data) =>{
                toast.success(`Workflow ${data.name} removed.`);
                await queryClient.invalidateQueries(
                trpc.workflows.pathFilter())
            }
        })
    )
} 

export const useUpdateWorkflowName = () => {
    const trpc  = useTRPC();
    const queryClient = useQueryClient();
    return useMutation(
        trpc.workflows.updateName.mutationOptions({
            onSuccess: async(data) => {
                toast.success(`Workflow updated to ${data.name}`);
                queryClient.invalidateQueries({});
                queryClient.invalidateQueries(
                    trpc.workflows.getOne.queryOptions({ id: data.id }),
                );
            },
            onError: (error) => {
                toast.error(`Failed to update Workflow: ${error.message}`);
            }
        })
    )
}

// Hooks to fetch single workflow using suspense
export const useSuspenseWorkflow = (id: string) => {
    const trpc = useTRPC();
    return useSuspenseQuery(trpc.workflows.getOne.queryOptions({id}));
};
