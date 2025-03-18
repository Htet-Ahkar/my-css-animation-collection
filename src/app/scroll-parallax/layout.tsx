"use client";

import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return <main className="bg-base-300 pt-[85vh] pb-[100vh]">{children}</main>;
}
