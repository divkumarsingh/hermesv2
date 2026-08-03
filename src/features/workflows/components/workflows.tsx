"use client"

import { EnitityPagination, EntityContainer, EntityHeader, EntitySearch } from "@/components/entity-components";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { useUpgradeModal } from "../hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/use-workflow-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { authClient } from "@/lib/auth-client";


export const WorkflowSearch = () => {
    const [params, setParams] = useWorkflowsParams();
    const {searchValue, onSearchChange} = useEntitySearch({
        params,
        setParams
    });
    
    return (
        <EntitySearch
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Search workflows"
    />
    );
};



export const WorkflowList = () => {
    const workflows = useSuspenseWorkflows();
    return(
        <div className="flex-1 flex justify-center items-center">
            <p>
                {JSON.stringify(workflows.data, null, 2)}
            </p>
        </div>
    )
}

export const WorkflowsHeader = ({disabled}: {disabled?: boolean}) => {
    const createWorkflow = useCreateWorkflow();
    const {handleError, modal} = useUpgradeModal();
    const router = useRouter()

    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onError: (error)=> {
                handleError(error)
                console.log(error);
            },
            onSuccess: (data) => {
                router.push(`/workflows/${data}`)
            }
        });
    } 
    return (
        <>
        {modal}
        <EntityHeader
            title="Workflows"
            description="Create and manage your workflows"
            onNew={handleCreate}
            newButtonLabel="New Workflow"
            disabled={disabled}
            isCreating={createWorkflow.isPending}
        >
        </EntityHeader>
        </>
    )
}

export const WorkflowPagination = ({
    
}) => {
    const workflows = useSuspenseWorkflows();
    const [params, setParams] = useWorkflowsParams();
    
    return (
        <EnitityPagination 
        disabled={workflows.isFetching}
        totalPages={workflows.data.totalPages}
        page={workflows.data.page}
        onPageChange={(page) => setParams({...params, page})}
        />
    )
    

}




export const WorkflowsContainer = ({
    children
}: {children: React.ReactNode}) => {
    const { isPending, data: session } = authClient.useSession()
    if (isPending) {
        return <div>Loading...</div>;
    }
    if (!session) {
    return <div>Please sign in to view this page.</div>;
    }
    return(
        <EntityContainer
            header={<WorkflowsHeader/>}
            search={<WorkflowSearch/>}
            pagination={<WorkflowPagination/>}
        >
            {children}
        </EntityContainer>
    )
}
