"use client";

import { useState, type ReactElement, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CircleCheck,
  Database,
  Eye,
  KeyRound,
  Lock,
  Rocket,
  Server,
  Shield,
  Sparkles,
  Users,
  Waypoints,
  ChevronDown
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { WorkflowScroll } from "@/components/workflow-scroll";

const navItems: Array<{ label: string; href: string }> = [
  { label: "Why Orbitaly", href: "#why" },
  { label: "How it works", href: "#how" },
  { label: "Clients", href: "#clients" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
  { label: "Get Started", href: "#get-started" }
];

const clientLinks: Array<{ name: string; href: string; description: string }> = [
  { name: "Element", href: "https://app.element.io", description: "Best all-rounder · Web, desktop and mobile" },
  { name: "FluffyChat", href: "https://fluffychat.im/web", description: "Friendly and simple · Mobile-focused" },
  { name: "Cinny", href: "https://app.cinny.in", description: "Clean web experience · Lightweight and modern" },
  { name: "NeoChat", href: "https://apps.kde.org/neochat/", description: "KDE Matrix client · Desktop and mobile" }
];

const faqItems: Array<{ q: string; a: string }> = [
  { q: "What is Orbitaly?", a: "Orbitaly is a private, independent Matrix homeserver for chats, groups and communities." },
  { q: "What is a Matrix homeserver?", a: "A homeserver stores your Matrix identity and rooms while staying interoperable with other Matrix servers." },
  { q: "Do I need a special app?", a: "No. Orbitaly does not have its own custom client yet. Use existing Matrix clients like Element, FluffyChat, Cinny, or NeoChat." },
  { q: "Which client should I use?", a: "Element is a strong default, FluffyChat is great on mobile, Cinny is excellent for a clean web-focused flow, and NeoChat is a great KDE-native option." },
  { q: "Is Orbitaly the same as WhatsApp?", a: "No. WhatsApp is a centralized product, while Orbitaly runs on the open Matrix protocol with client choice." },
  { q: "Are messages encrypted?", a: "Native Matrix encrypted rooms can protect message content end-to-end when encryption is enabled." },
  {
    q: "What is my Matrix ID?",
    a: "After signup your ID looks like @yourname:chat.orbitaly.de. Share this full ID so others can add you directly."
  },
  { q: "Can I use multiple devices?", a: "Yes. Matrix clients typically support sync across desktop and mobile devices." },
  { q: "Is Orbitaly anonymous?", a: "Orbitaly is privacy-focused, but not anonymous by default." },
  { q: "Is a custom Orbitaly client coming?", a: "A custom Orbitaly web experience is planned as part of the coming-soon roadmap." }
];

const securityCards: Array<{ title: string; description: string; icon: ReactNode }> = [
  {
    title: "Encrypted where it matters",
    description: "Native Matrix encrypted rooms can protect message content end-to-end when encryption is enabled.",
    icon: <KeyRound className="h-5 w-5" />
  },
  {
    title: "Transport security",
    description: "Connections use HTTPS/TLS to protect traffic between your device and the homeserver.",
    icon: <Shield className="h-5 w-5" />
  },
  {
    title: "Less centralized control",
    description: "Orbitaly reduces dependency on one single social platform controlling app, identity, and network.",
    icon: <Server className="h-5 w-5" />
  },
  {
    title: "Metadata transparency",
    description: "Like most communication systems, some metadata can still exist at homeserver level.",
    icon: <Database className="h-5 w-5" />
  },
  {
    title: "Privacy-focused, not anonymous",
    description: "Orbitaly improves control and independence, but it is not an anonymity network by default.",
    icon: <Eye className="h-5 w-5" />
  },
  {
    title: "Why closed apps can be risky",
    description: "Apps like WhatsApp are convenient, but they are centralized: account recovery, metadata policies, and ecosystem rules stay under one provider.",
    icon: <Lock className="h-5 w-5" />
  },
  {
    title: "Hosted in Germany",
    description: "Orbitaly servers run in Germany (Falkenstein) with a focus on strong European data-handling standards.",
    icon: <Server className="h-5 w-5" />
  },
  {
    title: "Infrastructure certification context",
    description: "Designed for GDPR/DSGVO-oriented operation and built on certified data center environments (for example ISO 27001-class infrastructure).",
    icon: <CircleCheck className="h-5 w-5" />
  }
];

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const scrollToId = (id: string): void => {
  if (typeof window === "undefined") return;
  const target = document.querySelector(id);
  if (target instanceof HTMLElement) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

type SmoothAnchorProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

const SmoothAnchor = ({ href, className, children }: SmoothAnchorProps): ReactElement => {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        scrollToId(href);
      }}
    >
      {children}
    </a>
  );
};

