import type { ReactElement } from "react";
import {
  Benefits,
  Clients,
  ComingSoon,
  FAQ,
  FinalCTA,
  Footer,
  Header,
  Hero,
  MatrixExplanation,
  SecuritySection,
  SocialGraphComparison,
  Workflow
} from "@/components/landing";

export default function HomePage(): ReactElement {
  return (
    <main className="overflow-x-clip">
      <Header />
      <Hero />
      <MatrixExplanation />
      <SocialGraphComparison />
      <Workflow />
      <Clients />
      <Benefits />
      <SecuritySection />
      <ComingSoon />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
