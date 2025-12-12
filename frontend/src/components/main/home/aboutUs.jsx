"use client";

import React from "react";
import { Shield, Clock, Users, Award, Target, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const values = [
  {
    icon: Shield,
    title: "Reliable & Secure",
    description:
      "Your parcels are handled with utmost care and security throughout the journey",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description:
      "We ensure timely delivery with real-time tracking and efficient logistics",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "Your satisfaction is our priority. We're here to serve you better every day",
  },
  {
    icon: Award,
    title: "Trusted Service",
    description:
      "Years of experience and thousands of satisfied customers trust us",
  },
];

const stats = [
  { number: "10K+", label: "Happy Customers" },
  { number: "50K+", label: "Parcels Delivered" },
  { number: "99%", label: "Success Rate" },
  { number: "24/7", label: "Support Available" },
];

function AboutUs() {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Us
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We are a trusted courier service dedicated to making parcel delivery
            simple, fast, and reliable. Our mission is to connect people and
            businesses through seamless logistics solutions.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                To revolutionize parcel delivery by providing fast, secure, and
                affordable courier services that exceed customer expectations.
                We strive to make shipping accessible to everyone, everywhere.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                To become the leading courier service provider, known for
                innovation, reliability, and exceptional customer service. We
                envision a future where distance is never a barrier to
                connection.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Our Core Values
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className={cn(
                    "text-center hover:shadow-lg transition-all duration-300",
                    "hover:-translate-y-1"
                  )}
                >
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Our Achievements
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Us?
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We combine cutting-edge technology with personalized service to
            deliver an unmatched courier experience. From booking to delivery,
            we're with you every step of the way, ensuring your parcels reach
            their destination safely and on time.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
