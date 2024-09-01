import { useState, useEffect } from "react";

// Define breakpoints for different device types
const MOBILE_BREAKPOINT = 768; // 768px or below is considered mobile
const TABLET_BREAKPOINT = 1024; // 1024px or below is considered tablet

// Hook to determine device type
const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState<"desktop" | "mobile" | "tablet">(
    "desktop"
  );

  useEffect(() => {
    // Function to determine device type based on window width
    const determineDeviceType = () => {
      const width = window.innerWidth;

      if (width <= MOBILE_BREAKPOINT) {
        setDeviceType("mobile");
      } else if (width <= TABLET_BREAKPOINT) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    determineDeviceType(); // Determine initial device type

    // Add event listener to handle window resizing
    window.addEventListener("resize", determineDeviceType);

    // Cleanup function to remove event listener on unmount
    return () => window.removeEventListener("resize", determineDeviceType);
  }, []);

  return deviceType;
};

export default useDeviceType;
