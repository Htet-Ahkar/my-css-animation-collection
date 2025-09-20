import { Rooms } from "@/components";

export default function Page() {
  return (
    <>
      {/* pre-section */}
      <section className="bg-base-300 h-[60vh]" />

      <section className="flex-center relative w-full flex-col">
        <Rooms />
      </section>

      {/* post-section */}
      <section className="bg-base-300 h-[80vh]" />
    </>
  );
}
