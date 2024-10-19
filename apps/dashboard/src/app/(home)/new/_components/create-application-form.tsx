"use client";

import { createApplicationAction } from "@//actions/application/create-application";
import { Button } from "@mpesaflow/ui/button";
import { Icons } from "@mpesaflow/ui/icons";
import { Input } from "@mpesaflow/ui/input";
import { Label } from "@mpesaflow/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@mpesaflow/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

export function CreateApplicationForm() {
  const [state, formAction] = useFormState(createApplicationAction, undefined);
  const [name, setName] = useState("");
  const [environment, setEnvironment] = useState("development");
  const [consumerKey, setConsumerKey] = useState("");
  const [consumerSecret, setConsumerSecret] = useState("");
  const [passKey, setPassKey] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
      router.push(`/flow/${state.applicationId}`);
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);



  return (
    <div>
      <form action={formAction} className="max-w-3xl">
        <div className="flex flex-row gap-3 items-center">
          <div className="flex flex-col gap-2 mb-4">
            <Label>Application Name</Label>
            <Input
              type="text"
              placeholder="Enter application name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-[500px]"
            />
            <Input type="hidden" name="environment" value={environment} />
            <Input type="hidden" name="consumerKey" value={consumerKey} />
            <Input type="hidden" name="consumerSecret" value={consumerSecret} />
            <Input type="hidden" name="passKey" value={passKey} />
          </div>

          <Select value={environment} onValueChange={(value) => setEnvironment(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an environment" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Environment</SelectLabel>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="production">Production</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {environment === "production" && (
          <div className="flex flex-wrap gap-3 mb-5 items-center">
            <div className="flex flex-col gap-3">
              <Label>CONSUMER KEY</Label>
              <Input
                type="text"
                placeholder="Enter consumer key"
                name="consumerKey"
                value={consumerKey}
                onChange={(e) => setConsumerKey(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label>CONSUMER SECRET</Label>
              <Input
                type="text"
                placeholder="Enter consumer secret"
                name="consumerSecret"
                value={consumerSecret}
                onChange={(e) => setConsumerSecret(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label>PASS KEY</Label>
              <Input
                type="text"
                placeholder="Enter pass key"
                name="passKey"
                value={passKey}
                onChange={(e) => setPassKey(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        <SubmitButton
          name={name}
          environment={environment}
          consumerKey={consumerKey}
          consumerSecret={consumerSecret}
          passKey={passKey}
        />
      </form>
    </div>
  );
}

function SubmitButton({
  name,
  environment,
  consumerKey,
  consumerSecret,
  passKey,
}: {
  name: string;
  environment: string;
  consumerKey: string;
  consumerSecret: string;
  passKey: string;
}) {
  const { pending } = useFormStatus();

  const isDisabled =
    pending ||
    name.trim() === "" ||
    (environment === "production" &&
      (consumerKey.trim() === "" ||
        consumerSecret.trim() === "" ||
        passKey.trim() === ""));

  return (
    <Button disabled={isDisabled} type="submit">
      {pending ? (
        <>
          <Icons.spinner className="animate-spin size-4 mr-2" />
          Creating Application
        </>
      ) : (
        "Create Application"
      )}
    </Button>
  );
}
