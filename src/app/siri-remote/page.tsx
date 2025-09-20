import { SiriRemoteModel } from "@/components";

export default function Page() {
  return (
    <>
      <section className="h-[60vh] w-screen" />

      <section className="size-full pt-52">
        <SectionText />
        <SiriRemoteModel />
      </section>

      <section className="glass z-10 h-[80vh] w-screen" />
    </>
  );
}

const SectionText = () => {
  return (
    <div className="flex-col-center w-full font-semibold">
      <h2 className="text-2xl">Siri Remote</h2>

      <h3 className="text-[80px] leading-20">Talk about control.</h3>
    </div>
  );
};
