"use client";

import { useEffect, useRef, type ReactElement } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type WorkflowScrollProps = {
  steps: string[];
};

export const WorkflowScroll = ({ steps }: WorkflowScrollProps): ReactElement => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-workflow-card]");

      cards.forEach((card) => {
        const fill = card.querySelector<HTMLElement>("[data-workflow-fill]");
        const status = card.querySelector<HTMLElement>("[data-workflow-status]");

        if (!fill || !status) return;

        gsap.set(fill, { scaleX: 0.08, transformOrigin: "left center" });

        gsap.to(fill, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 35%",
            scrub: 0.45,
            onUpdate: (self) => {
              const complete = self.progress > 0.98;
              status.textContent = complete ? "Completed" : self.progress > 0.06 ? "In progress" : "Pending";
              status.className = complete
                ? "text-xs font-semibold text-blue-200"
                : self.progress > 0.06
                  ? "text-xs font-semibold text-violet-200"
                  : "text-xs font-semibold text-white/45";
            }
          }
        });

        gsap.to(card, {
          borderColor: "rgba(147, 197, 253, 0.45)",
          backgroundColor: "rgba(255,255,255,0.05)",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            end: "bottom 35%",
            scrub: 0.45
          }
        });
      });
    }, rootRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={rootRef} className="mt-8 space-y-4">
      {steps.map((step, index) => (
        <article key={step} data-workflow-card className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors">
          <div className="flex items-start justify-between gap-4">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-blue-300/30 bg-blue-400/10 text-sm font-semibold text-blue-200">
              {index + 1}
            </span>
            <span data-workflow-status className="text-xs font-semibold text-white/45">
              Pending
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/80">{step}</p>
          <div className="mt-4 h-1.5 w-full rounded-full bg-white/10">
            <div data-workflow-fill className="h-full origin-left rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
          </div>
        </article>
      ))}
    </div>
  );
};
