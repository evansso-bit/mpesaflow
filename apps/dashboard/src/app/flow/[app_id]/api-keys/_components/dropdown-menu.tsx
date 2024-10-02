"use client";

import { Button } from "@mpesaflow/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@mpesaflow/ui/dropdown-menu";
import { Icons } from "@mpesaflow/ui/icons";
import DeleteApiKeyDialog from "./delete-dialog";
import EditApiKeyDialog from "./edit-dialog";


export default function DropdownMenuComponent({
  applicationId,
  keyId,
  ApiName,
  appId,
}: { applicationId: string; keyId: string; ApiName: string; appId: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-fit">
          <Icons.dropdown className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              EditApiKeyDialog({
                Id: applicationId,
                keyId: keyId,
                apiName: ApiName,
                appId: appId,
              })
            }
          >
            <Icons.edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-500"
            onClick={() =>
              DeleteApiKeyDialog({ Id: applicationId, appId: appId })
            }
          >
            <Icons.delete className="mr-2 h-4 w-4 text-red-500" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}