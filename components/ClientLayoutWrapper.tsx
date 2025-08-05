'use client';

import { usePathname } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import { ReactNode } from "react";

const HIDE_NAV_ROUTES = ["/login", "/signup", "/otp"];

export default function ClientLayoutWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const shouldHideBottomNav = HIDE_NAV_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {children}
      {!shouldHideBottomNav && <BottomNav />}
    </>
  );
}
