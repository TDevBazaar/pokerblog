"use client";

import { useEffect, useRef } from "react";

const CONTAINER_ID = "container-d3dfe9a2f9dda76275a463faba9ee793";

function forceGrid(el: HTMLElement) {
  el.style.setProperty("display", "grid", "important");
  el.style.setProperty("grid-template-columns", "repeat(2, 1fr)", "important");
  el.style.setProperty("gap", "12px", "important");
}

export function AdBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptAdded = useRef(false);

  useEffect(() => {
    if (scriptAdded.current) return;
    scriptAdded.current = true;

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src =
      "https://pl30377735.effectivecpmnetwork.com/d3dfe9a2f9dda76275a463faba9ee793/invoke.js";
    document.body.appendChild(script);

    const poll = setInterval(() => {
      const container = containerRef.current;
      if (!container || !container.children.length) return;

      const kids = container.children;
      if (kids.length === 1 && kids[0].children.length > 1) {
        forceGrid(kids[0] as HTMLElement);
      } else if (kids.length > 1) {
        forceGrid(container);
      }
      clearInterval(poll);
    }, 200);

    return () => {
      script.remove();
      clearInterval(poll);
    };
  }, []);

  return (
    <div className="my-6 flex justify-center">
      <div ref={containerRef} id={CONTAINER_ID} />
    </div>
  );
}
