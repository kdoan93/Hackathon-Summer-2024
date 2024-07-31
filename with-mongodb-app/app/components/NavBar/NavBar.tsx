import React from "react";

function NavBar() {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <img src="/images/sustainlogo-peach.png" className="h-20 w-20"></img>
          <a className="btn btn-ghost text-xl text-dark-brown">Sustain</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
