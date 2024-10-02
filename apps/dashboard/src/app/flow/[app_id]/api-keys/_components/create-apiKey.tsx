"use client";

import { createApiKeyAction } from "@//actions/create-apiKey-action";
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
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

const initialMessage = {
  message: "",
};

export default function CreateApiKey({
  applicationId,
  enviroment,
}: { applicationId: string; enviroment: string }) {
  const [state, formAction] = useFormState(createApiKeyAction, initialMessage);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (state) {
      setIsOpen(false);
      setTimeout(() => {
        if (state.message === "API key created successfully") {
          toast.success("API key created successfully");
        } else if (state.error) {
          toast.error(state.error);
        }
      }, 300); // Delay to ensure dialog closes first
    }
  }, [state]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger className="flex flex-row items-center mx-auto" asChild>
        <Icons.plus className="w-5 h-5 mr-2" />
        <Button className="w-fit">Create API Key</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create API Key</DialogTitle>
          <DialogDescription>
            Create a new API key to access your application.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div>
            <Label>API Name</Label>
            <Input
              type="text"
              placeholder="Enter API name"
              name="name"
              required
            />
            <input type="hidden" name="applicationId" value={applicationId} />
            <input type="hidden" name="enviroment" value={enviroment} />
          </div>
          <DialogFooter>
            <DialogTrigger>
              <Button
                type="button"
                variant="outline"
                className="flex flex-row items-center gap-2"
              >
                Cancel
              </Button>
            </DialogTrigger>
            <CreateAPIKeyButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CreateAPIKeyButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending ? (
        <>
          <Icons.spinner className="animate-spin h-5 w-5 mr-2" />
          Creating
        </>
      ) : (
        "Create"
      )}
    </Button>
  );
}