'use client'

import { DeleteApplicationAction } from "@//actions/application/delete-application"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@mpesaflow/ui/alert-dialog"
import { Button } from "@mpesaflow/ui/button"
import { Icons } from "@mpesaflow/ui/icons"
import { useFormState, useFormStatus } from "react-dom"


export function DeleteUser() {
    const [state, formAction] = useFormState(DeleteApplicationAction, undefined)

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Show Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form action={formAction}>
                        <DeleteButton />
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

function DeleteButton() {
    const { pending } = useFormStatus()

    return (
        <Button type="submit" variant={'destructive'} disabled={pending}>
            {pending ? (
                <div className="flex flex-col items-center">
                    <Icons.spinner className="size-4 mr-2 animate-spin" />
                    Deleting
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <Icons.delete className="mr-2 size-4" />
                    Delete
                </div>
            )}
        </Button>
    )
}