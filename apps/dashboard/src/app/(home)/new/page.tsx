import type { Metadata } from "next";
import { CreateApplicationForm } from "./_components/create-application-form";

export const metadata: Metadata = {
    title: "Create Application"
}


export default function NewApplication() {

    return (
        <div className="w-full h-full mt-20 max-w-3xl flex flex-col justify-center gap-4 mx-auto">
            <h1 className="text-2xl">Lets Create an application</h1>

            <CreateApplicationForm />
        </div>
    )
}

