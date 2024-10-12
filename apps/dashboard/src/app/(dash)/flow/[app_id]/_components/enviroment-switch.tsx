'use client'

import { useAuth } from "@clerk/nextjs"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@mpesaflow/ui/select"
import { useMutation, useQuery } from "convex/react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { api } from "../../../../../../convex/_generated/api"
import RegisterModal from "./register-modal"

export function EnvironmentSelect({ appId }: { appId: string }) {
    const params = useParams<{ app_id: string }>()
    const { userId } = useAuth()
    const application = useQuery(api.appActions.getApplicationData, {
        applicationId: params.app_id || '',
        userId: userId || '',
    })
    const saveEnvironment = useMutation(api.appActions.saveCurrentEnvironment)
    const addEnvironment = useMutation(api.appActions.addEnvironment)
    const removeEnvironment = useMutation(api.appActions.removeEnvironment)

    const environments = application?.enviroment || ['development']
    const currentEnvironment = application?.currentEnvironment || 'development'
    const isProduction = environments.includes('production')

    const [selectedEnvironment, setSelectedEnvironment] = useState(currentEnvironment)

    useEffect(() => {
        if (currentEnvironment) {
            setSelectedEnvironment(currentEnvironment)
        }
    }, [currentEnvironment])

    const handleEnvironmentChange = (value: string) => {
        if (value === 'add-new') {
            // Logic to add a new environment
            const newEnv = prompt('Enter new environment name:')
            if (newEnv) {
                addEnvironment({ applicationId: params.app_id || '', environment: newEnv, userId: userId || '' })
            }
        } else if (value === 'remove') {
            // Logic to remove the current environment
            if (confirm(`Are you sure you want to remove the "${selectedEnvironment}" environment?`)) {
                removeEnvironment({ applicationId: params.app_id || '', environment: selectedEnvironment, userId: userId || '' })
            }
        } else {
            setSelectedEnvironment(value)
            saveEnvironment({ applicationId: params.app_id || '', currentEnvironment: value, userId: userId || '' })
        }
    }

    return (
        <div>
            <Select value={selectedEnvironment} onValueChange={handleEnvironmentChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select environment" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Environments</SelectLabel>
                        {environments.map((env: string) => (
                            <SelectItem key={env} value={env}>
                                {env}
                            </SelectItem>
                        ))}
                        <SelectItem value="add-new">Add New Environment</SelectItem>
                        {environments.length > 1 && <SelectItem value="remove">Remove Current Environment</SelectItem>}
                    </SelectGroup>
                    {!isProduction && (
                        <SelectItem value="register">
                            <RegisterModal />
                        </SelectItem>
                    )}
                </SelectContent>
            </Select>
        </div>
    );
}

export function useCurrentEnvironment() {
    const params = useParams<{ app_id: string }>()
    const { userId } = useAuth()
    const application = useQuery(api.appActions.getApplicationData, {
        applicationId: params.app_id || '',
        userId: userId || '',
    });

    return application?.currentEnvironment || "development";
}
