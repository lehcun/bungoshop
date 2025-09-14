import { SignInButton } from '@clerk/nextjs';
import React from 'react';

const SignIn = () => {
  return (
    // Setting this mode to 'modal' will open a modal on the current route
    <SignInButton mode="modal">
      <button className="hover:text-shop_dark_blue my-auto cursor-pointer">
        Login
      </button>
    </SignInButton>
  );
};

export default SignIn;
