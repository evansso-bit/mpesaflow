import { cn } from "@mpesaflow/ui/cn";
import Image from "next/image";
import logo from "./logo.png";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <Image
        src={logo}
        alt="MpesaFlow Logo"
        width={200}
        height={100}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
