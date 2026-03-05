"use client";

import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";
import { usePathname, useRouter } from "next/navigation";

type Props = { children: ReactNode };

function isPublicPath(pathname: string) {
  return pathname === "/" || pathname === "/login" || pathname.startsWith("/login/");
}

export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (isPublicPath(pathname)) {
      setChecking(false);
      return;
    }

    const sessionLoginFlag =
      typeof window !== "undefined" ? window.sessionStorage.getItem("ntulearn_signed_in") : null;
    if (sessionLoginFlag !== "1") {
      document.cookie = "ntulearn_logged_in=; Path=/; SameSite=Lax; Max-Age=0";
      signOut(auth).catch(() => undefined);
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      setChecking(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        document.cookie = "ntulearn_logged_in=; Path=/; SameSite=Lax; Max-Age=0";
        router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      }
      setChecking(false);
    });

    return () => unsub();
  }, [pathname, router]);

  if (checking) return null;

  return <>{children}</>;
}
