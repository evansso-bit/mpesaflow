import { SignedIn, UserButton } from '@clerk/nextjs'


export default function MainNav() {
    return (
        <nav className='w-[350px] px-3 py-4 min-h-screen border-r border-border bg-background flex flex-col justify-between'>
            <div className='flex flex-row gap-4'>
                <h1>
                    MpesaFlow
                </h1>
            </div>

            <div>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    )
}