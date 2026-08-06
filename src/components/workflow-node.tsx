"use client"

import { NodeToolbar, Position } from "@xyflow/react";
import { SettingsIcon, TrashIcon } from "lucide-react";
import type { ReactNode } from "react";
import {Button } from "./ui/button";

interface WorkflowNodeProps {
    children: ReactNode;
    showToolbar?: boolean;
    onDelete?: ()=> void;
    onSetting?: ()=> void;
    name?: string;
    description?: string;

};

export function WorkflowNode({
    children,
    showToolbar = true,
    onDelete,
    onSetting,
    name,
    description
}: WorkflowNodeProps) {
    return(
    <>
        {showToolbar && (
            <NodeToolbar>
                <Button size="sm" variant="ghost" onClick={onSetting}>
                    <SettingsIcon className="size-4"/>
                </Button>
                <Button size="sm" variant="ghost" onClick={onDelete}>
                    <TrashIcon/>
                </Button>
            </NodeToolbar>
        )}
        {children}
        <NodeToolbar
        position={Position.Bottom}
        isVisible
        className="max-w-25 text-center" 
        >
            <p className="font-medium">
                {name}
            </p>
            {description && (
                <p className="text-muted-foreground truncate text-sm">
                    {description}
                </p>
            )}
        </NodeToolbar>
    </>
    )
}

