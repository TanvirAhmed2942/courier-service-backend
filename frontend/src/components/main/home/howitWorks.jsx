"use client";

import React from "react";
import { UserPlus, UserCircle, Package, MapPin, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const steps = [
  {
    number: 1,
    title: "Create an Account",
    description: "Sign up quickly with your email and get started in minutes",
    icon: UserPlus,
  },
  {
    number: 2,
    title: "Complete Profile",
    description: "Add your personal details and address information",
    icon: UserCircle,
  },
  {
    number: 3,
    title: "Book Parcel",
    description: "Enter parcel details and schedule your shipment",
    icon: Package,
  },
  {
    number: 4,
    title: "Track Parcel",
    description: "Track your parcel anywhere, anytime with real-time updates",
    icon: MapPin,
  },
  {
    number: 5,
    title: "We Handle Delivery",
    description:
      "Our team ensures safe and timely delivery to your destination",
    icon: Truck,
  },
];

function HowItWorks() {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            How It Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Simple steps to get your parcel delivered
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative space-y-4">
                <Card
                  className={cn(
                    "flex items-start gap-6 relative z-10",
                    "hover:shadow-lg transition-all duration-300 py-2"
                  )}
                >
                  <CardContent className="flex items-start gap-6 p-6 w-full">
                    {/* Step Number & Icon */}
                    <div className="shrink-0">
                      <div
                        className={cn(
                          "w-16 h-16 rounded-full flex items-center justify-center",
                          "bg-primary text-primary-foreground",
                          "relative"
                        )}
                      >
                        <Icon className="w-8 h-8" />
                        <div
                          className={cn(
                            "absolute -top-1 -right-1 w-6 h-6 rounded-full",
                            "bg-gray-900 dark:bg-white",
                            "text-white dark:text-gray-900",
                            "flex items-center justify-center",
                            "text-xs font-bold"
                          )}
                        >
                          {step.number}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <CardHeader className="p-0 pb-2">
                        <CardTitle className="text-xl">
                          Step {step.number}: {step.title}
                        </CardTitle>
                      </CardHeader>
                      <CardDescription className="text-base">
                        {step.description}
                      </CardDescription>
                    </div>
                  </CardContent>
                </Card>

                {/* Connector Line (except for last step) */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-8 bg-gray-300 dark:bg-gray-600 z-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
