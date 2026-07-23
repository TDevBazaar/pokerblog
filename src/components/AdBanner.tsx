"use client";

import { useEffect, useRef } from "react";

const CONTAINER_ID = "container-d3dfe9a2f9dda76275a463faba9ee793";

export function AdBanner() {
  const mounted = useRef(false);
  const elRef = useRef<HTMLDivElement>(null);

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
      <div
        ref={elRef}
        id={CONTAINER_ID}
        className="grid w-full grid-cols-2 gap-3 sm:gap-4"
      />
    </div>
  );
}
