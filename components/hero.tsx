import { Scanner } from "@/components/scanner";

const button =
  "inline-flex items-center border-[1.5px] px-[18px] py-[11px] text-[15px] font-medium no-underline";

export function Hero() {
  return (
    <div id="top">
      <div className="page-wrap pt-9 pb-4 md:pt-14 md:pb-6">
        <div className="font-pixel text-xs tracking-[0.08em] text-accent uppercase">What is it</div>
        <h1 className="mt-3.5 max-w-[30ch] font-display text-[clamp(30px,4.6vw,50px)] leading-[1.12] font-medium tracking-[-0.015em] text-balance">
          <span className="font-semibold text-accent">AI Character Institute</span> is an independent
          non-profit organization that builds and publishes evaluations of AI character.
        </h1>
        <p
          id="mission"
          className="mt-[18px] max-w-[60ch] text-[clamp(18px,1.9vw,21px)] leading-normal text-pretty text-muted"
        >
          Make AI character measurable, so developers and the public can see what character a model
          actually has and whether it matches the one it was meant to have.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="#contact"
            className={`${button} border-accent bg-accent text-bg hover:text-bg hover:brightness-110`}
          >
            Get in touch
          </a>
          <a href="#research" className={`${button} border-fg text-fg hover:border-accent hover:text-accent`}>
            See our research directions
          </a>
        </div>
        <Scanner />
      </div>
    </div>
  );
}
