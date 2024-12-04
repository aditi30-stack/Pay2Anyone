import { type JSX } from "react";

export function Card({
  
  title,
  children,
  
}: {
  
  title: string;
  children: React.ReactNode;
  
}): JSX.Element {
  return (
    <div className="flex flex-col bg-white z-20 border border-gray-400 rounded-md py-4 px-4 mt-2 w-[40vw] ">
      <h1 className="text-center font-bold text-purple-500 text-2xl">
        {title}
        </h1>
        {children}


    </div>
  )
}
