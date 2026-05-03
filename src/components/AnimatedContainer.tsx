import type { CSSProperties, ReactNode } from "react";
export function AnimatedContainer({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string; }) {
  const animationClass = delay > 0 ? "animate-fade-slide-up [animation-delay:calc(var(--a-delay)*1ms)]" : "animate-fade-slide-up";
  const style = delay > 0 ? ({ "--a-delay": Math.round(delay * 1000) } as CSSProperties) : undefined;
  return <div className={`${className ?? ""} ${animationClass}`.trim()} style={style}>{children}</div>;
}
