"use client"

import { createId } from "@paralleldrive/cuid2";
import { useReactFlow } from "@xyflow/react";
import { GlobeIcon, MousePointer2Icon } from "lucide-react";
import React, { useCallback } from "react";
import {toast} from "sonner";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { NodeType } from "@/generated/prisma/enums";

export type NodeTypeOptions = {
    type: NodeType;
    label: string;
    description: string;
    icon: React.ComponentType<{className?: string}> | string;
};

const triggerNodes: NodeTypeOptions[] = [
    {
        type: NodeType.MANUAL_TRIGGER,
        label: "Trigger manually",
        description: "Runs the flow on clicking a button. Good for getting started quickly.",
        icon: MousePointer2Icon
    }
]

const executionNodes: NodeTypeOptions[] = [
    {
        type: NodeType.HTTP_REQUEST,
        label: "HTTP Request",
        description: "Makes an HTTP request",
        icon: GlobeIcon
    },
];

interface NodeSelectorProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode
}

export function NodeSelector({
    open,
    onOpenChange,
    children
}: NodeSelectorProps) {
    return(
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger render={children}></SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">

                <SheetHeader>
                <SheetTitle>
                    What trigger this workflow
                </SheetTitle>
                <SheetDescription>
                    A trigger is a setup that starts your workflow.
                </SheetDescription>
                </SheetHeader>
                <div>
                    {triggerNodes.map((NodeType) => {
                        const Icon = NodeType.icon;

                        return(
                            <div
                            key={NodeType.type}
                            className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer 
                            border-l-2 border-transparent hover:border-l-primary"
                            onClick={() => {}}
                            >
                                <div className="flex items-center gap-6 w-full overflow-hidden">
                                    {typeof Icon === "string" ? (
                                        <img
                                        src={Icon}
                                        alt={NodeType.label}
                                        className="size-5 object-contain rounded-sm"
                                        >
                                        </img>
                                    ):(
                                        <Icon className="size-5"/>
                                    )}
                                    <div className="flex flex-col items-start text-left">
                                        <span className="font-medium text-sm">
                                            {NodeType.label}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {NodeType.description}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Separator/>
                <div>
                    {executionNodes.map((NodeType) => {
                        const Icon = NodeType.icon;

                        return(
                            <div
                            key={NodeType.type}
                            className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer 
                            border-l-2 border-transparent hover:border-l-primary"
                            onClick={() => {}}
                            >
                                <div className="flex items-center gap-6 w-full overflow-hidden">
                                    {typeof Icon === "string" ? (
                                        <img
                                        src={Icon}
                                        alt={NodeType.label}
                                        className="size-5 object-contain rounded-sm"
                                        >
                                        </img>
                                    ):(
                                        <Icon className="size-5"/>
                                    )}
                                    <div className="flex flex-col items-start text-left">
                                        <span className="font-medium text-sm">
                                            {NodeType.label}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {NodeType.description}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </SheetContent>

        </Sheet>
    )
};