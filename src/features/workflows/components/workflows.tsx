"use client"

import { EmptyView, EnitityPagination, EnityItem, EntityContainer, EntityHeader, EntityList, EntitySearch, ErrorView, LoadingView } from "@/components/entity-components";
import { useCreateWorkflow, useRemoveWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { useUpgradeModal } from "../hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/use-workflow-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { authClient } from "@/lib/auth-client";
import type { Workflow } from "@/generated/prisma/client";
import { WorkflowIcon } from "lucide-react";
import { formatDistanceToNow }from "date-fns"


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
        <EntityList
        items={workflows.data.items}
        getKey={(workflow) => workflow.id}
        renderItem={(workflow) => <WorkflowItem data={workflow}/>}
        emptyView={<WorkflowEmpty/>}
        ></EntityList>
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
            // onSuccess: (data) => {
            //     router.push(`/workflows/${data}`)
            // }
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


export const WorkflowLoading = () => {
    return<LoadingView message="Loading Workflows"></LoadingView>
}

export const WorkflowError = () => {
    return <ErrorView message="Error loading Workflow"></ErrorView>
}

export const WorkflowEmpty = () => {
    const createWorkflow = useCreateWorkflow();
    const {handleError, modal} = useUpgradeModal();

    const handleCreate = () => {
        createWorkflow.mutate(undefined, {
            onError: (error) => {
                handleError(error)
            },
        })
    }
    return (
        <>
            <EmptyView
                onNew={handleCreate}
                message="No workflow found. Get started by adding workflow"
            />
        </>
    )
};

export const WorkflowItem = ({
    data
}: {data: Workflow}) => {
    const  removeWorkflow = useRemoveWorkflow();
    const handleRemove = () => {
        removeWorkflow.mutate({id: data.id})
    }
    return (
        <EnityItem
        href={`/workflows/${data.id}`}
        title={data.name}
        subtitle={
            <>
                Updated {formatDistanceToNow(data.updatedAt, {addSuffix: true})}{" "}
                &bull; Created{" "}{formatDistanceToNow(data.createdAt, {addSuffix: true})}
            </>
        }
        image = {
            <div className="size-8 flex items-center justify-center">
                <WorkflowIcon className="size-5 text-muted-foreground"/>
            </div>
        }
        onRemove={handleRemove}
        isRemoving={removeWorkflow.isPending}
        />
    )
}