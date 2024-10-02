'use client'

import { Badge } from "@mpesaflow/ui/badge";
import CreateApiKey from "./create-apiKey";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@mpesaflow/ui/table";
import { api } from "convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import DropdownMenuComponent from "./dropdown-menu";

export default async function ApiKeysTable({
  applicationId,
  enviroment,
  userId,
  appId,
}: {
  applicationId: string;
  enviroment: string;
  userId: string;
  appId: string;
}) {
  const data = await fetchQuery(api.apiActions.getApiKeys, {
    applicationId: applicationId || "",
    enviroment: enviroment || "",
    userId: userId || "",
  });

  return (
    <>
      {data.length === 0 ? (
        <div className=" flex flex-col gap-3 w-full h-fit text-center justify-center items-center border border-gray-600 rounded-2xl p-10">
          <h1 className="text-xl">You don't have any API keys yet</h1>
          <p>Create an API key to access your application</p>
          <CreateApiKey
            enviroment={enviroment || ""}
            applicationId={applicationId || ""}
          />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Key</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((key) => (
              <TableRow key={key._id}>
                <TableCell>{key.name}</TableCell>
                <TableCell>
                  <Badge className="truncate" variant="secondary">
                    {key.key}
                  </Badge>
                </TableCell>

                <TableCell>
                  <DropdownMenuComponent
                    appId={appId}
                    key={key._id}
                    applicationId={key._id}
                    ApiName={key.name}
                    keyId={key._id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
