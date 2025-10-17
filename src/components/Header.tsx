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
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t("app.title")}
          </span>
        </Link>

        <nav className="flex items-center gap-2 md:gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">{t("nav.home")}</span>
            </Button>
          </Link>
          
          <Link to="/properties">
            <Button variant="ghost" size="sm" className="gap-2">
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">{t("nav.properties")}</span>
            </Button>
          </Link>

          {user?.role === "agent" && (
            <Link to="/agent">
              <Button variant="ghost" size="sm" className="gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">{t("nav.dashboard")}</span>
              </Button>
            </Link>
          )}

          {user?.role === "superuser" && (
            <Link to="/admin">
              <Button variant="ghost" size="sm" className="gap-2">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">{t("nav.admin")}</span>
              </Button>
            </Link>
          )}

          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover">
              {Object.entries(LANGUAGES).map(([code, { name }]) => (
                <DropdownMenuItem
                  key={code}
                  onClick={() => setLanguage(code as LanguageCode)}
                  className={language === code ? "bg-accent" : ""}
                >
                  {name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <Button variant="outline" size="sm" onClick={logout}>
              {t("nav.logout")}
            </Button>
          ) : (
            <Link to="/login">
              <Button size="sm">{t("nav.login")}</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
