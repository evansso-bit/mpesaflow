'use client'

import { createApplicationAction } from "@//actions/create-application";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { Button } from "@mpesaflow/ui/button";
import { Input } from "@mpesaflow/ui/input";
import { Label } from "@mpesaflow/ui/label";
import { Icons } from "@mpesaflow/ui/icons";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@mpesaflow/ui/dialog"

export default function CreateApplication() {
    const [state, formAction] = useFormState(createApplicationAction, undefined)



    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="p-20 hover:cursor-pointer text-center w-fit bg-gray-300 border border-gray-600 rounded-2xl">
                    Create Application
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Application</DialogTitle>
                    <DialogDescription>
                        Create a new application to manage your payments.
                    </DialogDescription>
                </DialogHeader>
                <form action={formAction}>
                    <div>
                        <Label>Application Name</Label>
                        <Input type="text" placeholder="Enter application name" name="name" required />
                    </div>
                    <DialogFooter>
                        <DialogTrigger>
                            <Button type="button" variant="outline" className="flex flex-row items-center gap-2">
                                Cancel
                            </Button>
                        </DialogTrigger>
                        <CreateApplicationButton />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )

}

function CreateApplicationButton() {
    const { pending } = useFormStatus()

    return (
        <Button disabled={pending} type="submit">
            {pending ? <>
                <Icons.spinner className="animate-spin h-5 w-5 mr-2" />
                Creating Application
            </> : 'Create Application'}
        </Button>
    )
}


