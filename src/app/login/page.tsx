"use client";
export const dynamic = 'force-dynamic';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { auth } from "@/lib/firebaseClient";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();

  const getAuthErrorMessage = (code?: string) => {
    switch (code) {
      case "auth/configuration-not-found":
        return "Sign-in provider not configured. Enable Google (and Email/Password) in Firebase Authentication and add localhost to Authorized domains.";
      case "auth/operation-not-allowed":
        return "This sign-in method is disabled. Enable it in Firebase Authentication → Sign-in method.";
      case "auth/unauthorized-domain":
        return "This domain is not authorized. Add localhost (and your dev host) in Firebase Authentication → Settings → Authorized domains.";
      case "auth/invalid-api-key":
        return "Invalid Firebase API key. Verify your .env.local values and restart the dev server.";
      case "auth/network-request-failed":
        return "Network error during authentication. Check your connection and try again.";
      case "auth/popup-blocked":
        return "The sign-in popup was blocked. Allow popups for this site or try another browser.";
      case "auth/popup-closed-by-user":
        return "The sign-in popup was closed before completing. Please try again.";
      case "auth/user-not-found":
        return "No account found for this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/too-many-requests":
        return "Too many attempts. Please wait a moment and try again.";
      case "auth/email-already-in-use":
        return "Email already in use. Try signing in instead.";
      case "auth/invalid-credential":
        return "Invalid credentials. Please try again.";
      default:
        return "Authentication failed. Please try again.";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { email, password, confirmPassword } = formData;
      if (isLogin) {
        // Sign in existing user
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Basic client-side check before creating account
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        await createUserWithEmailAndPassword(auth, email, password);
        // You could also update profile/displayName using formData.name here
      }
      // Mark user as signed in for client-side guards
      if (typeof window !== "undefined") {
        localStorage.setItem("hexon_signed_in", "true");
      }
      // Redirect to onboarding after successful auth
      router.push("/onboarding");
    } catch (err: any) {
      const message = getAuthErrorMessage(err?.code);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      if (typeof window !== "undefined") {
        localStorage.setItem("hexon_signed_in", "true");
      }
      router.push("/onboarding");
    } catch (err: any) {
      const message = getAuthErrorMessage(err?.code);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-primary-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-transparent" />
      {/* Subtle radial glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(155,135,255,0.12),_transparent_60%)]" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Back to Home Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-secondary-text hover:text-primary-text transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to HEXON
        </Link>

        <Card className="bg-secondary-background/80 backdrop-blur-md border-border-gray/60 shadow-2xl rounded-2xl ring-1 ring-white/5">
          <CardHeader className="space-y-4 text-center">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-accent-purple/90 to-accent-purple/70 shadow-lg ring-1 ring-accent-purple/30">
                <svg
                  className="w-10 h-10 drop-shadow"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="translate(50 50)">
                    <path
                      d="M 35,17.5 A 17.5,17.5 0 0 1 35,-17.5"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      transform="rotate(0)"
                    />
                    <path
                      d="M 35,17.5 A 17.5,17.5 0 0 1 35,-17.5"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      transform="rotate(60)"
                    />
                    <path
                      d="M 35,17.5 A 17.5,17.5 0 0 1 35,-17.5"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      transform="rotate(120)"
                    />
                    <path
                      d="M 35,17.5 A 17.5,17.5 0 0 1 35,-17.5"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      transform="rotate(180)"
                    />
                    <path
                      d="M 35,17.5 A 17.5,17.5 0 0 1 35,-17.5"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      transform="rotate(240)"
                    />
                    <path
                      d="M 35,17.5 A 17.5,17.5 0 0 1 35,-17.5"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      transform="rotate(300)"
                    />
                  </g>
                </svg>
              </div>
            </div>
            
            <CardTitle className="text-2xl sm:text-3xl font-bold text-primary-text tracking-tight">
              {isLogin ? "Welcome Back" : "Join HEXON"}
            </CardTitle>
            <CardDescription className="text-secondary-text leading-relaxed">
              {isLogin 
                ? "Sign in to your account to continue learning" 
                : "Create your account to start your learning journey"
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-primary-text">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-text" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10 h-11 rounded-lg bg-primary-background border-border-gray text-primary-text placeholder:text-secondary-text hover:border-accent-purple/60 focus:border-accent-purple focus:ring-2 focus:ring-accent-purple"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary-text">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-text" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 h-11 rounded-lg bg-primary-background border-border-gray text-primary-text placeholder:text-secondary-text hover:border-accent-purple/60 focus:border-accent-purple focus:ring-2 focus:ring-accent-purple"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-primary-text">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-text" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-11 rounded-lg bg-primary-background border-border-gray text-primary-text placeholder:text-secondary-text hover:border-accent-purple/60 focus:border-accent-purple focus:ring-2 focus:ring-accent-purple"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-text hover:text-primary-text transition-colors p-1 rounded-md hover:bg-secondary-background/60"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-primary-text">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-text" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10 h-11 rounded-lg bg-primary-background border-border-gray text-primary-text placeholder:text-secondary-text hover:border-accent-purple/60 focus:border-accent-purple focus:ring-2 focus:ring-accent-purple"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex justify-end">
                  <Link 
                    href="#" 
                    className="text-sm text-accent-purple hover:text-accent-purple/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-accent-purple to-accent-purple/80 hover:from-accent-purple/90 hover:to-accent-purple text-white font-medium py-2.5 transition-all shadow-lg shadow-accent-purple/30 hover:shadow-accent-purple/40 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (isLogin ? "Signing In..." : "Creating Account...") : (isLogin ? "Sign In" : "Create Account")}
              </Button>
            </form>

            {error && (
              <div className="text-center text-sm text-red-500">
                {error}
              </div>
            )}

            <div className="relative">
              <Separator className="bg-border-gray" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-secondary-background px-4 text-sm text-secondary-text">
                  or continue with
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={handleGoogleSignIn}
                className="group bg-primary-background border-border-gray text-primary-text hover:bg-secondary-background hover:border-accent-purple/40 transition-colors shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4 mr-2 transition-transform group-hover:scale-105" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                className="group bg-primary-background border-border-gray text-primary-text hover:bg-secondary-background hover:border-accent-purple/40 transition-colors shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4 mr-2 transition-transform group-hover:scale-105" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>

            <div className="text-center">
              <span className="text-secondary-text">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-accent-purple hover:text-accent-purple/80 font-medium transition-colors underline-offset-4 hover:underline"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-secondary-text">
          <p>
            By continuing, you agree to HEXON's{" "}
            <Link href="#" className="text-accent-purple hover:text-accent-purple/80 transition-colors underline-offset-4 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-accent-purple hover:text-accent-purple/80 transition-colors underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
