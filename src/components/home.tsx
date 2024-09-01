"use client";

import React, { useEffect, useState } from "react";

import { FaTwitter } from "react-icons/fa";
import { FaGithub, FaLinkedin, FaNoteSticky } from "react-icons/fa6";
import { IoFolderSharp } from "react-icons/io5";
import CardReveal from "./cards/cards";
import { FloatingDock } from "./ui/floating-deck";
import { BoxesCore } from "./ui/background-boxes";
import HomeServer from "./home-server";

export default function Home() {
  const [reveal, setReveal] = React.useState(false);

  return (
    <section className="w-dvw relative h-dvh p-14 flex flex-col justify-between overflow-hidden">
      <span />
      <div className="absolute z-10 w-full h-full pointer-events-none inset-0  flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black_90%)] md:[mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_95%)]" />
      <HomeServer />
      <CardReveal setReveal={setReveal} reveal={reveal} />
      <FloatingDock
        desktopClassName="z-50 self-end"
        mobileClassName="z-[9999] fixed bottom-4 left-4"
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
