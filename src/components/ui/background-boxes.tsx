"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {

  const [rows, setRows] = useState<number[]>([]);
  const [cols, setCols] = useState<number[]>([]);

  // Function to calculate rows and columns based on screen size
  const calculateGrid = () => {
    const rowHeight = 20; // Adjust the row height as needed
    const colWidth = 20; // Adjust the column width as needed

    // Calculate number of rows and columns based on screen size
    const numRows = Math.floor(window.innerHeight / rowHeight);
    const numCols = Math.floor(window.innerWidth / colWidth);

    console.log(numRows, numCols);

    // Fill arrays with 1 based on calculated rows and columns
    setRows(new Array(numRows).fill(1));
    setCols(new Array(numCols).fill(1));
  };

  // useEffect to run the calculation on component mount and on resize
  useEffect(() => {
    calculateGrid(); // Initial calculation

    window.addEventListener("resize", calculateGrid); // Recalculate on resize

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  let colors = [
    "--sky-300",
    "--pink-300",
    "--green-300",
    "--red-300",
    "--purple-300",
    "--blue-300",
    "--indigo-300",
    "--violet-300",
  ];
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={
        {
          // transform: `translate(-40%,-60%) skewX(-48deg) skewY(15deg) scale(0.675) rotate(0deg) translateZ(0)`,
        }
      }
      className={cn(
        "absolute isolate left-1/4 p-4 -top-1/4 flex  -translate-x-1/2 -translate-y-1/2 w-full h-full -z-0 ",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row` + i}
          className="w-16 h-8  border-l  border-zinc-900 relative"
        >
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: `var(${getRandomColor()})`,
                transition: { duration: 0 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col` + j}
              className="w-16 h-8  border-r border-t border-zinc-900 relative"
            >
              {j % 2 === 0 && i % 2 === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[12px] -left-[22px] text-zinc-600 stroke-[1px] pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
