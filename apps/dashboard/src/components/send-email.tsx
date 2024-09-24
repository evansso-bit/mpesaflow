// Add this import at the top of your file
import { headers } from "next/headers";

// Add this export to make the route dynamic
export const dynamic = "force-dynamic";

import { currentUser } from "@clerk/nextjs/server";
import { redis } from "@mpesaflow/kv";
import { Resend } from "resend";
import { StripeWelcomeEmail } from "../emails/welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail() {
  // Force headers to be used, making the function dynamic
  headers();

  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("User not found");
    }

    const primaryEmail = user.emailAddresses[0]?.emailAddress;
    if (!primaryEmail) {
      throw new Error("User email not found");
    }

    const isAlreadySent = await redis.sismember("welcome-emails", primaryEmail);
    if (isAlreadySent) {
      return { message: "Welcome email already sent" };
    }

    const { data, error } = await resend.emails.send({
      from: "support@reelhype.space",
      to: primaryEmail,
      subject: "Welcome to MpesaFlow",
      react: StripeWelcomeEmail({ name: "there" }),
    });

    if (error) {
      throw new Error(`Failed to send email: ${error.message}`);
    }

    await redis.sadd("welcome-emails", primaryEmail);
    return { message: "Welcome email sent successfully", data };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw error;
  }
}
