'use client'

import { useAuth } from "@clerk/nextjs"
import { Icons } from "@mpesaflow/ui/icons"
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@mpesaflow/ui/select"
import { useQuery } from "convex/react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { api } from "../../../../../../convex/_generated/api"

export default function AppsSelect() {
  const { userId } = useAuth()
  const params = useParams<{ app_id: string }>()
  const router = useRouter()
  const apps = useQuery(api.appActions.getApplications, {
    userId: userId || "",
  })

  if (!apps) return null

  const selectedApp = apps.find(app => app._id === params.app_id)

  const handleValueChange = (value: string) => {
    if (value === "new") {
      router.push("/flow/new")
    } else {
      router.push(`/flow/${value}`)
    }
  }

  return (
    <Select value={params.app_id} onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select an app">
          {selectedApp ? selectedApp.name : "Select an app"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {apps.map((app) => (
          <SelectItem key={app._id} value={app._id}>
            {app.name}
          </SelectItem>
        ))}
        <SelectSeparator />
        <SelectItem value="new">
          <div className="flex items-center">
            <Icons.plus className="mr-2 size-4" />
            New app
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}