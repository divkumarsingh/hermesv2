"use client"
import { authClient } from "@/lib/auth-client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface UpgradeModelProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const UpgradeModal = ({
    open,
    onOpenChange
}: UpgradeModelProps) => {
    return(
        <AlertDialog open={open ?? false } onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Upgrade to pro</AlertDialogTitle>
                        <AlertDialogDescription>
                            You need an active subscription to perform 
                            this action,
                            Upgrade to Pro to Unlock all features.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={()=> authClient.checkout({slug: "pro"})}> 
                            Upgrade now
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogContent>
        </AlertDialog>
    );
}