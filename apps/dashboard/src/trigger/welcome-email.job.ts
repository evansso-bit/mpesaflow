import { Resend } from "@trigger.dev/resend";
import { retry, task } from "@trigger.dev/sdk/v3";
import { StripeWelcomeEmail } from "../emails/welcome";

const resend = new Resend({
  id: "resend",
  apiKey: process.env.RESEND_API_KEY,
});

export const welcomeEmail = task({
  id: "send-welcome-email",

  run: async (payload: {
    email: "evanssomaina@gmail.com";
    firstName: "Evan";
  }) => {
    const { email, firstName } = payload;

    const retryEmail = await retry.onThrow(
      async ({ attempt }) => {
        await resend.emails.send("welcome-email", {
          // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
          from: `MpesaFlow <support@reelhype.space>`,
          to: email,
          subject: "Welcome to MpesaFlow",
          react: StripeWelcomeEmail({ name: firstName || "there" }),
        });
      },
      { maxAttempts: 3 },
    );
  },
});
