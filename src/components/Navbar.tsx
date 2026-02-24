import { Link, useLocation } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Home, Search, PlusCircle, User, Sun, Moon, ChefHat } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useApp();
  const location = useLocation();

  const links = [
    { to: "/", icon: Home, label: "Feed" },
    { to: "/search", icon: Search, label: "Search" },
    { to: "/create", icon: PlusCircle, label: "Create" },
    { to: "/profile/u1", icon: User, label: "Profile" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <ChefHat className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">Savora</span>
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ to, icon: Icon, label }) => {
            const active = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                className={`relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{label}</span>
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg bg-primary/10"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </Link>
            );
          })}

          <button
            onClick={toggleDarkMode}
            className="ml-2 rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
