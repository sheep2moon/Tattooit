import Link from "next/link";

import React from "react";
import { buttonVariants } from "./button";

type InnerLinkProps = {
  href: string;
  children: React.ReactNode;
};

const InnerLink = ({ href, children }: InnerLinkProps) => {
  return (
    <Link href={href} className={buttonVariants({ variant: "outline" })}>
      {children}
    </Link>
  );
};

export default InnerLink;
