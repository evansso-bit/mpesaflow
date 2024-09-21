import { sendWelcomeEmail } from "../components/send-email";




export default async function Home() {

  const data = await sendWelcomeEmail();
  return (
    <h1>
      dashboard page AGAIN

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </h1>
  )
}
