"use client"


import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { requireAuth } from "@/lib/auth-utils";
import { useTRPC } from "@/trpc/client";
import { caller } from "@/trpc/server";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export default  function Home() {

  // requireAuth();
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const data = useQuery(trpc.getWorkflows.queryOptions());

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess: () => {
      toast.success("Job queued");
      queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
    }
  }));
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center ">
      <div>
        {JSON.stringify(data.data, null, 2)}
      </div>
      <Button disabled={create.isPending} onClick={()=> create.mutate() }>Create Workflow</Button>
    </div>
  );
}
