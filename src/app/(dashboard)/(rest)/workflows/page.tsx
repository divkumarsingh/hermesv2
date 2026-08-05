import { WorkflowError, WorkflowList, WorkflowLoading, WorkflowsContainer } from "@/features/workflows/components/workflows";
import { workflowsParamsLoader } from "@/features/workflows/server/params-loader";
import { prefetchWorkflows } from "@/features/workflows/server/prefetch";
import { requireAuth } from "@/lib/auth-utils";
import { HydrateClient } from "@/trpc/server";
import { SearchParams } from "nuqs";
import { Suspense } from "react";
import {ErrorBoundary} from "react-error-boundary"

type Props = {
    searchParms: Promise<SearchParams>;
}

const Page = async({searchParms}: Props) => {
    await requireAuth();
    const params = await workflowsParamsLoader(searchParms);
    prefetchWorkflows(params);

    return(
        <WorkflowsContainer>
            <HydrateClient>
                <ErrorBoundary fallback={<WorkflowError/>}>
                    <Suspense fallback={<WorkflowLoading/>}>
                        <WorkflowList/>
                    </Suspense>
                </ErrorBoundary>
            </HydrateClient>
        </WorkflowsContainer>
    )
}

export default Page;