"use client";

import { useEffect } from "react";
import Image from "next/image";
import Logo from "@/public/assets/logo.svg";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell } from "lucide-react";
import { redirect, useParams, usePathname } from "next/navigation";
import { DataLoader } from "@/components/utils";
import { logout, selectMe } from "@/lib/features/authentication/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { letterCategoryLookup } from "@/typing/dictionary";

export default function TopBar() {
  const me = useAppSelector(selectMe);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const params = useParams();

  const handleLogout = () => {
    dispatch(logout({}));
    redirect("/signin");
  };

  return (
    <header className="min-h-16 w-full px-8 bg-white flex justify-between items-center">
      <DataLoader />
      <button className="flex items-center gap-4 hover:cursor-pointer">
        <Image src={Logo} alt="logo" width={30} />
        <Breadcrumb>
          <BreadcrumbList>
            {params.category ? (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/letters/${params.category}`}>
                    {
                      letterCategoryLookup[
                        params.category.toString().toUpperCase()
                      ]
                    }
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            ) : (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/letters/inbox`}>
                    ደብዳቤዎች
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}
            {params.referenceNumber ? (
              <BreadcrumbItem>
                <BreadcrumbPage>{params.referenceNumber}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : null}
          </BreadcrumbList>
        </Breadcrumb>
      </button>
      <div className="flex gap-4 items-center">
        {pathname.split("/").splice(2)[0] !== "compose" ? (
          <Input
            type="text"
            placeholder="ፈልግ"
            className=" w-96 py-0 focus-visible:ring-0 h-9 focus-visible:ring-offset-0"
          />
        ) : null}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <Separator orientation="vertical" className="h-8" />

          <p className="text-xs">{me?.full_name ? me.full_name : ""}</p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>
                  {me?.full_name ? me.full_name.substring(0, 2) : ""}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex">
              <DropdownMenuItem onClick={handleLogout}>ውጣ</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
