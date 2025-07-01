"use client";

import { OverlayProvider as OverlayKitProvider } from "overlay-kit";

const OverlayProvider = ({ children }: { children: React.ReactNode }) => {
  return <OverlayKitProvider>{children}</OverlayKitProvider>;
};

export default OverlayProvider;
