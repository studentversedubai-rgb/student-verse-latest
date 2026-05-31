import { useEffect, useState } from "react";
import "./AnimatedBackground.css";

export default function AnimatedBackground() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileDevice, setIsMobileDevice] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const updateDeviceMode = () => setIsMobileDevice(mediaQuery.matches);

    updateDeviceMode();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateDeviceMode);
    } else {
      mediaQuery.addListener(updateDeviceMode);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updateDeviceMode);
      } else {
        mediaQuery.removeListener(updateDeviceMode);
      }
    };
  }, []);

  useEffect(() => {
    if (isMobileDevice) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileDevice]);

  if (isMobileDevice) {
    return <div className="animated-bg animated-bg--mobile" />;
  }

  // Parallax offsets for live wallpaper effect
  const nebulaOffset = scrollY * 0.1;
  const starOffset = scrollY * 0.25;
  const dustOffset = scrollY * 0.35;
  const swirlOffset = scrollY * 0.05;
  const galaxyOffset = scrollY * 0.4;

  return (
    <div className="animated-bg">
      {/* Nebula clouds with parallax */}
      <div 
        className="nebula-container" 
        style={{ transform: `translateY(${nebulaOffset}px)` }}
      >
        <div className="nebula nebula-1"></div>
        <div className="nebula nebula-2"></div>
        <div className="nebula nebula-3"></div>
        <div className="nebula nebula-4"></div>
        <div className="nebula nebula-5"></div>
      </div>

      {/* Nebula swirls with parallax */}
      <div 
        className="swirl swirl-1" 
        style={{ transform: `translateY(${swirlOffset}px)` }}
      ></div>
      <div 
        className="swirl swirl-2" 
        style={{ transform: `translateY(${swirlOffset * 1.2}px)` }}
      ></div>

      {/* Stars with parallax */}
      <div 
        className="stars" 
        style={{ transform: `translateY(${starOffset}px)` }}
      ></div>

      {/* Shooting stars */}
      <div className="shooting-stars">
        <div className="shooting-star shooting-star-1"></div>
        <div className="shooting-star shooting-star-2"></div>
        <div className="shooting-star shooting-star-3"></div>
        <div className="shooting-star shooting-star-4"></div>
      </div>

      {/* Galaxies with parallax */}
      <div 
        className="galaxy galaxy-1" 
        style={{ transform: `translateY(${galaxyOffset * 0.8}px)` }}
      ></div>
      <div 
        className="galaxy galaxy-2" 
        style={{ transform: `translateY(${galaxyOffset * 1.1}px)` }}
      ></div>
      <div 
        className="galaxy galaxy-3" 
        style={{ transform: `translateY(${galaxyOffset * 0.6}px)` }}
      ></div>
      <div 
        className="galaxy galaxy-4" 
        style={{ transform: `translateY(${galaxyOffset * 0.9}px)` }}
      ></div>
      <div 
        className="galaxy galaxy-5" 
        style={{ transform: `translateY(${galaxyOffset * 0.7}px)` }}
      ></div>

      {/* Dust with parallax */}
      <div 
        className="dust" 
        style={{ transform: `translateY(${dustOffset}px)` }}
      ></div>

      {/* Vignette */}
      <div className="vignette"></div>
    </div>
  );
}
