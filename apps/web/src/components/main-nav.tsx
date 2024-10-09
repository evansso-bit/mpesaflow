import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@mpesaflow/ui/button";
import Link from "next/link";

export default function MainNav() {
  return (
    <nav className="max-w-4xl justify-between border border-gray-200 w-full py-3 px-4 flex flex-row rounded-xl">
      <h1 className="text-lg">MpesaFlow</h1>

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <Button>
            <Link href={'https://dashboard.mpesaflow.com/'}>
              Dashboard
            </Link>
          </Button>
        </SignedIn>
      </div>
    </nav>
  );
}
