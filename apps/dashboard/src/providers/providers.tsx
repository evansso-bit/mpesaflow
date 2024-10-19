'use client'

import { useAuth } from "@clerk/clerk-react";
import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider } from "@mpesaflow/ui/sidebar"
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import type { PropsWithChildren } from "react";
import { AppWrapper } from "../components/app-wrapper";
import AppSidebar from "../components/navigation/app-sidebar";


const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);


export function Providers({ children }: PropsWithChildren) {
    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                <SidebarProvider>
                    <AppSidebar />
                    <AppWrapper>
                        {children}
                    </AppWrapper>
                </SidebarProvider>
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}