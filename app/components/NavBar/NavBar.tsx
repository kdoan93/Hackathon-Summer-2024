import React from "react";
import Link from "next/link"; // Auth0
import { SignedIn, SignedOut, SignInButton, UserButton, SignOutButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";

interface NavBarProps {
  onLoginOpen: () => void;
  onSignupOpen: () => void;
}

const NavBar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="flex flex-row items-center justify-center" href="/">
          <img src="/images/sustainlogo-peach.png" className="h-24 w-24" alt="Sustain Logo" />
          <div className="text-2xl px-2 text-logo-orange">
            Sustain
          </div>
        </Link>
      </div>
      <li>
        <Link href="/meal-input">Meal Input</Link>
      </li>
      <div className="dropdown dropdown-end text-logo-orange">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </div>
        <ul tabIndex={0} className="menu menu-lg dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50">
          <SignedIn>
            <li>
              <UserButton />
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/prompt-tips">Prompt Tips</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <a className="text-logo-orange">
                <SignOutButton />
              </a>
            </li>
          </SignedIn>
          <SignedOut>
            <li>
              <a className="text-logo-orange">
                <SignInButton />
              </a>
            </li>
          </SignedOut>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
