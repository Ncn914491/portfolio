"use client";

import { motion, Variants } from "framer-motion";
import {
  BrainCircuit,
  Shield,
  Cloud,
  Github,
  Linkedin,
  Mail,
  FileDown,
  Sparkles,
  Medal,
  BadgeCheck,
} from "lucide-react";
import React from "react";
import ContactForm from "../components/ContactForm";

const sectionTitleVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardHover = {
  hover: { y: -6, scale: 1.02, boxShadow: "0 20px 40px rgba(2,6,23,0.12)" },
};

const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
});

const floating = (delay = 0): Variants => ({
  initial: { y: 0, opacity: 0 },
  animate: {
    y: [0, -10, 0],
    opacity: 1,
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut", delay },
  },
});

const underlineVariants = {
  initial: { width: 0 },
  animate: { width: "4rem", transition: { duration: 0.6 } },
};

const sectionClass = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <motion.h2
        variants={sectionTitleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900"
      >
        {title}
      </motion.h2>
      <motion.div
        variants={underlineVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="h-1 rounded bg-blue-500 mt-2"
      />
      {subtitle ? (
        <p className="mt-3 text-slate-600 text-sm sm:text-base">{subtitle}</p>
      ) : null}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-white border border-slate-200 text-slate-700 text-xs px-3 py-1 shadow-sm">
      {children}
    </span>
  );
}

