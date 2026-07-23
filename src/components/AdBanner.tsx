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

    const observer = new MutationObserver(() => {
      const container = containerRef.current;
      if (!container || !container.children.length) return;

      const kids = container.children;

      if (kids.length === 1 && kids[0].children.length > 1) {
        const wrapper = kids[0] as HTMLElement;
        const items = Array.from(wrapper.children);

        // Unwrap: move ad children directly into the grid container
        for (const item of items) {
          container.appendChild(item);
        }
        wrapper.remove();
        forceGrid(container);
      } else if (kids.length > 1) {
        forceGrid(container);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      script.remove();
      observer.disconnect();
    };
  }, []);

  return (
    <div className="my-6 flex justify-center">
      <div ref={containerRef} id={CONTAINER_ID} />
    </div>
  );
}
