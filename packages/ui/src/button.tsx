"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button = ({ children,  onClick }: ButtonProps) => {
  return (
    <button
      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none
      font-medium focus:ring-4 focus:ring-gray-300 rounded-lg text-sm mb-2 px-4 py-2 "
      onClick={onClick}
    >
      {children}
    </button>
  );
};
