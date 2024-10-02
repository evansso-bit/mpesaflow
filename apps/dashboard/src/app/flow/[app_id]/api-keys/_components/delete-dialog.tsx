"use client";

import { deleteApiKeyAction } from "@//actions/delete-apiKey-action";
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
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";


const initialMessage = {
  message: "",
};

export default function DeleteApiKeyDialog({
  Id,
  appId,
}: { Id: string; appId: string }) {
  const [state, formAction] = useFormState(deleteApiKeyAction, initialMessage);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (state) {
      setIsOpen(false);
      setTimeout(() => {
        if (state.error) {
          toast.error(state.error);
        } else {
          toast.success("API key deleted successfully");
        }
      }, 300); // Delay to ensure dialog closes first
    }
  }, [state]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setIsOpen(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button className="w-fit">Delete API Key</Button>
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

          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <DeleteAPIKeyButton />
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
          <Icons.spinner className="animate-spin h-5 w-5 mr-2" />
          Deleting
        </>
      ) : (
        <>
          <Icons.delete className="mr-2" />
          Delete
        </>
      )}
    </Button>
  );
}