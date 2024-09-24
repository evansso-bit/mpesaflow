import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@mpesaflow/ui/button";

export default function MainNav() {
  return (
    <nav className="max-w-5xl w-full py-3 px-4 flex">
      <div>MpesaFlow</div>

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
