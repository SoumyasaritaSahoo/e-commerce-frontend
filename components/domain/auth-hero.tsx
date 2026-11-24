import { cn } from "@/lib/cn";

export function AuthHero({ className = "" }: { className?: string }) {
  return (
    <div className={cn("max-w-md text-center lg:-ml-10 lg:text-left", className)}>
      <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-zinc-900 sm:text-5xl">
        Shop Smarter,
        <br />
        <span className="animate-shimmer bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-[length:200%_auto] bg-clip-text text-transparent">
          Live Better.
        </span>
      </h1>

      <p className="mt-5 text-base text-zinc-600">
        Discover products from trusted vendors, exclusive deals, and a
        seamless checkout experience — all in one place.
      </p>
    </div>
  );
}
