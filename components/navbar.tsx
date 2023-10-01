import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <NextUINavbar isBordered maxWidth="lg">
      <NavbarBrand>
        <p className="text-2xl font-semibold">TaskSphere</p>
      </NavbarBrand>

      <NavbarItem>
        <UserButton />
      </NavbarItem>
    </NextUINavbar>
  );
};

export default Navbar;
