"use client";

import { usePathname } from "next/navigation";
import BottomNav from "./BottomNav";

const HIDDEN_ROUTES = ["/login", "/register"]; // Add more if needed

export default function ClientWrapper() {
  const pathname = usePathname();

  const shouldHideNav = HIDDEN_ROUTES.includes(pathname);

  if (shouldHideNav) return null;

  return <BottomNav />;
}
