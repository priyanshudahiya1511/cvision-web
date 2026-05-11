"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { forgotPasswordService } from "@/services/auth.service";

const ForgotPasswordForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);
    setError("");

    try {
      await forgotPasswordService({ email });
      localStorage.setItem("pendingEmail", email);
      router.push("/verify-forgot-otp");
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
          <h2 className="text-xl font-semibold">Forgot password</h2>
          <p className="text-md text-muted-foreground">
            Enter your email and we&apos;ll send you a reset OTP
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
              <Label htmlFor="email" className="ml-1 text-[1.1rem]">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="priyanshu.dahiya@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                disabled={isLoading}
              />
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
                  <p className="text-lg font-medium text-white">
                    Sending OTP...
                  </p>
                </>
              ) : (
                <p className="text-[1.1rem] text-white">Send OTP</p>
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

export default ForgotPasswordForm;
