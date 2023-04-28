import React from "react";
import ThemeToggle from "./theme-toggle";
import UserProfile from "./userProfile";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex h-16 items-center py-2">
      <Link href="/">
        <div className="ml-4 text-xl font-bold">TATTOOIT</div>
      </Link>
      <div className="ml-auto mr-4 flex items-center gap-4">
        <ThemeToggle />
        <UserProfile />
      </div>
    </div>
  );
};

export default Navbar;
