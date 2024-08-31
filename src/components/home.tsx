"use client";

import React from "react";

import { FaTwitter } from "react-icons/fa";
import { FaGithub, FaLinkedin, FaNoteSticky } from "react-icons/fa6";
import { IoFolderSharp } from "react-icons/io5";
import CardReveal from "./cards";
import { FloatingDock } from "./ui/floating-deck";
import { BoxesCore } from "./ui/background-boxes";

export default function Home() {
  const [reveal, setReveal] = React.useState(false);
  return (
    <section className="w-screen relative h-screen p-14 flex flex-col justify-between overflow-hidden">
        <span></span>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center h-[140vh] w-[170vw] font-borney -skew-x-[48deg]   skew-y-[15deg]">
        <div className="absolute z-10 w-full h-full pointer-events-none inset-0  flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black_60%)]" />
        <h1 className="lg:text-[10rem] text-[4.5rem]  tracking-wide font-bold shadow-sm z-10">
          Swaraj Bachu
        </h1>
        <p className="text-[2rem] text-gray-500 z-10">Software Engineer</p>
        <BoxesCore className="z-0" />
      </div>
      <CardReveal setReveal={setReveal} reveal={reveal} />
      <FloatingDock
        desktopClassName="z-50 self-end"
        items={[
          {
            title: "Projects",
            icon: <IoFolderSharp />,
            href: "#",
            onClick: () => setReveal(true),
          },
          {
            title: "Articles",
            icon: <FaNoteSticky />,
            href: "https://notes.whizzy.pro",
          },
          {
            title: "Twitter",
            icon: <FaTwitter />,
            href: "https://x.com/swarajbachu",
          },
          {
            title: "LinkedIn",
            icon: <FaLinkedin />,
            href: "https://linkedin.com/in/swarajbachu",
          },
          {
            title: "Github",
            icon: <FaGithub />,
            href: "https://github.com/swarajbachu",
          },
        ]}
      />
    </section>
  );
}
