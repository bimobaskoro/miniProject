"use client";
import Page from "./cardHome.component";
import { IoTicketOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useAppSelector } from "../../../hooks";
import { deleteCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { logout } from "../_lib/redux/slice/user.slice";
import { Button } from "@/components/ui/button";
import { CreditCard, LogOut, User, TicketPercent } from "lucide-react";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { Dropdown } from "react-day-picker";

const DropdownMenu = dynamic(
  () => import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenu),
  { ssr: false }
);
const DropdownMenuContent = dynamic(
  () =>
    import("@/components/ui/dropdown-menu").then(
      (mod) => mod.DropdownMenuContent
    ),
  { ssr: false }
);
const DropdownMenuItem = dynamic(
  () =>
    import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenuItem),
  { ssr: false }
);
const DropdownMenuLabel = dynamic(
  () =>
    import("@/components/ui/dropdown-menu").then(
      (mod) => mod.DropdownMenuLabel
    ),
  { ssr: false }
);
const DropdownMenuSeparator = dynamic(
  () =>
    import("@/components/ui/dropdown-menu").then(
      (mod) => mod.DropdownMenuSeparator
    ),
  { ssr: false }
);
const DropdownMenuTrigger = dynamic(
  () =>
    import("@/components/ui/dropdown-menu").then(
      (mod) => mod.DropdownMenuTrigger
    ),
  { ssr: false }
);

export default function NavbarComponent() {
  const user = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <>
      <nav className="bg-white border-gray-200 flex p-2">
        <div className="bg-white flex rounded-[5px] h-7 mt-1 border-gray-200 border-[1px] p-1 ">
          <FaSearch className=" text-gray-500  flex justify-center" />
          <input
            type="text"
            id="search"
            className="ml-5"
            placeholder="Search Event"
          ></input>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>
              <GiHamburgerMenu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-screen bg-white">
            {user.id ? (
              <>
                <DropdownMenuLabel>Welcome, {user.fullName}</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>{" "}
                  <DropdownMenuItem>
                    <TicketPercent className="mr-2 h-4 w-4" />
                    <span>Voucher</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>History Order</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="">
                    <LogOut className="mr-2 h-4 w-4" />
                    <button
                      onClick={() => {
                        deleteCookie("access_token");
                        deleteCookie("refresh_token");
                        dispatch(logout());
                      }}
                    >
                      Log out
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </>
            ) : (
              <>
                <a href="/login">
                  <button className="bg-blue-600 p-2">Login</button>
                </a>
                <a href="/register">
                  <button className="ml-5 bg-blue-600 p-2">Register</button>
                </a>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </>
  );
}