import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Nav = () => {
  return (
    <div className="flex justify-around mt-4">
    <p className="font-semibold mb-0  text-2xl">Storage 3.0</p>
      <ConnectButton />
    </div>
  );
};

export default Nav;
