"use client";

import { updateApiKeyAction } from "@//actions/apiKeys/update-apiKey-action";
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

export default function EditApiKeyDialog({
  Id,
  keyId,
  apiName,
  appId,
  isOpen,
  setIsOpen,
  closeDropdown,
}: {
  Id: string;
  keyId: string;
  apiName: string;
  appId: string;
  closeDropdown: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const [state, formAction] = useFormState(updateApiKeyAction, undefined);
  const [name, setName] = React.useState(apiName);

  React.useEffect(() => {
    if (!state) return;

    if ("error" in state) {
      setIsOpen(false);
      closeDropdown();
      toast.error(`Error deleting API key: ${state.error}`);
    } else if ("message" in state) {
      setIsOpen(false);
      closeDropdown();
      toast.success(state.message);
    }
  }, [state, setIsOpen, closeDropdown]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      closeDropdown();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className="flex flex-row items-center">
          <Icons.edit className="size-4 mr-2" />
          Edit
        </div>
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
          <DialogFooter className="mt-8">
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
          <Icons.spinner className="animate-spin size-4 mr-2" />
          Saving
        </>
      ) : (
        "Save Changes"
      )}
    </Button>
  );
}
