"use client";

import React from "react";
import {
  GooeyMenu,
  GooeyMenuAfter,
  GooeyMenuBefore,
  GooeyMenuTrigger,
} from "@/components/ui/gooey.menu";
import { FaQuestion, FaPlus } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoFolderSharp } from "react-icons/io5";
import CardReveal from "./cards";

export default function Home() {
  const [reveal, setReveal] = React.useState(false);
  return (
    <main
      className="w-screen relative
   h-screen grid items-end justify-center "
    >
      <CardReveal setReveal={setReveal} reveal={reveal} />
      <GooeyMenu className="w-[50px] h-[350px]">
        <GooeyMenuBefore>
          <button
          className="w-full h-full items-center justify-center flex"
          onClick={() => setReveal(true)}>
            <IoFolderSharp />
          </button>
          <FaQuestion />
        </GooeyMenuBefore>
        <GooeyMenuAfter>
          <FaGear />
          <FaQuestion />
        </GooeyMenuAfter>
        <GooeyMenuTrigger
          className="peer-checked:rotate-45 peer-checked:bg-red-500 peer-checked:text-white"
          id="sharedemo"
        >
          <FaPlus />
        </GooeyMenuTrigger>
      </GooeyMenu>
    </main>
  );
}
