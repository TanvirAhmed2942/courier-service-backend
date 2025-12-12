"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

function SignupFrom() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    street: "",
    city: "",
    vehicle: "",
    vehicleNumber: "",
    role: "user", // user | agent
  });

  const isAgent = formData.role === "agent";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Build payload for backend
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      address: [
        {
          street: formData.street,
          city: formData.city,
        },
      ],
      role: formData.role,
      ...(isAgent
        ? { vehicle: formData.vehicle, vehicleNumber: formData.vehicleNumber }
        : {}),
    };
    console.log("Signup payload:", payload);
    // TODO: call signup API
  };

  const handleRoleToggle = (checked) => {
    setFormData((prev) => ({
      ...prev,
      role: checked ? "agent" : "user",
      vehicle: checked ? prev.vehicle : "",
      vehicleNumber: checked ? prev.vehicleNumber : "",
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-2">
          Create Account
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Enter your details to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
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

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street</Label>
            <Input
              id="street"
              name="street"
              type="text"
              required
              placeholder="Street address"
              value={formData.street}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              type="text"
              required
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Role (User / Agent) */}
        <div className="flex items-center justify-between rounded-lg border border-border/60 p-3">
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
              Account Type
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Switch to Agent to add vehicle details
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 dark:text-gray-400">
              User
            </span>
            <Switch
              checked={isAgent}
              onCheckedChange={handleRoleToggle}
              aria-label="Toggle agent role"
            />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Agent
            </span>
          </div>
        </div>

        {/* Agent-only fields */}
        {isAgent && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicle">Vehicle</Label>
              <Input
                id="vehicle"
                name="vehicle"
                type="text"
                required={isAgent}
                placeholder="e.g., Bike"
                value={formData.vehicle}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicleNumber">Vehicle Number</Label>
              <Input
                id="vehicleNumber"
                name="vehicleNumber"
                type="text"
                required={isAgent}
                placeholder="e.g., A123"
                value={formData.vehicleNumber}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

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
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignupFrom;
