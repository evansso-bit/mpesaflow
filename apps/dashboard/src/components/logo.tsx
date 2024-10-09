import { cn } from "@mpesaflow/ui/cn";
import Image from "next/image";
import logo from "./logo.png";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <h1 className="text-sm flex flex-col gap-0.5 items-left">
        <span>
          Mpesa
        </span>
        <span>
          Flow
        </span>
      </h1>
    </div>
  );
}
