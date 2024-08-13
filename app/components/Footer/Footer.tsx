import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full h-24 border-t border-gray-300 flex justify-center items-center">
      <p className="copyright text-logo-orange">© 2024 Sustain</p>
      <a className="px-4 text-logo-orange hover:underline" href="/about">About Us</a>
    </footer>
  );
};

export default Footer;
