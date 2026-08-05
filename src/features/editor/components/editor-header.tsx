"use client"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { SaveIcon } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";
import { useSuspenseWorkflow, useUpdateWorkflowName } from "@/features/workflows/hooks/use-workflows";

export const EditorSaveButton = ({workflowId}: {workflowId: string}) => {
    return(
        <div className="ml -auto">
            <Button size="sm" onClick={() => {}} disabled={false}>
                <SaveIcon className="size-4"/>
                Save
            </Button>
        </div>
    )
}

export const EditorBreadCrumbs = ({workflowId}: {workflowId: string}) => {
    return(
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink render={<Link prefetch href="/workflows"></Link>}>Workflows</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator/>
                <EditorNameInput workflowId={workflowId}/>
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export const EditorNameInput = ({ workflowId}: {workflowId: string}) => {
    const {data: workflow} = useSuspenseWorkflow(workflowId);
    const updateWorkflow = useUpdateWorkflowName();
    const[isEditing, setIsEditing] = useState(false);
    const [name, setName ] = useState(workflow.name);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=> {
        if(workflow.name){
            setName(workflow.name);
        }
    },[workflow.name]);

    useEffect(()=> {
        if(isEditing && inputRef.current){
            inputRef.current.focus();
            inputRef.current.select();

        }
    }, [isEditing]);

    const handleSave = async() => {
        if(name === workflow.name){
            setIsEditing(false);
            return;
        }
        
        try{
            await updateWorkflow.mutateAsync({
                id: workflowId,
                name
            })
        } catch{
            setName(workflow.name);
        } finally{
            setIsEditing(false);
        }
        };
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if(e.key === "Enter"){
            handleSave();
        }
        if(e.key === "Escape"){
            setIsEditing(false);
        }
    };

    if(isEditing){
        return (
            <Input
            disabled={updateWorkflow.isPending}
            ref={inputRef}
            value={name}
            onChange={(e)=> setName(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="h-7 w-auto min-w-25 px-2"
            >
            </Input>
        )
    }

    return (
        <BreadcrumbItem onClick={() => setIsEditing(true)}className="cursor-pointer hover:text-foreground transition-colors">
            {workflow.name}
        </BreadcrumbItem>
    )
}

export  const EditorHeader = ({workflowId}: {workflowId: string}) => {
    return(
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4 bg-background ">
            <SidebarTrigger/>
            <div className="flex flex-row items-center justify-between gap-x-4 w-full">
                <EditorBreadCrumbs workflowId={workflowId}/>
                <EditorSaveButton workflowId={workflowId}/>

            </div>
        </header>
    )
} 