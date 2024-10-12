'use client'

import { createApplicationAction } from "@//actions/application/create-application";
import { Button } from "@mpesaflow/ui/button";
import { Icons } from "@mpesaflow/ui/icons";
import { Input } from "@mpesaflow/ui/input";
import { Label } from "@mpesaflow/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@mpesaflow/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";


export function CreateApplicationForm() {
    const [state, formAction] = useFormState(createApplicationAction, undefined);
    const [name, setName] = useState("");
    const [enviroment, setEnvrioment] = useState<string[]>([])
    const [consumerKey, setConsumerKey] = useState("")
    const [consumerSecret, setConsumerSecret] = useState("")
    const [passKey, setPassKey] = useState("")
    const router = useRouter();

    useEffect(() => {
        if (state?.message) {
            toast.success(state.message);
            router.push(`/flow/${state.applicationId}`);
        } else if (state?.error) {
            toast.error(state.error);
        }
    }, [state, router]);


    return (



        <div >
            <form action={formAction}>
                <div className="flex fle-row gap-3 items-center">
                    <div className="flex flex-col gap-2 mb-4">
                        <Label>Application Name</Label>
                        <Input
                            type="text"
                            placeholder="Enter application name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input type="hidden" name="enviroment" value={enviroment} />
                    </div>

                    <Select defaultValue="development" onValueChange={(value) => setEnvrioment([value])}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an environment" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Environment</SelectLabel>
                                <SelectItem value="development">Development</SelectItem>
                                <SelectItem value="production">Production</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {enviroment.includes("production") && (
                    <div className="flex flex-col gap-3">
                        <div className="grid grid-rows-2 gap-0.5">
                            <Label>CONSUMER KEY</Label>
                            <Input
                                type="text"
                                placeholder="Enter consumer key"
                                name="consumerKey"
                                value={consumerKey}
                                onChange={(e) => setConsumerKey(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-row-2 gap-0.5">
                            <Label>CONSUMER SECRET</Label>
                            <Input
                                type="text"
                                placeholder="Enter consumer secret"
                                name="consumerSecret"
                                value={consumerSecret}
                                onChange={(e) => setConsumerSecret(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid grid-rows-2 gap-0.5 mb-4">
                            <Label>PASS KEY</Label>
                            <Input
                                type="text"
                                placeholder="Enter pass key"
                                name="passKey"
                                value={passKey}
                                onChange={(e) => setPassKey(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                )}

                <SubmitButton name={name} enviroment={enviroment} consumerKey={consumerKey} consumerSecret={consumerSecret} passKey={passKey} />

            </form>
        </div>
    )
}

function SubmitButton({ name, enviroment, consumerKey, consumerSecret, passKey }: { name: string, enviroment: string[], consumerKey: string, consumerSecret: string, passKey: string }) {
    const { pending } = useFormStatus();

    return (
        <Button disabled={pending || name.trim() === "" && !(enviroment.includes("production") && (consumerKey.trim() === "" || consumerSecret.trim() === "" || passKey.trim() === ""))} type="submit">
            {pending ? (
                <>
                    <Icons.spinner className="animate-spin size-4 mr-2" />
                    Creating Application
                </>
            ) : (
                "Create Application"
            )}
        </Button>
    );
}