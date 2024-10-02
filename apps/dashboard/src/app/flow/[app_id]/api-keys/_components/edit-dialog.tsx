"use client";

import { updateApiKeyAction } from "@//actions/update-apiKey-action";
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

export default function EditApiKeyDialog({
  Id,
  keyId,
  apiName,
  appId,
}: { Id: string; keyId: string; apiName: string; appId: string }) {
  const [state, formAction] = useFormState(updateApiKeyAction, initialMessage);
  const [name, setName] = useState(apiName);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (state) {
      setIsOpen(false);
      setTimeout(() => {
        if (state.error) {
          toast.error(state.error);
        } else {
          toast.success("API key updated successfully");
        }
      }, 300); // Delay to ensure dialog closes first
    }
  }, [state]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setName(apiName); // Reset name when dialog is closed
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange} >
      <DialogTrigger asChild>
        <Button className="w-fit">Edit API Key</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit API Key</DialogTitle>
          <DialogDescription>
            Edit the name and description of your API key.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div>
            <Label htmlFor="apiName">API Name</Label>
            <Input
              id="apiName"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter API name"
              name="name"
              required
            />
            <input type="hidden" name="_id" value={Id} />
            <input type="hidden" name="keyId" value={keyId} />
            <input type="hidden" name="appId" value={appId} />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <EditAPIKeyButton name={name} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditAPIKeyButton({ name }: { name: string }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending || name === ""} type="submit">
      {pending ? (
        <>
          <Icons.spinner className="animate-spin h-5 w-5 mr-2" />
          Saving
        </>
      ) : (
        "Save Changes"
      )}
    </Button>
  );
}