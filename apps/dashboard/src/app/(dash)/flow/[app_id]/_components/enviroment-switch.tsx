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

export function EnvironmentSelect() {
    const params = useParams<{ app_id: string }>()
    const { userId } = useAuth()
    const application = useQuery(api.appActions.getApplicationData, {
        applicationId: params.app_id || '',
        userId: userId || '',
    })
    const saveEnvironment = useMutation(api.appActions.saveCurrentEnvironment)

    const environments = application?.environments || ['development']
    const currentEnvironment = application?.currentEnvironment || 'development'
    const hasProduction = environments.includes('production')

    const [selectedEnvironment, setSelectedEnvironment] = useState(currentEnvironment)
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

    useEffect(() => {
        if (currentEnvironment) {
            setSelectedEnvironment(currentEnvironment)
        }
    }, [currentEnvironment])

    const handleEnvironmentChange = (value: string) => {
        if (value === 'register') {
            setIsRegisterModalOpen(true)
        } else {
            setSelectedEnvironment(value)
            saveEnvironment({
                applicationId: params.app_id || '',
                currentEnvironment: value,
                userId: userId || ''
            })
        }
    }

    const handleRegisterProduction = async () => {
        setIsRegisterModalOpen(false)

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
                        {!hasProduction && (
                            <SelectItem value="register">
                                Create Production Instance
                            </SelectItem>
                        )}
                    </SelectGroup>
                </SelectContent>
            </Select>
            {isRegisterModalOpen && (
                <RegisterModal
                    onClose={() => setIsRegisterModalOpen(false)}
                    onRegister={handleRegisterProduction}
                />
            )}
        </div>
    )
}

export function useCurrentEnvironment() {
    const params = useParams<{ app_id: string }>()
    const { userId } = useAuth()
    const currentEnvironment = useQuery(api.appActions.getCurrentEnvironment, {
        applicationId: params.app_id || '',
        userId: userId || '',
    })

    return {
        environment: currentEnvironment || "development",
    }
}