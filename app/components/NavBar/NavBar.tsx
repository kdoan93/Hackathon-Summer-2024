import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

interface NavBarProps {
  onLoginOpen: () => void;
  onSignupOpen: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onLoginOpen, onSignupOpen }) => {
  // const { data: session } = useSession();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

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
          {/* THIS SECTION IS THE DROPDOWN NOT SURE IF WE ARE USING DEPENDS IF BACKEND IS DONE */}
          <ul
            tabIndex={0}
            className="menu menu-lg dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            {session ? (
              <>
                <div>
                  <p>Welcome, {session.user?.name}</p>
                  <button onClick={() => signOut()}>Logout</button>
              </div>
                <li>
                  <a className="text-logo-orange">Profile</a>
                </li>
                <li>
                  <button className="text-logo-orange" onClick={() => signOut()}>Logout</button>
                </li>
              </>
            ) : (
              <>
                {/* <li>
                  <button className="text-logo-orange" onClick={() => signIn("google")}>Login with Google</button>
                </li>
                <li>
                  <button className="text-logo-orange" onClick={() => signIn("google")}>Sign Up with Google</button>
                </li> */}
                <li>
                  <button className="text-logo-orange" onClick={onLoginOpen}>Login</button>
                </li>
                <li>
                  <button className="text-logo-orange" onClick={onSignupOpen}>Sign Up</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
