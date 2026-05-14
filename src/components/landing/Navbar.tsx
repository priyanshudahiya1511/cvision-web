"use client";

import useAuthStore from "@/store/auth.store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/ThemeToggle";

const Navbar = () => {
  const router = useRouter();

  const { isAuthenticated } = useAuthStore();

  return (
    <nav className="w-full border-b border-border bg-background px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center">
        {/* Left */}
        <div className="flex-1">
          <Link href="/">
            <h1 className="text-2xl font-bold text-primary">CVision</h1>
          </Link>
        </div>

        {/* Middle */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            How it works
          </Link>
        </div>

        {/* Right */}
        <div className="flex-1 flex items-center justify-end gap-3">
          <ThemeToggle />
          {isAuthenticated ? (
            <Button onClick={() => router.push("/dashboard")}>Dashboard</Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => router.push("/login")}>
                Sign in
              </Button>
              <Button onClick={() => router.push("/register")}>
                Get started
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
