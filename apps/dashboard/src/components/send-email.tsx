"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redis } from "@mpesaflow/kv";
import { Resend } from "resend";
import { toast } from "sonner";
import { StripeWelcomeEmail } from "../emails/welcome";

export async function sendWelcomeEmail() {
  const user = await currentUser();
  const resend = new Resend(process.env.RESEND_API_KEY);

  const primaryEmail = user?.primaryEmailAddress?.emailAddress;
  const isAlreadySent = await redis.sismember("welcome-emails", primaryEmail);

  if (user) {
    if (!isAlreadySent) {
      try {
        const { data, error } = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: `${primaryEmail}`,
          subject: "Welcome to MpesaFlow",
          react: StripeWelcomeEmail(),
        });

        if (error) {
          toast.error("Something went wrong. Please try again later.");
          return Response.json({ error }, { status: 500 });
        }

        if (data) {
          await redis.sadd("welcome-emails", primaryEmail);
          toast.success("Welcome email sent successfully!");
          return Response.json({ data }, { status: 200 });
        }
      } catch (error) {
        return Response.json({ error }, { status: 500 });
      }
    }
  }
}
