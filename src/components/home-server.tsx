import React from "react";
import { BoxesCore } from "./ui/background-boxes";

export default function HomeServer() {
  return (
    <div
      className="absolute  h-[200vh] w-[200vw]  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center font-borney -skew-x-[48deg]   skew-y-[15deg]"
     
    >
      <h1 className="lg:text-[10rem] text-[4.1rem]  tracking-wide font-bold shadow-sm z-10">
      Srikar kudurmalla
      </h1>
      <p className="text-[2rem] text-gray-500 z-10">Software Engineer</p>
      <BoxesCore className="z-0" />
    </div>
  );
}
