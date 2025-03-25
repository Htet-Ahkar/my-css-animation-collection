"use client";
import { usePathname, useRouter } from "next/navigation";

const pages = [
  {
    name: "home",
    route: "/",
  },
  {
    name: "scroll parallax",
    route: "/scroll-parallax",
  },
  {
    name: "zoom parallax",
    route: "/zoom-parallax",
  },
  {
    name: "Apple TV 4K Hero Section",
    route: "/appletv-4k-hero",
  },
  {
    name: "Split Vignette",
    route: "/split-vignettek",
  },
  {
    name: "Apple tv rooms",
    route: "/apple-tv-rooms",
  },
  {
    name: "Apple tv rooms",
    route: "/apple-tv-rooms",
  },
  {
    name: "Apple Tv Plus Router",
    route: "/apple-tv-plus-router",
  },
];

const Index = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (event: any) => {
    const value = event.target.value;
    if (value) router.push(value);
  };

  return (
    <header className="bg-neutral text-neutral-content flex-center absolute top-0 h-16 w-full p-3">
      <nav>
        {/* Select */}
        <select
          defaultValue={pathname}
          className="select text-neutral max-w-60"
          onChange={handleChange}
        >
          <option disabled={true}>Please pick a route</option>

          {pages.map((page, i) => (
            <option key={i} value={page.route}>
              {page.name}
            </option>
          ))}
        </select>
      </nav>
    </header>
  );
};

export default Index;
