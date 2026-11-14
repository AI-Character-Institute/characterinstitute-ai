import { ExternalLink } from "@/components/external-link";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Team } from "@/components/team";
import { WorkCarousel } from "@/components/work-carousel";
import { CONTACT_EMAIL, WORK } from "@/lib/content";

const accent = "font-semibold text-accent";
const bullet =
  "relative pl-5 before:absolute before:top-[0.62em] before:left-0 before:size-[7px] before:bg-accent before:content-['']";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <Hero />
      <main>
        <Section id="why" label="Why now">
          <p>
            AI developers now publish{" "}
            <ExternalLink href="https://model-spec.openai.com/">specs</ExternalLink> and{" "}
            <ExternalLink href="https://www.anthropic.com/news/claude-new-constitution">
              constitutions
            </ExternalLink>{" "}
            and train their models against them, so{" "}
            <ExternalLink href="https://www.forethought.org/research/the-importance-of-ai-character">
              character
            </ExternalLink>{" "}
            is increasingly shaped on purpose. Models are also taking on longer and more autonomous
            tasks, where character decides more of their behaviour than instructions do. Yet
            independent checks of whether a model actually has the character it was meant to have{" "}
            <b>barely exist</b>. <b className={accent}>We are building them.</b>
          </p>
        </Section>

        <Section id="research" label="Research directions">
          <ul className="grid gap-3.5">
            <li className={bullet}>
              <b className={accent}>Independent evaluations</b> of frontier models, tracking
              character across labs and successive releases
            </li>
            <li className={bullet}>
              <b className={accent}>Stated vs actual character</b>, i.e. whether what a model says
              about itself predicts what it does in realistic environments
            </li>
            <li className={bullet}>
              Character in <b className={accent}>agentic and multi-agent settings</b>, over long
              tasks and when many agents interact
            </li>
            <li className={bullet}>
              Adherence to the <b className={accent}>constitutions and model specs</b> that
              developers publish
            </li>
            <li className={bullet}>
              <b className={accent}>How training shapes character</b>, using models with known
              character to validate our evals
            </li>
          </ul>
        </Section>

        <Section id="done" label="What we've done" wide>
          <WorkCarousel items={WORK} />
        </Section>

        <Section id="team" label="Team" wide>
          <Team />
        </Section>

        <Section id="contact" label="Get in touch">
          <p id="careers">
            If you want to work on AI character evaluations, or have questions or ideas, get in
            touch at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
