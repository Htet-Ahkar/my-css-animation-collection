"use client";
import { AppleTV4KNavbar } from "@/components";
import Lenis from "lenis";
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

  return (
    <>
      <main className="screen flex-center flex-col">{children}</main>
    </>
  );
}
