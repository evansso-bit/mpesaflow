"use client";

import { createApplicationAction } from "@//actions/application/create-application";
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

export default function CreateApplication() {
  const [state, formAction] = useFormState(createApplicationAction, undefined);
  const [name, setName] = React.useState("");
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!state) {
      return;
    }

    if ("message" in state) {
      toast(state?.message);
      setOpen(false);
    } else if ("error" in state) {
      toast(`Error creating application: ${state.error}`);
      setOpen(false);
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="justify-center font-medium items-center flex hover:cursor-pointer text-center w-full h-full bg-muted border border-dashed border-gray-200 rounded-xl text-sm">
          <div className="flex flex-row gap-2 items-center">
            <Icons.plus className="size-4" />
            Create Application
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="">Create Application</DialogTitle>
          <DialogDescription>
            Create a new application to manage your payments.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction}>
          <div className="mb-10 flex flex-col gap-2">
            <Label>Application Name</Label>
            <Input
              type="text"
              placeholder="Enter application name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <CreateApplicationButton name={name} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CreateApplicationButton({ name }: { name: string }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending || name === ""} type="submit">
      {pending ? (
        <>
          <Icons.spinner className="animate-spin h-5 w-5 mr-2" />
          Creating Application
        </>
      ) : (
        "Create Application"
      )}
    </Button>
  );
}
