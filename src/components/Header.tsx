import React from "react";
import Logo from "./Logo";
import Login from "./Login";
import Search from "./Search";

const Header = () => {
  return (
    <div className="flex justify-between px-4 py-5 bg-white/70 sticky">
      <Logo />
      <Search />
      <Login />
    </div>
  );
};

export default Header;
