"use client";

import { deleteApiKeyAction } from "@//actions/apiKeys/delete-apiKey-action";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@mpesaflow/ui/alert-dialog";
import { Button } from "@mpesaflow/ui/button";
import { Icons } from "@mpesaflow/ui/icons";
import * as React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

export default function DeleteApiKeyDialog({
  Id,
  appId,
  isOpen,
  setIsOpen,
  closeDropdown,
  keyId,
}: {
  Id: string;
  appId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  closeDropdown: () => void;
  keyId: string;
}) {
  const [state, formAction] = useFormState(deleteApiKeyAction, undefined);

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
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <div className="flex flex-row items-center">
          <Icons.delete className="size-4 mr-2 text-red-500" />
          Delete
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete API Key</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this API key?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form action={formAction}>
          <input type="hidden" name="_id" value={Id} />
          <input type="hidden" name="appId" value={appId} />
          <input type="hidden" name="keyId" value={keyId} />

          <div className="flex justify-end space-x-2 mt-4">
            <AlertDialogCancel asChild>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </AlertDialogCancel>
            <DeleteAPIKeyButton />
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function DeleteAPIKeyButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="destructive" disabled={pending} type="submit">
      {pending ? (
        <>
          <Icons.spinner className="animate-spin size-4 mr-2" />
          Deleting
        </>
      ) : (
        <>
          <Icons.delete className="mr-2 size-4" />
          Delete
        </>
      )}
    </Button>
  );
}
