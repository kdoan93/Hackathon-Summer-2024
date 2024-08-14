import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignOutButton,
} from "@clerk/nextjs";

const NavBar = () => {
  const router = useRouter();

  // Function to check if the current route matches the link's href
  const isActive = (href: string) => router.pathname === href;

  return (
    <div className="nav-container fixed top-0 left-0 right-0 bg-base-100 p h-16">
      <Link href="/">
        <img
          src="/images/sustainlogo-peach.png"
          className="h-24 w-24 fixed top-5 left-5 transition-all duration-300 ease-in-out transform hover:shadow-[0_0_20px_10px_rgba(255,255,255,0.8)] hover:rounded-full active:scale-95"
          alt="Sustain Logo"
        />
      </Link>
      <div className="navbar h-12 pl-24">
        <div className="flex-1"></div>
        <SignedIn>
          <div className="text-logo-orange flex items-center">
            <UserButton />
            <Link
              className={`pl-3 btn btn-ghost text-xl ${isActive("/dashboard") ? "text-logo-orange" : "text-gray-600"}`}
              href="/dashboard"
            >
              Dashboard
            </Link>
            <Link
              className={`pl-3 btn btn-ghost text-xl ${isActive("/meal-input") ? "text-logo-orange" : "text-gray-600"}`}
              href="/meal-input"
            >
              Meal Input
            </Link>
          </div>
          <div>
            <a className="navbar-user text-dark-brown pl-3 flex float-end btn btn-ghost text-xl">
              <SignOutButton redirectUrl="/" />
            </a>
          </div>
        </SignedIn>
        <SignedOut>
          <div>
            <Link
              className={`pl-3 btn btn-ghost text-xl text-black bg-logo-orange hover:text-white animate-pulse`}
              href="/meal-input"
            >
              Try Now!
            </Link>
            <div className="navbar-user pl-3 btn btn-ghost text-xl text-logo-orange">
              <SignInButton>Sign In</SignInButton>
            </div>
          </div>
        </SignedOut>
      </div>
      <style>
        {`
        @media(max-width:768px){
          .navbar-user {
            margin-right: 20px;
          }

          .navbar a {
            padding: 0 5px;
            font-size: .75rem;
            font-weight: 700;
          }
        }
        `}
      </style>
    </div>
  );
};

export default NavBar;

// https://accounts.google.com/o/oauth2/auth/oauthchooseaccount
// ?access_type=offline
// &client_id=787459168867-0v2orf3qo56uocsi84iroseoahhuovdm.apps.googleusercontent.com
// &prompt=consent
// &redirect_uri=https%3A%2F%2Fclerk.shared.lcl.dev%2Fv1%2Foauth_callback
// &response_type=code
// &scope=openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile
// &state=g4gaugm4b0s4exocvvd2nvijffq6b31sd1jde8b3
// &service=lso
// &o2v=1
// &ddm=0
// &flowName=GeneralOAuthFlow
