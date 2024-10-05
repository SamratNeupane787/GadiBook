"use client";
import React, { useState } from "react";
import { House, CarTaxiFront, CircleHelp, Menu, X } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

function Navbar() {
  const [nav, setNav] = useState(false);

  const handleNavToggle = () => setNav(!nav);

  return (
    <>
      <div className="flex items-center justify-between pt-8 pb-4 mx-8">
        <h1 className="text-4xl font-semibold">
          Gadi<span className="text-blue-500 underline">Book</span>
        </h1>
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12 items-center">
          <div className="flex gap-2 items-center">
            <House href="#" />
            Home
          </div>
          <div className="flex gap-2 items-center">
            <CarTaxiFront href="#" />
            Book ride
          </div>
          <div className="flex gap-2 items-center">
            <CircleHelp />
            Support
          </div>
          <UserButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={handleNavToggle}>
            {nav ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          nav ? "block" : "hidden"
        } md:hidden flex flex-col gap-6 items-center px-8 py-4 w-100vw h-100vh`}
      >
        <div className="flex gap-2 items-center h-1/2">
          <House href="#" />
          Home
        </div>
        <div className="flex gap-2 items-center  h-1/2">
          <CarTaxiFront href="#" />
          Book ride
        </div>
        <div className="flex gap-2 items-center  h-1/2">
          <CircleHelp />
          Support
        </div>
        <UserButton />
      </div>
    </>
  );
}

export default Navbar;
