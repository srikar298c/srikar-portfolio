"use client";

import { AnimatePresence } from "framer-motion";

import useDeviceType from "@/lib/use-device-type";
import MobileCard from "./mobile-cards";
import DesktopCards from "./desktop-cards";

export default function CardReveal({
  reveal,
  setReveal,
}: {
  reveal: boolean;
  setReveal: (value: boolean) => void;
}) {
  const device = useDeviceType();
  console.log(device, "device");

  return (
    <AnimatePresence>
      {reveal &&
        (device === "mobile" ? (
          <MobileCard reveal={reveal} setReveal={setReveal} />
        ) : (
          <DesktopCards reveal={reveal} setReveal={setReveal} />
        ))}
    </AnimatePresence>
  );
}
