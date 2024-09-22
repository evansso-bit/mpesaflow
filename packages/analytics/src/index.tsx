
'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import { posthog } from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react';



if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: '/ingest',
        ui_host: 'https://us.posthog.com',
    });
}

export function PHProvider({ children }: { children: React.ReactNode }) {
    return (
        <PostHogProvider client={posthog}>
            <PosthogAuthWrapper>{children}</PosthogAuthWrapper>
        </PostHogProvider>
    );
}

function PosthogAuthWrapper({ children }: { children: React.ReactNode }) {
    const auth = useAuth();
    const userInfo = useUser();

    useEffect(() => {
        if (userInfo.user) {
            posthog.identify(userInfo.user.id, {
                name: userInfo.user.fullName,
                email: userInfo.user.emailAddresses[0]?.emailAddress,
            });
        } else if (!auth.isSignedIn) {
            posthog.reset();
        }
    }, [auth, userInfo]);

    return children;
}