export default function Home() {
  // Projects state and effect
  const [pinned, setPinned] = React.useState<
    { id: string; name: string; description: string; url: string; topics: string[] }[]
  >([]);

  React.useEffect(() => {
    const username = "Ncn914491"; // Your GitHub username
    // Public endpoint used by many OSS portfolios for pinned repos JSON
    // Fallback if this endpoint fails: a minimal fetch to GitHub REST as a backup (stars sort)
    async function loadPinned() {
      try {
        const res = await fetch(`https://gh-pinned-repos.egoist.dev/?username=${encodeURIComponent(username)}`);
        if (!res.ok) throw new Error("Pinned endpoint failed");
        const data: Array<{
          repo: string;
          owner: string;
          link: string;
          description: string;
          language: string | null;
        }> = await res.json();

        const mapped = data.map((r, idx) => ({
          id: `${r.owner}/${r.repo}-${idx}`,
          name: r.repo,
          description: r.description ?? "",
          url: r.link,
          topics: [r.language].filter(Boolean) as string[],
        }));
        setPinned(mapped);
      } catch {
        // Fallback: fetch user repos sorted by stars to simulate "featured"
        try {
          const res = await fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=6&sort=updated`
          );
          if (!res.ok) return;
          type Repo = {
            id: number;
            name: string;
            description: string | null;
            html_url: string;
            topics?: string[];
            language: string | null;
          };
          const repos: Repo[] = await res.json();
          const mapped = repos.slice(0, 6).map((r) => ({
            id: String(r.id),
            name: r.name,
            description: r.description ?? "",
            url: r.html_url,
            topics: [
              ...(Array.isArray(r.topics) ? r.topics : []),
              ...(r.language ? [r.language] : []),
            ].slice(0, 5),
          }));
          setPinned(mapped);
        } catch {
          // keep empty silently
        }
      }
    }
    void loadPinned();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 -z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-sky-50 to-white" />
          <motion.div
            className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <div className={`${sectionClass} pt-24 pb-20 sm:pt-28 sm:pb-24`}>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-700 text-xs shadow-sm"
              >
                <Sparkles className="h-4 w-4 text-blue-500" />
                Available for internships and collaborations
              </motion.div>
              <motion.h1
                className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
              >
                Narisetti Chaitanya Naidu
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-sky-600">
                  AI & Cybersecurity Explorer
                </span>
              </motion.h1>
              <motion.p
                className="mt-4 text-slate-700 text-base sm:text-lg"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                3rd-year B.Tech CSE @ JNTU Kakinada (CGPA 8.43) | Cloud-Native Innovator
              </motion.p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://linkedin.com/in/narisetti-chaitanya-naidu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Ncn914491"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-white px-4 py-2 text-blue-700 shadow hover:bg-blue-50 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </div>

            <div className="relative h-64 sm:h-72">
              <motion.div
                variants={floating(0.1)}
                initial="initial"
                animate="animate"
                className="absolute left-6 top-4"
              >
                <div className="rounded-2xl bg-white p-4 shadow-lg border border-slate-100">
                  <BrainCircuit className="h-10 w-10 text-blue-600" />
                </div>
              </motion.div>
              <motion.div
                variants={floating(0.4)}
                initial="initial"
                animate="animate"
                className="absolute right-10 top-10"
              >
                <div className="rounded-2xl bg-white p-4 shadow-lg border border-slate-100">
                  <Shield className="h-10 w-10 text-sky-600" />
                </div>
              </motion.div>
              <motion.div
                variants={floating(0.7)}
                initial="initial"
                animate="animate"
                className="absolute left-20 bottom-6"
              >
                <div className="rounded-2xl bg-white p-4 shadow-lg border border-slate-100">
                  <Cloud className="h-10 w-10 text-blue-500" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className={`${sectionClass} py-16 sm:py-20`}>
        <SectionHeader title="About Me" />
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <motion.div
            variants={fadeInUp(0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-1 flex justify-center"
          >
            <img
              src="/profile.jpg"
              alt="Narisetti Chaitanya Naidu"
              className="h-40 w-40 rounded-full object-cover shadow-md ring-4 ring-white"
            />
          </motion.div>
          <motion.div
            variants={fadeInUp(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <p className="text-slate-700 leading-relaxed">
              I'm Narisetti Chaitanya Naidu, a 3rd-year B.Tech CSE student at JNTU Kakinada exploring 
              AI, Cybersecurity, and Cloud Computing. I've built AI-driven apps solving privacy, security, 
              and emergency response challenges. Experienced in Google Cloud, Vertex AI, and Generative AI APIs. 
              Completed internship at Edunet Foundation delivering a Sentiment Analysis Pipeline and exploring 
              SafeHaven & SecureAI ThreatScope. NCC Cadet with discipline & leadership skills, and a Chess Player 
              with strategic thinking abilities.
            </p>
            <motion.p
              className="mt-3 font-mono text-slate-900"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ staggerChildren: 0.02 }}
            >
              {"Design. Build. Secure. Iterate.".split("").map((ch, i) => (
                <motion.span
                  key={`t-${i}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                >
                  {ch}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="bg-white/70 border-y border-slate-100">
        <div className={`${sectionClass} py-16 sm:py-20`}>
          <SectionHeader title="Skills" />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Programming",
                items: ["TypeScript", "Python", "Rust", "Dart", "JavaScript", "PL/pgSQL"],
              },
              {
                title: "AI / ML",
                items: ["Generative AI", "Multi-LLM Integration", "Prompt Engineering", "Vertex AI", "Gemini API", "Streamlit Apps"],
              },
              {
                title: "Cybersecurity",
                items: ["Threat Detection", "Security Monitoring", "Offensive Security Ops", "Linux/Kali Fundamentals"],
              },
              {
                title: "Web & Cloud",
                items: ["Full-Stack Dev", "Google Cloud", "API Integrations", "Razorpay", "Supabase", "Firebase"],
              },
              {
                title: "Tools",
                items: ["GitHub", "Docker", "Google Cloud Tooling", "Jupyter", "Microsoft Office"],
              },
            ].map((cat, idx) => (
              <motion.div
                key={cat.title}
                variants={fadeInUp(0.05 * idx)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div
                  whileHover="hover"
                  variants={cardHover}
                  className="h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-slate-900">{cat.title}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <Pill key={item}>{item}</Pill>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className={`${sectionClass} py-16 sm:py-20`}>
        <SectionHeader
          title="Projects"
          subtitle="A selection of works spanning AI, security, and cloud-native engineering."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: "privacy-ai",
              name: "Privacy AI Assistant",
              description: "Privacy-preserving assistant for handling sensitive data with LLMs. Built for Google Gemma 3n Impact Challenge.",
              url: "https://github.com/Ncn914491/privacy_ai_assistant",
              topics: ["TypeScript", "Python", "Vertex AI", "Gemini API"]
            },
            {
              id: "medical-error",
              name: "Medical Error Prevention",
              description: "AI-assisted system to minimize medical risks. Built for LablabAI Raise Your Hack Hackathon.",
              url: "https://github.com/Ncn914491/medical-error-prevention",
              topics: ["React", "Vite", "AI Pipelines"]
            },
            {
              id: "devguard-ai",
              name: "DevGuard AI",
              description: "AI copilot for developer productivity + security workflows. Built for Code with Kiro Hackathon.",
              url: "https://github.com/Ncn914491/devguard-ai-copilot",
              topics: ["Dart", "CI/CD", "Cloud-native"]
            },
            {
              id: "career-guidance",
              name: "Career Guidance Platform",
              description: "AI-powered student platform with guidance, dashboards & chat functionality.",
              url: "https://github.com/Ncn914491/careerguidance",
              topics: ["Next.js", "TypeScript", "Supabase", "Tailwind", "Gemini API"]
            },
            {
              id: "multi-llm-chatbot",
              name: "Multi-LLM Chatbot",
              description: "Unified chatbot supporting Gemini, Mistral & more with Flask, Tkinter, CLI + Web UI.",
              url: "https://github.com/Ncn914491/chatbot",
              topics: ["Python", "Flask", "Tkinter"]
            },
            {
              id: "safehaven",
              name: "SafeHaven",
              description: "Emergency alert app with SOS, incident reporting, and help center locator functionality.",
              url: "https://github.com/Ncn914491/SafeHaven",
              topics: ["Expo", "Express", "Cloud Run", "Docker"]
            },
            {
              id: "secureai-threatscope",
              name: "SecureAI ThreatScope",
              description: "AI-based threat detection & analysis on cloud using Google Cloud Vision APIs.",
              url: "https://github.com/Ncn914491/secureai-threatscope-final",
              topics: ["Google Cloud", "AI Security", "Vision APIs"]
            },
            {
              id: "sentiment-analysis",
              name: "Sentiment Analysis Pipeline",
              description: "Text sentiment classification & insights. Delivered during Edunet Foundation Internship.",
              url: "https://github.com/Ncn914491/sentiment-analysis-pipeline",
              topics: ["Python", "ML", "Generative AI"]
            },
            {
              id: "razorpay-integration",
              name: "Article Platform",
              description: "Secure payment gateway integration for a content platform using Razorpay APIs.",
              url: "https://github.com/Ncn914491/article-platform",
              topics: ["TypeScript", "Razorpay APIs"]
            }
          ].map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
                <a
                  aria-label="GitHub"
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-500 hover:text-slate-700 transition"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
              <p className="mt-2 text-sm text-slate-600 line-clamp-3">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.topics.slice(0, 5).map((t) => (
                  <Pill key={`${p.id}-${t}`}>{t}</Pill>
                ))}
              </div>
              <motion.div
                className="mt-4 inline-flex translate-y-1 opacity-0 items-center gap-2 text-blue-600"
                whileHover={{ y: -2, opacity: 1 }}
              >
                <span className="text-sm font-medium">View Project</span>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Hackathons */}
      <section id="hackathons" className="bg-white/70 border-y border-slate-100">
        <div className={`${sectionClass} py-16 sm:py-20`}>
          <SectionHeader title="Hackathons" />
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />
            <div className="space-y-8">
              {[
                {
                  name: "Google Gemma 3n Impact Challenge (Kaggle)",
                  project: "Privacy AI Assistant",
                  outcome: "Privacy-preserving assistant for handling sensitive data with LLMs.",
                  url: "https://github.com/Ncn914491/privacy_ai_assistant"
                },
                {
                  name: "LablabAI Raise Your Hack",
                  project: "Medical Error Prevention",
                  outcome: "AI-assisted system to minimize medical risks.",
                  url: "https://github.com/Ncn914491/medical-error-prevention"
                },
                {
                  name: "Code with Kiro Hackathon",
                  project: "DevGuard AI",
                  outcome: "AI copilot for developer productivity + security workflows.",
                  url: "https://github.com/Ncn914491/devguard-ai-copilot"
                },
              ].map((h, idx) => (
                <motion.div
                  key={h.name}
                  variants={fadeInUp(0.05 * idx)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative pl-12"
                >
                  <div className="absolute left-0 top-1.5 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow">
                    <Medal className="h-4 w-4" />
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-slate-900">{h.name}</h4>
                      <a href={h.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                        Project Link
                      </a>
                    </div>
                    <p className="mt-1 text-sm text-slate-700">Project: {h.project}</p>
                    <p className="mt-2 text-sm text-slate-600">{h.outcome}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className={`${sectionClass} py-16 sm:py-20`}>
        <SectionHeader title="Certifications" />
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <motion.div
            className="flex gap-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            {[
              "Microsoft AI-900",
              "Microsoft Career Essentials (Cybersecurity)",
              "Microsoft Career Essentials (Generative AI)",
              "Microsoft AI Skills Fest (15+ modules)",
              "Google Cloud GenAI Exchange (20+ labs)",
              "Google Cloud Vertex AI",
              "Google Cloud Gemini API",
              "Google Cloud Streamlit Apps",
              "Google Cloud Prompt Design",
              "Google Cloud Responsible AI",
              "Cisco Intro to Cybersecurity",
              "TCM Security Linux 100 (Kali)",
              "Cybrary Offensive Security Operations",
              "Forage Cybersecurity Analyst Simulation",
              "LinkedIn Cybersecurity Foundations",
              "LinkedIn Intro to AI",
              "LinkedIn Microsoft Security Copilot",
              "Freedom With AI Masterclass",
              "JNTU Kakinada Generative AI for Data Analytics",
            ].map((c) => (
              <div
                key={c}
                className="min-w-64 shrink-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm"
                title="Click to view credential"
              >
                <div className="flex items-center gap-2 text-slate-800">
                  <BadgeCheck className="h-4 w-4 text-blue-600" />
                  {c}
                </div>
                <div className="mt-2 text-xs text-slate-500">Issued: 2024</div>
              </div>
            ))}
            {/* duplicate for seamless loop */}
            {[
              "Microsoft AI-900",
              "Microsoft Career Essentials (Cybersecurity)",
              "Microsoft Career Essentials (Generative AI)",
              "Microsoft AI Skills Fest (15+ modules)",
              "Google Cloud GenAI Exchange (20+ labs)",
              "Google Cloud Vertex AI",
              "Google Cloud Gemini API",
              "Google Cloud Streamlit Apps",
              "Google Cloud Prompt Design",
              "Google Cloud Responsible AI",
              "Cisco Intro to Cybersecurity",
              "TCM Security Linux 100 (Kali)",
              "Cybrary Offensive Security Operations",
              "Forage Cybersecurity Analyst Simulation",
              "LinkedIn Cybersecurity Foundations",
              "LinkedIn Intro to AI",
              "LinkedIn Microsoft Security Copilot",
              "Freedom With AI Masterclass",
              "JNTU Kakinada Generative AI for Data Analytics",
            ].map((c, i) => (
              <div
                key={`${c}-dup-${i}`}
                className="min-w-64 shrink-0 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm"
                title="Click to view credential"
              >
                <div className="flex items-center gap-2 text-slate-800">
                  <BadgeCheck className="h-4 w-4 text-blue-600" />
                  {c}
                </div>
                <div className="mt-2 text-xs text-slate-500">Issued: 2024</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Internship */}
      <section id="internship" className="bg-white/70 border-y border-slate-100">
        <div className={`${sectionClass} py-16 sm:py-20`}>
          <SectionHeader title="Internship" />
          <motion.div
            variants={fadeInUp(0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Logo_placeholder.svg"
                    alt="Edunet Logo"
                    className="h-10 w-10 rounded bg-slate-100"
                  />
                  <h4 className="text-xl font-semibold text-slate-900">
                    Edunet Foundation — AI/ML Intern (Jun–Jul 2025, Remote)
                  </h4>
                </div>
                <p className="mt-2 text-slate-700 text-sm">
                  Delivered Sentiment Analysis Pipeline. Explored SafeHaven & SecureAI ThreatScope (cloud-native prototypes).
                </p>
              </div>
              <div className="w-full md:w-64">
                <div className="text-xs text-slate-600 mb-1">Progress</div>
                <div className="h-2 rounded bg-slate-100 overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-600"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "85%" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements" className={`${sectionClass} py-16 sm:py-20`}>
        <SectionHeader title="Achievements" />
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { title: "NCC Cadet", desc: "Discipline & leadership through National Cadet Corps training." },
            { title: "Chess Player", desc: "Strategic problem-solving and critical thinking through competitive chess." },
          ].map((a, idx) => (
            <motion.div
              key={a.title}
              variants={fadeInUp(0.05 * idx)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <Medal className="h-6 w-6 text-blue-600 animate-pulse" />
                <h4 className="text-xl font-semibold text-slate-900">{a.title}</h4>
              </div>
              <p className="mt-2 text-slate-700 text-sm">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-white/70 border-t border-slate-100">
        <div className={`${sectionClass} py-16 sm:py-20`}>
          <SectionHeader title="Contact" />
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              variants={fadeInUp(0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <ContactForm />
            </motion.div>

            <motion.div
              variants={fadeInUp(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-slate-700">
                Prefer quick links? Reach out on your favorite platform:
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="mailto:chaitanyanaidunarisetti@gmail.com"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-800 shadow-sm hover:bg-slate-50 transition"
                >
                  <Mail className="h-4 w-4 text-blue-600" />
                  Email
                </a>
                <a
                  href="https://linkedin.com/in/narisetti-chaitanya-naidu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-800 shadow-sm hover:bg-slate-50 transition"
                >
                  <Linkedin className="h-4 w-4 text-blue-600" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Ncn914491"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-800 shadow-sm hover:bg-slate-50 transition"
                >
                  <Github className="h-4 w-4 text-blue-600" />
                  GitHub
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8">
        <div className={`${sectionClass} text-center text-slate-500 text-sm`}>
          © {new Date().getFullYear()} Narisetti Chaitanya Naidu — Built with Next.js & Tailwind
        </div>
      </footer>
    </div>
  );
}
