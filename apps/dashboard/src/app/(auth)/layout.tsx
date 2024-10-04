import { ClerkProvider } from "@clerk/nextjs";
import "@mpesaflow/ui/globals.css";

export default function AuthLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
