import React from "react";
import { useUser } from '@auth0/nextjs-auth0/client';

interface NavBarProps {
  onLoginOpen: () => void;
  onSignupOpen: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onLoginOpen, onSignupOpen }) => {
  const { user } = useUser();

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <img
            src="/images/sustainlogo-peach.png"
            className="h-24 w-24"
            alt="Sustain Logo"
          />
          <a className="btn btn-ghost text-xl text-dark-brown">Sustain</a>
        </div>
        <div className="dropdown dropdown-end text-logo-orange">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-lg dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            {user ? (
              <>
                <li>
                  <a href="/api/auth/logout" className="text-logo-orange">Logout</a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button className="text-logo-orange" onClick={onLoginOpen}>Login</button>
                </li>
                <li>
                  <button className="text-logo-orange" onClick={onSignupOpen}>Sign Up</button>
                </li>
                <li>
                  <a href="/api/auth/login" className="text-logo-orange">Login</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
