import { Badge } from "@mpesaflow/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@mpesaflow/ui/table";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../../../convex/_generated/api";
import CreateApiKey from "./create-apiKey";
import DropdownMenuComponent from "./dropdown-menu";

export default async function ApiKeysTable({
  enviroment,
  appId,
}: {
  enviroment: string[];
  appId: string;
}) {
  const data = await fetchQuery(api.apiActions.getApiKeys, {
    applicationId: appId || "",
    enviroment: enviroment,
  });

  return (
    <>
      {data?.length === 0 ? (
        <div className=" flex flex-col gap-3 w-full h-fit text-center justify-center items-center border border-gray-600 rounded-2xl p-10">
          <h1 className="text-xl">You don't have any API keys yet</h1>
          <p className="mb-4">Create an API key to access your application</p>
          <CreateApiKey
            enviroment={enviroment}
            applicationId={appId || ""}
          />
        </div>
      ) : (
        <Table className="rounded-md border">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Key</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((key) => (
              <TableRow key={key._id}>
                <TableCell>{key.name}</TableCell>
                <TableCell>
                  <Badge className="truncate w-[100px] overflow-hidden">
                    {key.key}...
                  </Badge>
                </TableCell>
                <TableCell>{key._creationTime}</TableCell>
                <TableCell>
                  <DropdownMenuComponent
                    appId={key.applicationId}
                    Id={key._id}
                    ApiName={key.name}
                    keyId={key.keyId}
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
