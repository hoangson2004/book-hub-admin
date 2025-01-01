import React from 'react';
import './Shell.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface ShellProps {
  children: React.ReactNode;
}

const Shell: React.FC<ShellProps> = ({ children }) => {
  return (
    <div className="shell">
      <Header />
      <main className="shell-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Shell;
