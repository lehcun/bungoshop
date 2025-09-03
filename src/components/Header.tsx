import React from 'react';
import Logo from './Logo';
import Search from './Search';
import UserActions from './UserActions';

const Header = () => {
  return (
    <div className="sticky top-0 z-50 bg-white/70">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <Logo />
        <Search />
        <UserActions />
      </header>
    </div>
  );
};

export default Header;
