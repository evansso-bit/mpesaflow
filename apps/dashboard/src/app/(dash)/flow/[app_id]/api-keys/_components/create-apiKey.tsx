"use client";

import { createApiKeyAction } from "@//actions/apiKeys/create-apiKey-action";
import { Button } from "@mpesaflow/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@mpesaflow/ui/dialog";
import { Icons } from "@mpesaflow/ui/icons";
import { Input } from "@mpesaflow/ui/input";
import { Label } from "@mpesaflow/ui/label";
import * as React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

export default function CreateApiKey({
  applicationId,
  enviroment,
}: {
  applicationId: string;
  enviroment: string[];
}) {
  const [state, formAction] = useFormState(createApiKeyAction, undefined);
  const [isOpen, setIsOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  React.useEffect(() => {
    if (!state) {
      return;
    }
    if ("message" in state) {
      setIsOpen(false);
      toast.success(state.message);
      setName(""); // Reset the name after successful creation
    } else if ("error" in state) {
      toast.error(`Error creating API key: ${state.error}`);
    }
  }, [state]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setName(""); // Reset the name when closing the dialog
    }
  };

  console.log(`${applicationId} enviroment: ${enviroment}`);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-fit flex items-center">
          <Icons.plus className="size-4 mr-2" />
          Create API Key
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create API Key</DialogTitle>
          <DialogDescription>
            Create a new API key to access your application.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="mb-8">
            <Label htmlFor="apiName">API Name</Label>
            <Input
              id="apiName"
              type="text"
              placeholder="Enter API name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input type="hidden" name="applicationId" value={applicationId} />
            <input type="hidden" name="enviroment" value={enviroment} />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <CreateAPIKeyButton name={name} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CreateAPIKeyButton({ name }: { name: string }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending || name.trim() === ""} type="submit">
      {pending ? (
        <>
          <Icons.spinner className="animate-spin size-4 mr-2" />
          Creating
        </>
      ) : (
        "Create"
      )}
    </Button>
  );
}
