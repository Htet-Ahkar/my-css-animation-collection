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
];

const Index = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (event: any) => {
    const value = event.target.value;
    if (value) router.push(value);
  };

  return (
    <header className="bg-neutral text-neutral-content flex-center absolute top-0 w-full p-3">
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
