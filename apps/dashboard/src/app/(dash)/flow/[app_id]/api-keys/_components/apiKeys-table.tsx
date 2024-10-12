import { auth } from "@clerk/nextjs/server";
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

  appId,
}: {

  appId: string;
}) {
  const { userId } = auth();
  const currentEnvironment = await CurrentEnvironment(appId);
  const data = await fetchQuery(api.apiActions.getApiKeys, {
    applicationId: appId || "",
    enviroment: [currentEnvironment],
    userId: userId || "",
  });

  return (
    <>
      {data?.length === 0 ? (
        <div className=" flex flex-col gap-3 w-full h-fit text-center justify-center items-center border border-gray-600 rounded-2xl p-10">
          <h1 className="text-xl">You don't have any API keys yet</h1>
          <p className="mb-4">Create an API key to access your application</p>
          <CreateApiKey
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
                  <Badge className="truncate  overflow-hidden">
                    {key.key}...
                  </Badge>
                </TableCell>
                <TableCell>{key._creationTime}</TableCell>
                <TableCell>
                  <DropdownMenuComponent
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


async function CurrentEnvironment(app_id: string) {
  const { userId } = auth();
  const currentEnvironment = await fetchQuery(api.appActions.getCurrentEnvironment, {
    applicationId: app_id,
    userId: userId || "",
  });
  return currentEnvironment || "development";
}