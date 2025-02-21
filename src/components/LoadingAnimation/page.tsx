import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const LoadingAnimation = () => {
  const [loading, setLoading] = useState(false);

  // Pastikan router diinisialisasi dengan benar
  const router = typeof window !== "undefined" ? useRouter() : null;

  useEffect(() => {
    if (!router) return;

    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent animate-spin"></div>
        <div className="mt-4 text-white text-center">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
