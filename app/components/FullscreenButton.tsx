"use client";

import { useState, useEffect } from "react";
import { Maximize, Minimize } from "lucide-react";
import { Button } from "./ui/button";

interface FullscreenButtonProps {
  targetId?: string;
  className?: string;
}

export function FullscreenButton({ targetId, className }: FullscreenButtonProps = {}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        const element = targetId
          ? document.getElementById(targetId)
          : document.documentElement;

        if (!element) {
          console.error("Target element not found:", targetId);
          return;
        }

        await element.requestFullscreen();

        // Force landscape on mobile devices
        if (window.screen.orientation && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          try {
            // @ts-ignore - ScreenOrientation.lock might not be available in all browsers
            await window.screen.orientation.lock('landscape').catch(() => {
              // Silently fail if orientation lock is not supported
            });
          } catch (e) {
            // Orientation lock might not be supported
          }
        }
      } else {
        await document.exitFullscreen();

        // Unlock orientation when exiting fullscreen
        if (window.screen.orientation) {
          try {
            // @ts-ignore - ScreenOrientation.unlock might not be available in all browsers
            window.screen.orientation.unlock();
          } catch (e) {
            // Silently fail
          }
        }
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error);
    }
  };

  return (
    <Button
      onClick={toggleFullscreen}
      size="icon"
      variant="ghost"
      className={className || "absolute top-4 right-4 z-50 bg-slate-800/80 hover:bg-slate-700/90 backdrop-blur-sm border border-slate-600/50 text-slate-200 hover:text-white shadow-lg"}
      title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
    >
      {isFullscreen ? (
        <Minimize className="w-5 h-5" />
      ) : (
        <Maximize className="w-5 h-5" />
      )}
    </Button>
  );
}
