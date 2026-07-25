"use client"

import { TRPCProvider, useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";

export const Client = () => {
    const trpc = useTRPC();
    const {data: users} = useSuspenseQuery(trpc.getUsers.queryOptions());
    return(
        <div>
            Client components : {JSON.stringify(users)}
        </div>
    )
}