"use client";

import { useEffect, useRef, useState } from "react";

const PHOTO =
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=1500&fit=crop&q=80";

export function VitrinePhoto() {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // onError pode disparar antes da hidratação e se perder
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div
        aria-hidden
        className="h-full w-full"
        style={{
          background:
            "linear-gradient(160deg, #EDE7EA 0%, #B9B2B4 35%, #6E6866 60%, #2E2A2A 100%)",
        }}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={PHOTO}
      alt="Modelo vestindo jaqueta metalizada"
      className="h-full w-full object-cover object-top grayscale-[35%] contrast-[1.05]"
      onError={() => setFailed(true)}
    />
  );
}
