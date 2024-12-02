import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Github, FileText, Home, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import ContactDropdown from './ContactDropdown';
import { motion, AnimatePresence } from 'framer-motion';

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <nav className="fixed w-full top-0 bg-card/80 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>

            {/* Desktop navigation */}
            <div className="hidden md:flex flex-1 justify-center">
              <div className="flex items-center space-x-8">
                <NavLink to="/" icon={<Home />} label="Home" />
                <NavLink to="/projects" icon={<Github />} label="Projects" />
                <NavLink to="/resume" icon={<FileText />} label="Resume" />
              </div>
            </div>

            <ThemeToggle />
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/50"
            >
              <div className="px-4 py-2 space-y-1 bg-card/80 backdrop-blur-sm">
                <MobileNavLink to="/" icon={<Home />} label="Home" onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavLink to="/projects" icon={<Github />} label="Projects" onClick={() => setIsMobileMenuOpen(false)} />
                <MobileNavLink to="/resume" icon={<FileText />} label="Resume" onClick={() => setIsMobileMenuOpen(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-1 mt-16 px-4">
        <Outlet />
      </main>

      <ContactDropdown />
    </div>
  );
};

const NavLink: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center px-3 py-2 text-muted-foreground hover:text-primary transition-colors"
  >
    <span className="w-5 h-5 mr-2">{icon}</span>
    {label}
  </Link>
);

const MobileNavLink: React.FC<{
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}> = ({ to, icon, label, onClick }) => (
  <Link
    to={to}
    className="flex items-center px-3 py-2 rounded-md text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
    onClick={onClick}
  >
    <span className="w-5 h-5 mr-2">{icon}</span>
    {label}
  </Link>
);

export default Layout;