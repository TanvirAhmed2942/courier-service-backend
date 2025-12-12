"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-8">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-2">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Enter your email and password to access your account
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-400 focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400"
            />
            <label
              htmlFor="remember"
              className="ml-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
            >
              Remember me
            </label>
          </div>
          <a
            href="#"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            Forgot Password
          </a>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          className={cn(
            "w-full h-12 rounded-lg",
            "bg-gray-900 dark:bg-white",
            "text-white dark:text-gray-900",
            "font-medium",
            "hover:bg-gray-800 dark:hover:bg-gray-100",
            "transition-all"
          )}
        >
          Sign In
        </Button>
      </form>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
        Don't have an account?{" "}
        <Link
          href="/auth/sign-up"
          className="text-blue-500 hover:text-blue-600"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
