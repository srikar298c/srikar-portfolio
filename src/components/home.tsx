"use client";

import React from "react";

import { FaTwitter } from "react-icons/fa";
import { FaGithub, FaLinkedin, FaNoteSticky } from "react-icons/fa6";
import { IoFolderSharp } from "react-icons/io5";
import CardReveal from "./cards";
import { FloatingDock } from "./ui/floating-deck";

export default function Home() {
  const [reveal, setReveal] = React.useState(false);
  return (
    <section className="w-screen relative h-screen grid items-end justify-center p-14">
      <CardReveal setReveal={setReveal} reveal={reveal} />
      <FloatingDock
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