type InfoCardProps = { title: string; description: string; icon: ReactNode };

export const InfoCard = ({ title, description, icon }: InfoCardProps): ReactElement => {
  return (
    <motion.article
      {...reveal}
      className="glass group rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-blue-300/30 hover:bg-white/[0.05]"
    >
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-blue-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/70">{description}</p>
    </motion.article>
  );
};

export const Header = (): ReactElement => {
  return (
    <header className="sticky top-4 z-50">
      <div className="section-wrap">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between rounded-full border border-white/15 bg-[#05070d]/75 px-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:px-6">
          <Link href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-white">
            <Image src="/orbital-logo.png" alt="Orbitaly logo" width={24} height={24} className="h-6 w-6 rounded-sm object-contain" />
            Orbitaly
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <SmoothAnchor key={item.href} href={item.href} className="text-sm text-white/75 transition-colors hover:text-white">
                {item.label}
              </SmoothAnchor>
            ))}
          </nav>
          <Button asChild size="default">
            <SmoothAnchor href="#get-started">Start on Orbitaly</SmoothAnchor>
          </Button>
        </div>
      </div>
    </header>
  );
};

export const OrbitalVisual = (): ReactElement => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto flex h-[340px] w-full max-w-[560px] items-center justify-center sm:h-[420px]">
      <motion.div
        animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-56 w-56 rounded-full bg-gradient-to-br from-blue-500/60 via-cyan-400/20 to-violet-500/50 blur-2xl"
      />
      <div className="absolute h-28 w-28 rounded-full border border-blue-300/50 bg-[#0d1732]/70 shadow-[0_0_50px_rgba(55,130,255,0.5)]" />

      <motion.div
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        className="absolute h-[220px] w-[220px] rounded-full border border-white/20"
      >
        <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-blue-300" />
      </motion.div>
      <motion.div
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 36, ease: "linear", repeat: Infinity }}
        className="absolute h-[300px] w-[300px] rounded-full border border-white/20"
      >
        <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-violet-300" />
      </motion.div>
      <motion.div
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 44, ease: "linear", repeat: Infinity }}
        className="absolute h-[380px] w-[380px] rounded-full border border-white/20"
      >
        <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300" />
      </motion.div>

      <div className="absolute grid w-[85%] grid-cols-4 gap-8 opacity-70">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`node-${i}`}
            animate={reduceMotion ? undefined : { y: [0, i % 2 === 0 ? -5 : 5, 0] }}
            transition={{ duration: 5 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto h-1.5 w-1.5 rounded-full bg-violet-300/90"
          />
        ))}
      </div>
    </div>
  );
};

