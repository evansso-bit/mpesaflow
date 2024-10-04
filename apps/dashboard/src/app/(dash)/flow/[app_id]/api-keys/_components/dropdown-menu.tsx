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
import { useState } from "react";

export default function DropdownMenuComponent({
  applicationId,
  keyId,
  ApiName,
  appId,
}: {
  applicationId: string;
  keyId: string;
  ApiName: string;
  appId: string;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-fit">
          <Icons.dropdown className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <EditApiKeyDialog
              Id={applicationId}
              keyId={keyId}
              apiName={ApiName}
              appId={appId}
              isOpen={isEditDialogOpen}
              setIsOpen={setIsEditDialogOpen}
              closeDropdown={() => setIsDropdownOpen(false)}
            />
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-500">
            <DeleteApiKeyDialog
              Id={applicationId}
              appId={appId}
              isOpen={isDeleteDialogOpen}
              setIsOpen={setIsDeleteDialogOpen}
              closeDropdown={() => setIsDropdownOpen(false)}
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}