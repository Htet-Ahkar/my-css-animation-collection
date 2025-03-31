import { AppleTV4KHeroLarge, TvPerformance } from "@/components";

export default function Page() {
  return (
    <>
      <section className="screen z-10 bg-white">
        <Intro />
      </section>

      <section
        className="relative -mt-[100vh] size-full h-[300vh] bg-black text-white"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <TvPerformance />
        {/* <AppleTV4KHeroLarge /> */}
      </section>

      <section>
        <div className="flex-center h-screen text-[2vw]">
          <h2 className="max-w-[45%] text-center leading-none">Thank You</h2>
        </div>
      </section>
    </>
  );
}

function Intro() {
  return (
    <div className="flex-center h-screen text-[2vw]">
      <h2 className="max-w-[45%] text-center leading-none">Please Scroll</h2>
    </div>
  );
}
