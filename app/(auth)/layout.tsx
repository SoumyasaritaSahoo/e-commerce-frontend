import Image from "next/image";

import { AuthHero } from "@/components/domain/auth-hero";
import { Card } from "@/components/ui/card";

const SPARKLES: {
  top: string;
  left: string;
  size: string;
  delay: string;
  duration: string;
  sx: string;
  sy: string;
}[] = [
  { top: "8%", left: "12%", size: "20px", delay: "0s", duration: "3.2s", sx: "14px", sy: "-12px" },
  { top: "18%", left: "32%", size: "16px", delay: "0.6s", duration: "2.8s", sx: "-10px", sy: "16px" },
  { top: "5%", left: "48%", size: "18px", delay: "1.2s", duration: "3.6s", sx: "18px", sy: "8px" },
  { top: "28%", left: "6%", size: "16px", delay: "1.8s", duration: "3s", sx: "-14px", sy: "-10px" },
  { top: "62%", left: "58%", size: "18px", delay: "0.3s", duration: "3.4s", sx: "12px", sy: "14px" },
  { top: "78%", left: "40%", size: "16px", delay: "1.5s", duration: "2.6s", sx: "-16px", sy: "-8px" },
  { top: "40%", left: "68%", size: "20px", delay: "0.9s", duration: "3.8s", sx: "10px", sy: "-16px" },
  { top: "14%", left: "80%", size: "18px", delay: "2.1s", duration: "3s", sx: "-12px", sy: "12px" },
  { top: "48%", left: "22%", size: "16px", delay: "0.4s", duration: "2.9s", sx: "16px", sy: "10px" },
  { top: "86%", left: "70%", size: "18px", delay: "1.1s", duration: "3.3s", sx: "-18px", sy: "-14px" },
  { top: "34%", left: "90%", size: "16px", delay: "1.7s", duration: "2.7s", sx: "-10px", sy: "18px" },
  { top: "68%", left: "10%", size: "20px", delay: "2.4s", duration: "3.6s", sx: "14px", sy: "-10px" },
  { top: "92%", left: "20%", size: "16px", delay: "0.8s", duration: "3.1s", sx: "12px", sy: "-14px" },
  { top: "2%", left: "65%", size: "18px", delay: "1.4s", duration: "2.8s", sx: "-14px", sy: "12px" },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen justify-center overflow-x-hidden bg-white p-3 lg:p-6">
      {/* <div className="relative w-full max-w-[1600px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 shadow-2xl"> */}
        <Image
          src="/images/auth-hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-left lg:block"
        />

        <div className="pointer-events-none absolute -left-32 -top-32 size-96 animate-pulse rounded-full bg-violet-300/30 blur-3xl lg:hidden" />
        <div className="pointer-events-none absolute -bottom-32 -right-24 size-96 animate-pulse rounded-full bg-fuchsia-300/30 blur-3xl [animation-delay:1s] lg:hidden" />

        <div className="relative z-10 w-full">
          {/* <MarketplaceNav /> */}

          {SPARKLES.map((s, i) => (
            <svg
              key={i}
              viewBox="0 0 24 24"
              className={`pointer-events-none absolute animate-sparkle ${i % 2 === 0 ? "fill-fuchsia-400" : "fill-violet-400"}`}
              style={
                {
                  top: s.top,
                  left: s.left,
                  width: s.size,
                  height: s.size,
                  animationDelay: s.delay,
                  animationDuration: s.duration,
                  "--sx": s.sx,
                  "--sy": s.sy,
                  filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 10px rgba(192, 38, 211, 0.8))",
                } as React.CSSProperties
              }
            >
              <path d="M12 0l2.2 7.3L22 9.6l-7.8 2.3L12 19.2l-2.2-7.3L2 9.6l7.8-2.3z" />
            </svg>
          ))}

          <div className="grid items-start justify-items-center gap-10 px-4 pb-10 pt-10 lg:mx-auto lg:w-[64vw] lg:max-w-none lg:grid-cols-[1fr_1.2fr] lg:justify-items-stretch lg:gap-8 lg:px-10 lg:pb-14 lg:pt-24">
            <AuthHero className="animate-fade-up" />

            <div
              className="relative mx-auto w-full max-w-lg animate-fade-up lg:ml-auto lg:mr-0 lg:mt-10"
              style={{ animationDelay: "150ms" }}
            >
              <Card className="flex w-full flex-col justify-center rounded-3xl !border-violet-500 !bg-violet-300 p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl lg:min-h-[600px]">
                {children}
              </Card>
            </div>
          </div>
        </div>
     </main>
  );
}
