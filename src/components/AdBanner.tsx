"use client";

import { useEffect, useRef } from "react";

export function AdBanner() {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src =
      "https://pl30377735.effectivecpmnetwork.com/d3dfe9a2f9dda76275a463faba9ee793/invoke.js";
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div className="my-6 flex justify-center">
      <div id="container-d3dfe9a2f9dda76275a463faba9ee793" />
    </div>
  );
}
