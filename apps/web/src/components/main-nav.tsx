import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@mpesaflow/ui/button";
import Link from "next/link";

export default function MainNav() {
  return (
    <nav className="max-w-4xl justify-between border border-gray-200 w-full py-2 px-4 flex flex-row rounded-xl mx-auto mt-10 bg-white items-center">
      <h1 className="text-lg">MpesaFlow</h1>

      <div className="flex flex-row gap-3 ">
        <Link href={'https://docs.mpesaflow.com/'}>
          Docs
        </Link>
      </div>

      <div>
        <SignedOut>
          <Button>
            <SignInButton />
          </Button>
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