export const Hero = (): ReactElement => {
  return (
    <section className="section-wrap relative flex min-h-[92vh] items-center pt-16 pb-28" id="top">
      <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 orb-grid" />
      <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-[130vw] -translate-x-1/2 bg-[radial-gradient(circle_at_15%_25%,rgba(37,99,235,0.22),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(139,92,246,0.2),transparent_34%),radial-gradient(circle_at_50%_85%,rgba(14,165,233,0.14),transparent_38%)]" />
      <div className="pointer-events-none absolute -bottom-24 left-1/2 -z-10 h-64 w-[120vw] -translate-x-1/2 rounded-full bg-cyan-400/12 blur-3xl" />
      <div className="grid w-full gap-14 lg:grid-cols-2 lg:items-center">
        <motion.div {...reveal} className="space-y-8">
          <span className="inline-flex rounded-full border border-blue-300/30 bg-blue-400/10 px-4 py-1.5 text-xs font-medium text-blue-100">
            Powered by the open Matrix protocol
          </span>
          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Your private orbit for communication.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Orbitaly is an independent Matrix-based homeserver for private chats, friend groups and communities without relying on closed social platforms.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <SmoothAnchor href="#get-started">Start on Orbitaly</SmoothAnchor>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <SmoothAnchor href="#how">How it works</SmoothAnchor>
            </Button>
          </div>
          <div className="glass rounded-2xl p-4 text-sm text-white/85">
            <p>Create or use your account with the homeserver URL:</p>
            <p className="mt-1 text-base font-semibold text-blue-200">https://chat.orbitaly.de</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {clientLinks.map((client) => (
                <span key={client.name} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/85">
                  {client.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
          <OrbitalVisual />
        </motion.div>
      </div>
    </section>
  );
};

export const MatrixExplanation = (): ReactElement => {
  return (
    <section className="section-wrap py-20">
      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div {...reveal} className="glass rounded-3xl p-8">
          <h2 className="text-2xl font-semibold text-white">What is Orbitaly?</h2>
          <p className="mt-4 text-white/75">
            Orbitaly is a Matrix homeserver. Your account, rooms and identity live on Orbitaly, while you connect through compatible Matrix clients.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-white/75">
            <li>Homeserver: <span className="text-blue-200">chat.orbitaly.de</span></li>
            <li>Matrix ID example: <span className="text-blue-200">@name:chat.orbitaly.de</span></li>
            <li>Works with Element, FluffyChat, Cinny, NeoChat and other Matrix clients</li>
            <li>Designed for private groups, friends and independent communities</li>
          </ul>
        </motion.div>
        <motion.div {...reveal} className="glass rounded-3xl p-8">
          <h2 className="text-2xl font-semibold text-white">What is Matrix?</h2>
          <p className="mt-4 text-white/75">
            Matrix is an open communication protocol. Like email, different servers and clients can still communicate on one open network.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-red-300/20 bg-red-400/10 p-4">
              <p className="text-sm font-medium text-red-200">Closed platforms</p>
              <p className="mt-2 text-sm text-white/75">One company controls the app, identity and network.</p>
            </div>
            <div className="rounded-2xl border border-blue-300/20 bg-blue-400/10 p-4">
              <p className="text-sm font-medium text-blue-200">Matrix</p>
              <p className="mt-2 text-sm text-white/75">Open protocol, independent servers and user choice.</p>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div {...reveal} className="glass mt-8 rounded-3xl p-8">
        <h3 className="text-xl font-semibold text-white">How your Orbitaly address works</h3>
        <p className="mt-3 text-white/75">
          Your Matrix ID looks like <span className="text-blue-200">@user:chat.orbitaly.de</span>. The part before
          the colon is your username. The part after the colon is your homeserver.
        </p>
        <p className="mt-3 text-white/75">
          To add friends, share your full Matrix ID or search theirs in your client (Element, FluffyChat, Cinny, or NeoChat),
          then start a direct message or invite them into a private room.
        </p>
      </motion.div>
    </section>
  );
};

export const SocialGraphComparison = (): ReactElement => {
  return (
    <section className="section-wrap py-20">
      <motion.div {...reveal} className="glass overflow-hidden rounded-3xl p-8 sm:p-10">
        <h2 className="text-center text-2xl font-semibold text-white sm:text-3xl">Social Graph Comparison</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-white/75">
          Orbitaly is not about hiding from everyone. It is about not building your entire digital social life inside one closed ecosystem.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-2xl border border-orange-300/20 bg-orange-400/10 p-6">
            <div className="pointer-events-none absolute -left-14 top-1/2 hidden h-52 w-52 -translate-y-1/2 rounded-full bg-orange-400/20 blur-3xl lg:block" />
            <h3 className="text-lg font-medium text-orange-200">Centralized platform model</h3>
            <GraphSide centralized />
            <ul className="mt-5 space-y-2 text-sm text-white/75">
              <li>one company owns the network</li>
              <li>metadata and contact graph are centralized</li>
              <li>identity is locked into one ecosystem</li>
              <li>leaving means losing your network</li>
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-blue-300/20 bg-blue-500/10 p-6">
            <div className="pointer-events-none absolute -right-14 top-1/2 hidden h-52 w-52 -translate-y-1/2 rounded-full bg-violet-400/20 blur-3xl lg:block" />
            <h3 className="text-lg font-medium text-blue-200">Matrix / Orbitaly model</h3>
            <GraphSide centralized={false} />
            <ul className="mt-5 space-y-2 text-sm text-white/75">
              <li>independent homeservers</li>
              <li>open protocol</li>
              <li>less platform lock-in</li>
              <li>user choice, communities stay connected</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const GraphSide = ({ centralized }: { centralized: boolean }): ReactElement => {
  const reduceMotion = useReducedMotion();
  const nodeClasses = centralized
    ? ["left-[14%] top-[20%]", "left-[22%] top-[66%]", "left-[32%] top-[34%]", "left-[80%] top-[60%]", "left-[72%] top-[24%]"]
    : ["left-[12%] top-[24%]", "left-[26%] top-[66%]", "left-[44%] top-[34%]", "left-[56%] top-[20%]", "left-[72%] top-[58%]", "left-[84%] top-[28%]"];

  return (
    <div className="relative mt-5 h-48 rounded-xl border border-white/10 bg-black/20 p-4">
      {centralized ? (
        <div className="absolute inset-0">
          <div className="absolute left-[50%] top-[50%] h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-300/40 bg-orange-400/30 shadow-[0_0_36px_rgba(251,146,60,0.38)]" />
          {nodeClasses.map((position, idx) => (
            <motion.div key={position} animate={reduceMotion ? undefined : { opacity: [0.45, 1, 0.45] }} transition={{ duration: 2.4 + idx * 0.2, repeat: Infinity }}>
              <span className={`absolute h-3 w-3 rounded-full bg-orange-300 ${position}`} />
            </motion.div>
          ))}
          <div className="absolute left-1/2 top-1/2 h-px w-[28%] -translate-y-10 bg-orange-300/35" />
          <div className="absolute left-1/2 top-1/2 h-px w-[26%] translate-y-10 bg-orange-300/35" />
          <div className="absolute left-[26%] top-1/2 h-px w-[24%] bg-orange-300/35" />
          <div className="absolute right-[26%] top-1/2 h-px w-[24%] bg-orange-300/35" />
        </div>
      ) : (
        <div className="absolute inset-0">
          {nodeClasses.map((position, idx) => (
            <motion.span
              key={position}
              animate={reduceMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3 + idx * 0.2, repeat: Infinity }}
              className={`absolute h-3 w-3 rounded-full bg-blue-300 ${position}`}
            />
          ))}
          <div className="absolute left-[18%] top-[26%] h-px w-[24%] bg-blue-300/35" />
          <div className="absolute left-[44%] top-[34%] h-px w-[20%] bg-blue-300/35" />
          <div className="absolute left-[58%] top-[22%] h-px w-[24%] bg-blue-300/35" />
          <div className="absolute left-[28%] top-[66%] h-px w-[42%] bg-blue-300/35" />
        </div>
      )}
      <div className="absolute inset-4 rounded-lg border border-dashed border-white/10" />
    </div>
  );
};

export const Workflow = (): ReactElement => {
  const steps = [
    "Choose a Matrix client: Element, FluffyChat, Cinny, or NeoChat.",
    "Enter the homeserver URL: https://chat.orbitaly.de",
    "Create your account with username and password.",
    "Your Matrix ID becomes @yourname:chat.orbitaly.de. Share this ID so friends can find you.",
    "Set up session verification or recovery if prompted.",
    "Create DMs, private rooms, groups or communities.",
    "Enable end-to-end encryption for private Matrix rooms where needed."
  ];

  return (
    <section className="section-wrap py-20" id="how">
      <motion.div {...reveal} className="glass rounded-3xl p-8 sm:p-10" id="get-started">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">How to start on Orbitaly</h2>
        <p className="mt-3 max-w-3xl text-white/75">
          Scroll through the setup flow. Each step completes as you move down. Your final Matrix ID will be:
          <span className="ml-1 font-semibold text-blue-200">@yourname:chat.orbitaly.de</span>
        </p>
        <WorkflowScroll steps={steps} />
      </motion.div>
    </section>
  );
};

type ClientCardProps = {
  title: string;
  blurb: string;
  href: string;
  cta: string;
  appStoreHref?: string;
  playStoreHref?: string;
  note?: string;
};

export const ClientCard = ({ title, blurb, href, cta, appStoreHref, playStoreHref, note }: ClientCardProps): ReactElement => {
  const hasStoreLinks = typeof appStoreHref === "string" && typeof playStoreHref === "string";

  return (
    <motion.article
      {...reveal}
      className="glass rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-blue-300/30"
    >
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm text-white/70">{blurb}</p>
      <Button asChild className="mt-5">
        <Link href={href} target="_blank" rel="noreferrer">
          {cta} <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      {hasStoreLinks ? (
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <Link
            href={appStoreHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/80 transition-colors hover:bg-white/10"
          >
            App Store
          </Link>
          <Link
            href={playStoreHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/80 transition-colors hover:bg-white/10"
          >
            Play Store
          </Link>
        </div>
      ) : (
        <p className="mt-4 text-xs text-white/60">{note ?? "Client-specific install options are available on the official page."}</p>
      )}
    </motion.article>
  );
};

export const Clients = (): ReactElement => {
  return (
    <section className="section-wrap py-20" id="clients">
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">Supported clients</h2>
      <p className="mt-3 text-white/75">Orbitaly provides the server. You choose the client.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <ClientCard
          title="Element"
          blurb="Best all-rounder. Web, desktop and mobile."
          href="https://app.element.io"
          cta="Open Element Web App"
          appStoreHref="https://apps.apple.com/app/element-messenger/id1083446067"
          playStoreHref="https://play.google.com/store/apps/details?id=im.vector.app"
        />
        <ClientCard
          title="FluffyChat"
          blurb="Friendly, simple and mobile-focused."
          href="https://fluffychat.im/web"
          cta="Open FluffyChat Web App"
          appStoreHref="https://apps.apple.com/us/app/fluffychat/id1551469600"
          playStoreHref="https://play.google.com/store/apps/details?id=chat.fluffy.fluffychat"
        />
        <ClientCard
          title="Cinny"
          blurb="Clean web experience. Lightweight and modern."
          href="https://app.cinny.in"
          cta="Open Cinny Web App"
          note="Cinny currently offers a web-first experience."
        />
        <ClientCard
          title="NeoChat"
          blurb="KDE Matrix client for desktop and mobile users."
          href="https://apps.kde.org/neochat/"
          cta="Open NeoChat"
          note="NeoChat install options are listed on the official KDE page."
        />
      </div>
    </section>
  );
};

export const Benefits = (): ReactElement => {
  return (
    <section className="section-wrap py-20" id="why">
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">Why Orbitaly?</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <InfoCard title="Independent identity" description="Own your Matrix identity on an independent homeserver." icon={<Users className="h-5 w-5" />} />
        <InfoCard title="Open protocol" description="Built on Matrix for interoperability and long-term choice." icon={<Waypoints className="h-5 w-5" />} />
        <InfoCard title="Private rooms" description="Great for friend groups, circles and community spaces." icon={<Lock className="h-5 w-5" />} />
        <InfoCard title="Encryption support" description="Enable end-to-end encryption in native Matrix rooms when needed." icon={<Shield className="h-5 w-5" />} />
        <InfoCard title="Cross-device access" description="Use multiple clients across desktop and mobile." icon={<Server className="h-5 w-5" />} />
        <InfoCard title="Less lock-in" description="Reduce dependency on one closed social platform." icon={<CircleCheck className="h-5 w-5" />} />
        <InfoCard title="Community-first" description="Built for friend groups and independent communities." icon={<Sparkles className="h-5 w-5" />} />
        <InfoCard title="Future-ready" description="Roadmap includes a custom Orbitaly web experience." icon={<Rocket className="h-5 w-5" />} />
      </div>
    </section>
  );
};

export const SecuritySection = (): ReactElement => {
  return (
    <section className="section-wrap py-20" id="security">
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">Security and privacy</h2>
      <p className="mt-3 max-w-3xl text-white/75">
        Orbitaly is built for stronger independence and clearer privacy tradeoffs. It is not about fear marketing, it is
        about reducing single-platform dependency.
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {securityCards.map((card) => (
          <InfoCard key={card.title} title={card.title} description={card.description} icon={card.icon} />
        ))}
      </div>
    </section>
  );
};

export const ComingSoon = (): ReactElement => {
  return (
    <section className="section-wrap py-20">
      <motion.div {...reveal} className="glass rounded-3xl p-8 sm:p-10">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">Coming soon</h2>
        <p className="mt-3 text-white/75">Orbitaly is still evolving.</p>
        <ul className="mt-6 grid gap-3 text-white/80 sm:grid-cols-2">
          <li>smoother onboarding</li>
          <li>invite-based access</li>
          <li>custom Orbitaly web experience</li>
          <li>account and control panel</li>
          <li>better community spaces</li>
          <li>more polished setup guides</li>
        </ul>
      </motion.div>
    </section>
  );
};

export const FAQ = (): ReactElement => {
  const [openItem, setOpenItem] = useState<string | null>(faqItems[0]?.q ?? null);

  return (
    <section className="section-wrap py-20" id="faq">
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">FAQ</h2>
      <div className="mt-6 glass rounded-2xl px-6">
        {faqItems.map((item) => {
          const isOpen = openItem === item.q;

          return (
            <article key={item.q} className="border-b border-white/10">
              <button
                type="button"
                className="group flex w-full items-center justify-between py-5 text-left text-base font-medium text-white transition-colors hover:text-blue-200"
                onClick={() => setOpenItem(isOpen ? null : item.q)}
                aria-expanded={isOpen}
              >
                <span className={isOpen ? "text-blue-200" : ""}>{item.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-white/60 transition-transform duration-500 ${
                    isOpen ? "rotate-180 text-blue-200" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p
                    className={`pb-5 pt-0 text-sm leading-relaxed text-white/75 transition-transform duration-500 ${
                      isOpen ? "translate-y-0" : "-translate-y-1"
                    }`}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export const FinalCTA = (): ReactElement => {
  return (
    <section className="section-wrap py-20">
      <motion.div {...reveal} className="glass rounded-3xl p-8 text-center sm:p-12">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Start building your own orbit.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/75">
          Use Orbitaly with any compatible Matrix client and create your account on chat.orbitaly.de.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="https://chat.orbitaly.de" target="_blank" rel="noreferrer">
              Use chat.orbitaly.de
            </Link>
          </Button>
          {clientLinks.map((client) => (
            <Button key={client.name} asChild size="lg" variant="secondary">
              <Link href={client.href} target="_blank" rel="noreferrer">
                {client.name} Web App
              </Link>
            </Button>
          ))}
        </div>
        <p className="mt-5 text-sm text-white/70">
          Your Matrix ID format:
          <span className="ml-1 font-semibold text-blue-200">@yourname:chat.orbitaly.de</span>
        </p>
      </motion.div>
    </section>
  );
};

export const Footer = (): ReactElement => {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="section-wrap flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">Orbitaly</p>
          <p className="mt-1 text-sm text-white/65">Independent communication · Open protocol · Your orbit</p>
        </div>
        <div className="flex items-center gap-5 text-sm text-white/75">
          <Link href="https://app.element.io" target="_blank" rel="noreferrer">Element Web</Link>
          <Link href="https://fluffychat.im/web" target="_blank" rel="noreferrer">FluffyChat Web</Link>
          <Link href="https://app.cinny.in" target="_blank" rel="noreferrer">Cinny Web</Link>
          <Link href="https://apps.kde.org/neochat/" target="_blank" rel="noreferrer">NeoChat</Link>
        </div>
      </div>
      <p className="section-wrap mt-4 text-xs font-semibold tracking-wide text-white/60">
        A PRODUCT BY LEVO STUDIO
      </p>
      <p className="section-wrap mt-1 text-xs text-white/45">{new Date().getFullYear()} © Levo Studio</p>
      <p className="section-wrap mt-1 text-xs text-white/45">
        Servers hosted in Germany (Falkenstein) · DSGVO/GDPR-oriented operation
      </p>
      <p className="section-wrap mt-1 text-xs text-white/45">Made with ❤️ in Germany by Julius</p>
    </footer>
  );
};
