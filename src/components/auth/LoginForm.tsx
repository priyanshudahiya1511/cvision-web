"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { googleAuthService, loginService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/auth.store";
import { useGoogleLogin } from "@react-oauth/google";

const LoginForm = () => {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const validate = () => {
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Invalid email address");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    setError("");

    try {
      const data = await loginService({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      setAuth(data.user, data.accessToken, data.refreshToken);

      router.push("/");
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const data = await googleAuthService(tokenResponse.access_token);
        setAuth(data.user, data.accessToken, data.refreshToken);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        router.push("/dashboard");
      } catch (err) {
        const error = err as { response?: { data?: { message?: string } } };
        setError(
          error.response?.data?.message ||
            "Something went wrong. Please try again.",
        );
      }
    },
    onError: () => {
      setError("Google login failed. Please try again.");
    },
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md flex flex-col">
        <CardHeader className="text-center mb-3">
          <h1 className="text-3xl font-bold text-primary">CVision</h1>
          <h2 className="text-xl font-semibold">Welcome back</h2>
          <p className="text-md text-muted-foreground">
            Sign in to your account
          </p>
        </CardHeader>
        <CardContent className="bg-card rounded-xl">
          <Button
            variant="outline"
            className="w-full py-4 mb-4"
            type="button"
            onClick={() => handleGoogleLogin()}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 16 16" fill="none">
              <path
                d="M15.68 8.18c0-.57-.05-1.11-.14-1.64H8v3.1h4.3a3.67 3.67 0 01-1.59 2.41v2h2.57c1.5-1.38 2.4-3.42 2.4-5.87z"
                fill="#4285F4"
              />
              <path
                d="M8 16c2.16 0 3.97-.71 5.3-1.93l-2.58-2a4.8 4.8 0 01-2.72.76 4.8 4.8 0 01-4.5-3.3H.84v2.06A8 8 0 008 16z"
                fill="#34A853"
              />
              <path
                d="M3.5 9.53a4.8 4.8 0 010-3.06V4.41H.84a8 8 0 000 7.18l2.66-2.06z"
                fill="#FBBC05"
              />
              <path
                d="M8 3.2a4.33 4.33 0 013.06 1.2l2.3-2.3A7.7 7.7 0 008 0 8 8 0 00.84 4.41L3.5 6.47A4.8 4.8 0 018 3.2z"
                fill="#EA4335"
              />
            </svg>
            <p className="text-[1.1rem]">Sign in with Google</p>
          </Button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm px-3 py-2 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-1.5 flex-col">
              <Label htmlFor="email" className="ml-1 text-[1.1rem]">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="priyanshu.dahiya@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5 flex-col">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="text-[1.1rem]">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
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

            <Button
              className="w-full py-4 mt-4"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                  <p className="text-lg font-medium text-white">
                    Signing in...
                  </p>
                </>
              ) : (
                <p className="text-[1.1rem] text-white">Sign in</p>
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-3">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
