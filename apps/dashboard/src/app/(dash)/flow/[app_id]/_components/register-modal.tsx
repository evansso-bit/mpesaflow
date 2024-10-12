'use client'

import { updateApplicationAction } from "@//actions/application/update-application";
import { Button } from "@mpesaflow/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@mpesaflow/ui/dialog";
import { Icons } from "@mpesaflow/ui/icons";
import { Input } from "@mpesaflow/ui/input";
import { Label } from "@mpesaflow/ui/label";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";


export default function RegisterModal() {
    const [state, formAction] = useFormState(updateApplicationAction, null);
    const [consumerKey, setConsumerKey] = useState('');
    const [consumerSecret, setConsumerSecret] = useState('');
    const [passKey, setPassKey] = useState('');

    return (
        <Dialog>
            <DialogTrigger>
                <div className="flex items-center gap-2">
                    <Icons.plus />
                    Create Production Instance
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Production Instance</DialogTitle>
                    <DialogDescription>
                        This will create a production instance for your application.
                    </DialogDescription>
                </DialogHeader>

                <form action={formAction}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Label htmlFor="consumerKey">Consumer Key</Label>
                            <Input value={consumerKey} onChange={(e) => setConsumerKey(e.target.value)} type="text" id="consumerKey" name="consumerKey" required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Label htmlFor="consumerKey">Consumer Secret</Label>
                            <Input value={consumerSecret} onChange={(e) => setConsumerSecret(e.target.value)} type="text" id="consumerSecret" name="consumerSecret" required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Label htmlFor="passKey">Pass Key</Label>
                            <Input value={passKey} onChange={(e) => setPassKey(e.target.value)} type="text" id="passKey" name="passKey" required />
                        </div>

                        <SubmitButton consumerKey={consumerKey} consumerSecret={consumerSecret} passKey={passKey} />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function SubmitButton({ consumerKey, consumerSecret, passKey }: { consumerKey: string, consumerSecret: string, passKey: string }) {
    const { pending } = useFormStatus();

    return <Button type="submit" disabled={!consumerKey || !consumerSecret || !passKey || pending}>{pending ? (
        <>
            <Icons.spinner className="mr-2 size-4 animate-spin" />
            Creating...
        </>
    ) : 'Create Instance'}</Button>
}