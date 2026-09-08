import { Suspense, lazy, useEffect, useState } from "react";

const SpaceBackgroundImpl = lazy(() => import("./SpaceBackground"));
const AICoreImpl = lazy(() => import("./AICore"));

function useClientReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 200);
    return () => window.clearTimeout(id);
  }, []);
  return ready;
}

export function LazySpaceBackground() {
  const ready = useClientReady();
  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <SpaceBackgroundImpl />
    </Suspense>
  );
}

export function LazyAICore() {
  const ready = useClientReady();
  return (
    <div className="absolute inset-0">
      {/* Static energy glow keeps the frame alive before/without WebGL */}
      <div className="absolute inset-[18%] rounded-full bg-primary/25 blur-3xl animate-pulse-glow" />
      {ready && (
        <Suspense fallback={null}>
          <AICoreImpl />
        </Suspense>
      )}
    </div>
  );
}
