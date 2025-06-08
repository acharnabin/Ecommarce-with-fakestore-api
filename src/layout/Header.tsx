import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, useNavigate } from "react-router";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { ShoppingCart, UserCircle } from "lucide-react";

export function Header() {
  const [sessionData, setSessionData] = React.useState<Session | null>(null);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Unable to logout");
      return;
    }

    navigate("/login");
  };

  //   const getUser = async () => {
  //     const { data } = await supabase.auth.getSession();
  //     console.log(data);
  //     setSessionData(data.session);
  //   };

  React.useEffect(() => {
    // set up auth listener
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      if (event === "SIGNED_IN") {
        setSessionData(session);
      } else if (event === "SIGNED_OUT") {
        setSessionData(null);
      } else {
        setSessionData(null);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="w-full border-b bg-white dark:bg-background dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Store Name */}
        <Link to="/" className="text-xl font-bold tracking-tight text-primary">
          ShopMate
        </Link>

        {/* Navigation Links */}
        <NavigationMenu>
          <NavigationMenuList className="space-x-6">
            <NavigationMenuItem>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/products" className="hover:underline">
                Products
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Section: Auth / Cart */}
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6" />
            {/* Optional: cart count badge */}
            {/* <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">3</span> */}
          </Link>

          {sessionData?.user ? (
            <div className="flex items-center space-x-2">
              <UserCircle className="w-6 h-6" />
              <span className="text-sm hidden sm:block">
                {sessionData.user.email}
              </span>
              <Button onClick={handleSignOut} variant="destructive">
                Log out
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
