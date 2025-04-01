const Index = () => {
  return (
    <nav className="navbar glass sticky top-0 mt-16 w-screen border-b border-b-gray-400 p-0 text-black">
      {/* content */}
      <div className="flex-center container-lg justify-between px-6">
        {/* left */}
        {/* title */}
        <div className="text-xl font-semibold">
          <a href="">Apple TV 4K</a>
        </div>

        {/* right */}
        <div className="flex-center space-x-5 text-xs">
          {/* menu */}
          <ul className="flex-center space-x-4">
            <li className="relative cursor-pointer transition-all hover:opacity-75">
              Overview
              <div className="absolute bottom-[-20px] w-full border" />
            </li>
            <li className="cursor-pointer transition-all hover:opacity-75">
              Tech Specs
            </li>
          </ul>

          {/* buttom */}
          <div>
            <button className="btn btn-primary rounded-full font-light">
              <a href="">Buy</a>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Index;
