export default function Index() {
  return (
    <>
      <Intro />
      <Footer />
    </>
  );
}

function Intro() {
  return (
    <div className="flex-center h-screen text-[2vw]">
      <h2 className="max-w-[45%] text-center leading-none">
        This is an example of a sticky footer made with CSS.
      </h2>
    </div>
  );
}

function Footer() {
  return (
    <div
      className="relative h-[800px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 h-[800px] w-full">
        <Content />
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="flex h-full w-full flex-col justify-between bg-[#4E4E5A] px-12 py-8">
      <Section1 />
      <Section2 />
    </div>
  );
}

const Section1 = () => {
  return (
    <div>
      <Nav />
    </div>
  );
};

const Section2 = () => {
  return (
    <div className="flex items-end justify-between">
      <h1 className="mt-10 text-[14vw] leading-[0.8]">Sticky Footer</h1>
      <p>©copyright</p>
    </div>
  );
};

const Nav = () => {
  return (
    <div className="flex shrink-0 gap-20">
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 text-[#ffffff80] uppercase">About</h3>
        <p>Home</p>
        <p>Projects</p>
        <p>Our Mission</p>
        <p>Contact Us</p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 text-[#ffffff80] uppercase">Education</h3>
        <p>News</p>
        <p>Learn</p>
        <p>Certification</p>
        <p>Publications</p>
      </div>
    </div>
  );
};
