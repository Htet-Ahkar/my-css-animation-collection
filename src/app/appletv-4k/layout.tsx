import { AppleTV4KNavbar } from "@/components";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Nav */}
      <AppleTV4KNavbar />
      <main className="h-[200vh]">{children}</main>
    </>
  );
}
