"use client"

import {
    CreditCardIcon,
    FolderOpenIcon,
    HistoryIcon,
    KeyIcon,
    LogOutIcon,
    StarIcon
} from "lucide-react"

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { toast } from "sonner";
import { useHasActiveSubscription } from "./subscription/hooks/use-subscription";

const menuItems = [
    {
        title: "Home",
        items: [
            {
                title: "Workflows",
                icon: FolderOpenIcon,
                url: "/workflows"
            },
            {
                title: "Credentials",
                icon: KeyIcon,
                url: "/credentials"
            },
            {
                title: "Executions",
                icon: HistoryIcon,
                url: "/executions"
            }, 
        ]
    }
]

export const AppSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const {hasActiveSubscription, isLoading} = useHasActiveSubscription();


    return(
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenuItem>
                    <SidebarMenuButton className="gap-x-4 h-10 px-4">
                        <Link prefetch href="/" className="flex items-center  gap-2 w-full" >
                            < Image alt="logo" src="/logos/logo.svg" width={30} height={30}/>
                            <span className="font-semibold text-sm">Hermes</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarHeader>
            <SidebarContent>
                {menuItems.map((group)=> (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupContent >
                            <SidebarMenu className="gap-2">
                                {group.items.map((item) => (
                            <SidebarMenuItem  key={item.title}>
                                <SidebarMenuButton 
                                tooltip={item.title}
                                isActive={
                                    item.url === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(item.url)
                                }

                                className="gap-x-4 h-10 px-4"
                                >  <Link href={item.url} prefetch className="flex items-center gap-3 w-full">
                                        <item.icon className="size-4" />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                           ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu >
                    {!hasActiveSubscription && !isLoading && (
                        <SidebarMenuItem>
                        <SidebarMenuButton 
                        tooltip = "Upgrade to pro"
                        className="gap-x-4 h-10 px-4"
                        onClick={() => {
                            authClient.checkout({slug: "pro"})
                        }}
                        >
                        <StarIcon className="h-4 w-4"/>
                        <span >Upgrade to Pro</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    )}
                </SidebarMenu>
                <SidebarMenu>
                    <SidebarMenuButton 
                        tooltip = "Billing portal"
                        className="gap-x-4 h-10 px-4"
                        onClick={() => {
                            authClient.customer.portal();
                        }}
                        >
                            <CreditCardIcon className="h-4 w-4"/>
                            <span>Billing portal</span>
                    </SidebarMenuButton>
                    <SidebarMenuButton 
                        tooltip = "Logout"
                        className="gap-x-4 h-10 px-4"
                        onClick={() => {
                            authClient.signOut({
                                fetchOptions: {
                                    onSuccess: () => {
                                        router.push("/login");
                                        toast.success("Signout Successfully")
                                    }
                                }
                            })
                        }}
                        >
                        <LogOutIcon className="h-4 w-4"/>
                        <span >Logout</span>
                    </SidebarMenuButton>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}