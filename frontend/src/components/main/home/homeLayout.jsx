import React from "react";
import Banner from "./banner";
import HowItWorks from "./howitWorks";
import AboutUs from "./aboutUs";
import ContactUs from "./contactUs";
function HomeLayout() {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <AboutUs />
      <ContactUs />
    </div>
  );
}

export default HomeLayout;
