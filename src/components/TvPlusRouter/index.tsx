import TvPlusLogo from "@/../public/medias/appleTv-4k/logo_apple_tvplus_large.svg";
import Image from "next/image";
import { ArrowUpRight, ChevronRight } from "../SVGs";

const slowRiver = [
  {
    name: "1",
  },
  {
    name: "2",
  },
  {
    name: "3",
  },
  {
    name: "4",
  },
  {
    name: "5",
  },
  {
    name: "6",
  },
  {
    name: "7",
  },
  {
    name: "8",
  },
  {
    name: "9",
  },
];

const Index = () => {
  return (
    <>
      <div className="flex-center mx-5 w-7xl flex-col bg-black pt-16 text-white">
        {/* Content */}
        <div className="flex-center flex-col space-y-5">
          {/* Logo */}
          <div>
            <Image
              className="object-contain"
              alt="TvPlusLogo"
              src={TvPlusLogo}
              width={82}
              quality={100}
              sizes="100%"
            />
          </div>

          {/* Text */}
          <h3 className="text-[32px] leading-9 font-semibold tracking-wide">
            Get 3 months of Apple TV+ free
            <br />
            when you buy an Apple TV 4K.
            <sup className="align-super text-sm">
              <a href="">21</a>
            </sup>
          </h3>

          {/* Link */}
          <div className="flex space-x-3">
            <a
              href=""
              className="flex items-center -space-x-1 text-xl font-semibold text-blue-400 transition-all hover:underline"
            >
              Try it free
              <sup className="align-super text-xs">
                <a href="">22</a>
              </sup>
              <span>
                <ArrowUpRight />
              </span>
            </a>

            <a
              href=""
              className="flex items-center -space-x-1 text-xl font-semibold text-blue-400 transition-all hover:underline"
            >
              Learn More
              <sup />
              <span>
                <ChevronRight />
              </span>
            </a>
          </div>
        </div>

        {/* River */}
        <div className="pt-12.5">
          <div>slow r</div>
          <div>first r</div>
        </div>
      </div>
    </>
  );
};

export default Index;
