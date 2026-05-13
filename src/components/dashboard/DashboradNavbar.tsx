"use client";

import { logoutService } from "@/services/auth.service";
import useAuthStore from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/ThemeToggle";

const DashboradNavbar = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutService();
      logout();
      router.push("/login");
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      console.log(error.response?.data?.message || "An error occurred");
    }
  };

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="w-full border-b border-border bg-background px-6 py-4">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">CVision</h1>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-xs font-medium text-primary">
            {user?.name ? getInitials(user.name) : "U"}
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default DashboradNavbar;
