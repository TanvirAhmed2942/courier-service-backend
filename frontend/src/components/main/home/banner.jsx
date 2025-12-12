import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
function Banner() {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      <Image
        src="/home_banner.webp"
        alt="Banner"
        width={1000}
        height={1000}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4">
        <div className="text-center min-w-2xl space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Track Your Shipment Anywhere, Anytime
          </h1>

          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Enter your tracking number"
              className="text-white placeholder:text-white/50"
            />
            <Button variant="outline">Track</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
