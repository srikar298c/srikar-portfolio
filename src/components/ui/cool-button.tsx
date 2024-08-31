import { cn } from "@/lib/utils";
import React from "react";

type CoolButtonProps = React.HTMLAttributes<HTMLButtonElement> &
  Omit<React.HTMLAttributes<HTMLAnchorElement>, "className | children"> & {
    href?: string;
  };

export default function CoolButton({
  href,
  className,
  ...props
}: CoolButtonProps) {
  const ButtonElement: React.ElementType = href ? "a" : "button";

  return (
    <ButtonElement
      className={cn(
        `relative overflow-hidden rounded-lg
          bg-gradient-to-b from-zinc-800 to-zinc-900
          px-6 py-3 text-lg font-medium text-zinc-300
          transition-all duration-200 ease-out
          before:absolute before:inset-0 before:rounded-lg before:transition-all
          before:duration-200 before:ease-out
          hover:before:shadow-[inset_0_-1px_3px_1px_rgba(0,0,0,0.4),inset_0_1px_1px_1px_rgba(255,255,255,0.1)] before:shadow-[inset_0_-2px_4px_1px_rgba(0,0,0,0.4),inset_0_2px_2px_1px_rgba(255,255,255,0.1)] hover:text-zinc-200
          `,
        className
      )}
      href={href}
      {...props}
    />
  );
}
