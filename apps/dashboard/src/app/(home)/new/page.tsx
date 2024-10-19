import type { Metadata } from "next";
import { CreateApplicationForm } from "./_components/create-application-form";

export const metadata: Metadata = {
  title: "Create Application",
};

export default function NewApplication() {
  return (
    <div className="flex flex-col max-w-5xl w-full mx-auto  gap-10  ">
      <div className="flex flex-col gap-2">
        <h1 className="lg:text-2xl text-xl">Create an application</h1>
        <p className="text-gray-500">Let's create an application</p>
      </div>
      <CreateApplicationForm />
    </div>
  );
}
