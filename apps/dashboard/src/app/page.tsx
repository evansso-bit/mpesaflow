import { sendWelcomeEmail } from "../components/send-email";




export default async function Home() {

  await sendWelcomeEmail();
  return (
    <h1>
      dashboard page AGAIN

    </h1>
  )
}
