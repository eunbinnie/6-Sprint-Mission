import Link from "next/link";
import React from "react";
import type { UrlObject } from "url";
import type { ChildrenProps } from "@/src/types/common.interface";

interface LinkButtonProps extends ChildrenProps {
  href: string | UrlObject;
}

const LinkButton = ({ children, href }: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className="py-3 px-[23px] rounded-lg font-semibold bg-blue text-white flex justify-center items-center leading-[1.1]"
    >
      {children}
    </Link>
  );
};

export default LinkButton;
