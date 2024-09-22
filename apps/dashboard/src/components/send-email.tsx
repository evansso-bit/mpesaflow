"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redis } from "@mpesaflow/kv";
import { Resend } from "resend";
import { toast } from "sonner";
import { StripeWelcomeEmail } from "../emails/welcome";

export async function sendWelcomeEmail() {
  try {
    const user = await currentUser();
    if (!user) {
      toast.error("User not found.");
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const primaryEmail = user.emailAddresses[0]?.emailAddress;

    if (!primaryEmail) {
      toast.error("Primary email not found.");
      return Response.json({ error: "Primary email not found" }, { status: 400 });
    }

    const isAlreadySent = await redis.sismember("welcome-emails", primaryEmail);

    if (isAlreadySent) {
      toast.info("Welcome email already sent.");
      return Response.json({ message: "Welcome email already sent" }, { status: 200 });
    }

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: primaryEmail,
      subject: "Welcome to MpesaFlow",
      react: StripeWelcomeEmail(),
    });

    if (error) {
      toast.error("Failed to send welcome email. Please try again later.");
      return Response.json({ error }, { status: 500 });
    }

    await redis.sadd("welcome-emails", primaryEmail);
    toast.success("Welcome email sent successfully!");
    return Response.json({ data }, { status: 200 });

  } catch (error) {
    console.error("Error sending welcome email:", error);
    toast.error("An unexpected error occurred. Please try again later.");
    return Response.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
