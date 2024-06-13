"use client";
import Page from "./cardHome.component";
import { IoTicketOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import dynamic from "next/dynamic";
import React, { useState, useCallback } from "react";
import { useAppSelector } from "../../../hooks";
import { deleteCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { logout } from "../_lib/redux/slice/user.slice";
import { Button } from "@/components/ui/button";
import { CreditCard, LogOut, User, TicketPercent } from "lucide-react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { Dropdown } from "react-day-picker";
import { axiosInstance } from "../_lib/axios";
import { useFormik } from "formik";

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
      <nav className="bg-white shadow-md sticky top-0 left-0 right-0 p-2">
        {user.id ? (
          <>
            <div className="flex justify-between">
              <div className="flex">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <GiHamburgerMenu className="h-5 w-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-sreen bg-white">
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
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="ml-2">Hello, {user.fullName}</div>
              </div>
              <div>{user.userData?.point}</div>
            </div>
          </>
        ) : (
          <>
            <a href="/login">
              <button className="bg-[#0D6EFD] p-2 text-white rounded-[8px]">
                Login
              </button>
            </a>
            <a href="/register">
              <button className="ml-5 bg-[#0D6EFD] p-2 text-white rounded-[8px]">
                Register
              </button>
            </a>
          </>
        )}
      </nav>
    </>
  );
}
