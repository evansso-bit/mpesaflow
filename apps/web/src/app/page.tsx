
import { Button } from "@mpesaflow/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-start justify-center text-center gap-4 py-10">
      <h1 className="font-cal text-4xl md:text-6xl">Seamless M-Pesa Integration for Businesses and Developers</h1>
      <p className="mx-auto max-w-md text-lg text-muted-foreground md:max-w-xl md:text-xl">
        Simplify payments, boost efficiency, and accelerate growth with MpesaFlow's powerful API
      </p>
      <Button className="mx-auto">
        <Link href={'https://dashboard.com/sign-in'}>
          Get Started for free
        </Link>
      </Button>
    </div>
  )
}