import { Link } from "react-router-dom";
import { Home, Building2, LayoutDashboard, Shield, Moon, Sun, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage, LANGUAGES, LanguageCode } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full glass-effect border-b border-border/50">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        {/* Browser-like logo and title */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary via-accent to-primary animate-glow flex items-center justify-center shadow-lg">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-semibold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {t("app.title")}
          </span>
        </Link>

        {/* Browser-style tabs navigation */}
        <nav className="flex items-center gap-1">
          <Link to="/">
            <Button variant="ghost" size="sm" className="browser-tab gap-2 rounded-t-lg rounded-b-none h-9">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">{t("nav.home")}</span>
            </Button>
          </Link>
          
          <Link to="/properties">
            <Button variant="ghost" size="sm" className="browser-tab gap-2 rounded-t-lg rounded-b-none h-9">
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">{t("nav.properties")}</span>
            </Button>
          </Link>

          {user?.role === "agent" && (
            <Link to="/agent">
              <Button variant="ghost" size="sm" className="browser-tab gap-2 rounded-t-lg rounded-b-none h-9">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">{t("nav.dashboard")}</span>
              </Button>
            </Link>
          )}

          {user?.role === "superuser" && (
            <Link to="/admin">
              <Button variant="ghost" size="sm" className="browser-tab gap-2 rounded-t-lg rounded-b-none h-9">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">{t("nav.admin")}</span>
              </Button>
            </Link>
          )}
        </nav>

        {/* Browser controls */}
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full hover:bg-accent/20 transition-all"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full hover:bg-accent/20 transition-all">
                <Globe className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-effect z-[100]">
              {Object.entries(LANGUAGES).map(([code, { name }]) => (
                <DropdownMenuItem
                  key={code}
                  onClick={() => setLanguage(code as LanguageCode)}
                  className={language === code ? "bg-primary/10 text-primary font-medium" : ""}
                >
                  {name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={logout}
              className="ml-2 rounded-full border-primary/20 hover:border-primary hover:bg-primary/5"
            >
              {t("nav.logout")}
            </Button>
          ) : (
            <Link to="/login">
              <Button 
                size="sm" 
                className="ml-2 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                {t("nav.login")}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
