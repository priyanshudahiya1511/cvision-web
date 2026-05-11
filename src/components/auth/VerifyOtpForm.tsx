"use client";
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import useAuthStore from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { verifyOtpService } from "@/services/auth.service";

const VerifyOtpForm = () => {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const email =
    typeof window !== "undefined"
      ? localStorage.getItem("pendingEmail") || ""
      : "";

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpString = otp.join("");

    if (otpString.length < 4) {
      setError("Please enter the complete 4-digit OTP");
      return;
    }

    if (!email) {
      setError("Email not found. Please register again.");
      router.push("/register");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const data = await verifyOtpService({ email, otp: otpString });

      setAuth(data.user, data.accessToken, data.refreshToken);

      localStorage.removeItem("pendingEmail");

      router.push("/dashboard");
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(
        error.response?.data?.message || "Invalid OTP. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    router.push("/register");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md flex flex-col">
        <CardHeader className="text-center mb-3">
          <h1 className="text-3xl font-bold text-primary">CVision</h1>
          <h2 className="text-xl font-semibold">Verify your email</h2>
          <p className="text-md text-muted-foreground">
            We sent a 4-digit code to{" "}
            <span className="text-primary font-medium">
              priyanshu@gmail.com
            </span>
          </p>
        </CardHeader>

        <CardContent className="bg-card rounded-xl">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm px-3 py-2 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="flex gap-3 justify-center my-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isLoading}
                className="w-14 h-14 text-center text-xl font-semibold border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            ))}
          </div>

          <Button
            className="w-full py-4"
            type="button"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 text-white animate-spin" />
                <p className="text-lg font-medium text-white">Verifying...</p>
              </>
            ) : (
              <p className="text-[1.1rem] text-white">Verify OTP</p>
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={handleResend}
            >
              Resend OTP
            </button>
          </p>

          <p className="text-center text-sm text-muted-foreground mt-2">
            <Link href="/register" className="text-primary hover:underline">
              Back to register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtpForm;
