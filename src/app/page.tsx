import type { ReactElement } from "react";
import {
  Benefits,
  ClientComparison,
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
      <ClientComparison />
      <Benefits />
      <SecuritySection />
      <ComingSoon />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
