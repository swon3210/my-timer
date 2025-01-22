import { OverlayProvider as TossOverlayProvider } from "@toss/use-overlay";

const OverlayProvider = ({ children }: { children: React.ReactNode }) => {
  return <TossOverlayProvider>{children}</TossOverlayProvider>;
};

export default OverlayProvider;
