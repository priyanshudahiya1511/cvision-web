"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { resetPasswordService } from "@/services/auth.service";

const ResetPasswordForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const validate = () => {
    if (!formData.newPassword) {
      setError("Password is required");
      return false;
    }
    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const resetToken =
      typeof window !== "undefined"
        ? localStorage.getItem("resetToken") || ""
        : "";

    if (!resetToken) {
      setError("Reset token not found. Please try again.");
      router.push("/forgot-password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await resetPasswordService({
        resetToken,
        newPassword: formData.newPassword,
      });

      localStorage.removeItem("resetToken");
      localStorage.removeItem("pendingEmail");

      router.push("/login");
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md flex flex-col">
        <CardHeader className="text-center mb-3">
          <h1 className="text-3xl font-bold text-primary">CVision</h1>
          <h2 className="text-xl font-semibold">Reset your password</h2>
          <p className="text-md text-muted-foreground">
            Enter your new password below
          </p>
        </CardHeader>

        <CardContent className="bg-card rounded-xl">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm px-3 py-2 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form className="space-y-4">
            <div className="space-y-1.5 flex-col">
              <Label htmlFor="newPassword" className="ml-1 text-[1.1rem]">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 6 characters"
                  value={formData.newPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1.5 flex-col">
              <Label htmlFor="confirmPassword" className="ml-1 text-[1.1rem]">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              className="w-full py-4 mt-4"
              type="button"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                  <p className="text-lg font-medium text-white">Resetting...</p>
                </>
              ) : (
                <p className="text-[1.1rem] text-white">Reset password</p>
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-3">
              Remember your password?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Back to login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;
