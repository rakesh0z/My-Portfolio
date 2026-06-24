import { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  ExternalLink,
  Code2,
  Database,
  Globe,
  Award,
  GraduationCap,
  Briefcase,
  User,
  ChevronDown,
  Terminal,
  Layers,
  Cpu,
} from "lucide-react";

const NAV_ITEMS = ["About", "Skills", "Experience", "Education", "Certifications", "Contact"];

const SKILLS = {
  "Languages": { icon: <Code2 size={16} />, items: ["Java", "Python", "JavaScript"] },
  "Web Tech": { icon: <Globe size={16} />, items: ["React.js", "Node.js", "Express.js", "HTML", "CSS", "REST API", "JWT Auth"] },
  "Databases": { icon: <Database size={16} />, items: ["MongoDB", "PostgreSQL", "MySQL"] },
  "Tools": { icon: <Terminal size={16} />, items: ["Git", "GitHub", "Postman"] },
  "Concepts": { icon: <Layers size={16} />, items: ["RBAC", "MVC", "Clean Architecture", "CRUD"] },
};

const INTERNSHIPS = [
  {
    role: "Java Tech Stack Intern",
    company: "Infosys Springboard",
    type: "Virtual",
    period: "Oct 2025 – Dec 2025",
    duration: "45 Days",
    points: [
      "Applied Role-Based Access Control (RBAC) for Admin, Instructor, and Student roles across services.",
      "Secured backend services using stateless JWT authentication with custom Spring Security filters.",
      "Followed clean architecture principles (Controller–Service–Repository) and REST best practices.",
    ],
  },
  {
    role: "Web Development Intern",
    company: "Web Bocket Software Pvt. Ltd.",
    type: "Bhubaneswar",
    period: "May 2025 – Jul 2025",
    duration: "45 Days",
    points: [
      "Built and deployed fully functional web applications with a backend-first approach.",
      "Developed RESTful APIs using Node.js and Express.js with business logic and routing.",
    ],
  },
  {
    role: "Core Java Intern",
    company: "CTTC (Central Tool Room & Training Center)",
    type: "Bhubaneswar",
    period: "Jul 2024 – Jul 2024",
    duration: "30 Days",
    points: [
      "Completed Core Java training covering OOP concepts, File Handling, and Modules.",
    ],
  },
];

const CERTS = [
  { title: "Introduction to Software Engineering", issuer: "Coursera / IBM" },
  { title: "Introduction to Cloud Computing", issuer: "Coursera / IBM" },
  { title: "Developing Frontend Apps with React", issuer: "Coursera / IBM" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-primary mb-4">
      <span className="w-8 h-px bg-primary" />
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-12"
      style={{ fontFamily: "'Rajdhani', sans-serif" }}
    >
      {children}
    </h2>
  );
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Full-Stack Developer & CSE (AI) Student";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(8,11,18,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
          <span
            className="text-primary font-bold text-xl tracking-wider"
            style={{ fontFamily: "'Rajdhani', sans-serif" }}
          >
            RM<span className="text-foreground">.</span>
          </span>
          <ul className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollTo(item)}
                  className="text-sm font-mono tracking-wider transition-colors duration-200"
                  style={{
                    color: activeNav === item ? "var(--primary)" : "var(--muted-foreground)",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
          <a
            href="mailto:rmahapatra471@gmail.com"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 border text-xs font-mono tracking-wider text-primary transition-all duration-200 hover:bg-primary hover:text-background"
            style={{ borderColor: "var(--primary)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            Hire Me
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="about"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Grid bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,212,170,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-24 pb-20 grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <p
              className="text-xs font-mono tracking-[0.3em] text-primary mb-6 uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              &gt; Hello, World —
            </p>
            <h1
              className="text-6xl md:text-8xl font-bold text-foreground leading-[0.95] mb-6"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              Rakesh
              <br />
              <span className="text-primary">Mahapatra</span>
            </h1>
            <p
              className="text-base md:text-lg text-muted-foreground min-h-[28px] mb-8 font-mono"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {typedText}
              <span className="animate-pulse text-primary">|</span>
            </p>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed mb-10">
              Leveraging emerging software technologies to drive innovation — building full-stack applications
              with Java, React, and Node.js from Bhubaneswar, India.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("Experience")}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-background text-sm font-semibold tracking-wide transition-all duration-200 hover:opacity-90"
              >
                View Work <ExternalLink size={14} />
              </button>
              <a
                href="https://www.linkedin.com/in/rakesh-mahapatra-6b9b05293/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 border text-foreground text-sm font-semibold tracking-wide transition-all duration-200 hover:border-primary hover:text-primary"
                style={{ borderColor: "rgba(255,255,255,0.15)" }}
              >
                LinkedIn <Linkedin size={14} />
              </a>
            </div>
          </div>

          {/* Stats column */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {[
              { label: "Internships Completed", value: "3", icon: <Briefcase size={18} /> },
              { label: "IBM Certifications", value: "3", icon: <Award size={18} /> },
              { label: "Tech Stack Size", value: "15+", icon: <Cpu size={18} /> },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-5 p-5 border"
                style={{
                  background: "var(--card)",
                  borderColor: "rgba(255,255,255,0.07)",
                  animationDelay: `${i * 150}ms`,
                }}
              >
                <span className="text-primary">{stat.icon}</span>
                <div>
                  <div
                    className="text-3xl font-bold text-foreground"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground tracking-wide">{stat.label}</div>
                </div>
              </div>
            ))}

            <div
              className="p-5 border mt-2"
              style={{ background: "var(--card)", borderColor: "rgba(0,212,170,0.25)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span
                  className="text-xs font-mono text-primary tracking-wider"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Open to opportunities
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Balugaon, Odisha", "Indian"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 font-mono text-muted-foreground"
                    style={{ background: "rgba(255,255,255,0.04)", fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <FadeIn>
            <SectionLabel>Technical Skills</SectionLabel>
            <SectionHeading>What I Work With</SectionHeading>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.entries(SKILLS).map(([category, { icon, items }], i) => (
              <FadeIn key={category} delay={i * 80}>
                <div
                  className="p-6 border h-full transition-all duration-300 hover:border-primary/30 group"
                  style={{ background: "var(--card)", borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="p-2 text-primary"
                      style={{ background: "rgba(0,212,170,0.1)" }}
                    >
                      {icon}
                    </span>
                    <h3
                      className="text-sm font-bold tracking-widest text-foreground uppercase"
                      style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    >
                      {category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-3 py-1.5 font-mono text-muted-foreground border transition-colors duration-200 group-hover:border-primary/20"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          background: "rgba(255,255,255,0.03)",
                          borderColor: "rgba(255,255,255,0.07)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        className="py-24 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(14,18,32,0.5)" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <FadeIn>
            <SectionLabel>Work Experience</SectionLabel>
            <SectionHeading>Internships & Training</SectionHeading>
          </FadeIn>

          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-0 top-0 bottom-0 w-px hidden md:block"
              style={{ background: "linear-gradient(to bottom, var(--primary), transparent)", marginLeft: "11px" }}
            />

            <div className="flex flex-col gap-10">
              {INTERNSHIPS.map((exp, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div className="md:pl-12 relative">
                    {/* Dot */}
                    <div
                      className="absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full border-2 border-primary bg-background hidden md:flex items-center justify-center"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>

                    <div
                      className="p-6 border hover:border-primary/30 transition-all duration-300"
                      style={{ background: "var(--card)", borderColor: "rgba(255,255,255,0.07)" }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <h3
                            className="text-xl font-bold text-foreground"
                            style={{ fontFamily: "'Rajdhani', sans-serif" }}
                          >
                            {exp.role}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-primary text-sm font-medium">{exp.company}</span>
                            <span className="text-muted-foreground text-xs">·</span>
                            <span className="text-muted-foreground text-xs">{exp.type}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className="text-xs font-mono px-3 py-1 text-primary"
                            style={{
                              background: "rgba(0,212,170,0.1)",
                              fontFamily: "'JetBrains Mono', monospace",
                            }}
                          >
                            {exp.duration}
                          </div>
                          <div
                            className="text-xs text-muted-foreground mt-1"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            {exp.period}
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {exp.points.map((pt, j) => (
                          <li key={j} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                            <span className="text-primary mt-1 shrink-0">›</span>
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-24 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <FadeIn>
            <SectionLabel>Education</SectionLabel>
            <SectionHeading>Academic Background</SectionHeading>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                level: "B.Tech",
                field: "Computer Science & Engineering (AI)",
                institution: "GIFT Autonomous, Bhubaneswar",
                board: "Biju Patnaik University of Technology",
                status: "Pursuing",
              },
              {
                level: "12th",
                field: "Intermediate",
                institution: "Godavaris Mahavidyalaya, Banpur",
                board: "CHSE Board",
                status: "Completed",
              },
              {
                level: "10th",
                field: "Matriculation",
                institution: "SSVM, Banpur",
                board: "BSE Board",
                status: "Completed",
              },
            ].map((edu, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div
                  className="p-6 border h-full flex flex-col hover:border-primary/30 transition-all duration-300"
                  style={{ background: "var(--card)", borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <GraduationCap size={22} className="text-primary" />
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 tracking-wider"
                      style={{
                        background: edu.status === "Pursuing" ? "rgba(0,212,170,0.1)" : "rgba(255,255,255,0.05)",
                        color: edu.status === "Pursuing" ? "var(--primary)" : "var(--muted-foreground)",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {edu.status}
                    </span>
                  </div>
                  <div
                    className="text-4xl font-bold text-primary mb-2"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    {edu.level}
                  </div>
                  <h3
                    className="text-base font-semibold text-foreground mb-2"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    {edu.field}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-auto">{edu.institution}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">{edu.board}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section
        id="certifications"
        className="py-24 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(14,18,32,0.5)" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <FadeIn>
            <SectionLabel>Certifications</SectionLabel>
            <SectionHeading>Credentials</SectionHeading>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5">
            {CERTS.map((cert, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div
                  className="flex items-start gap-4 p-6 border hover:border-primary/30 transition-all duration-300"
                  style={{ background: "var(--card)", borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <Award size={20} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground leading-snug mb-2">{cert.title}</p>
                    <p
                      className="text-xs font-mono text-muted-foreground"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <FadeIn>
            <SectionLabel>Contact</SectionLabel>
            <SectionHeading>Get In Touch</SectionHeading>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-10">
            <FadeIn>
              <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
                I&apos;m actively looking for internships and full-time opportunities. Whether you have a project,
                a question, or just want to connect — my inbox is always open.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <Mail size={16} />, label: "rmahapatra471@gmail.com", href: "mailto:rmahapatra471@gmail.com" },
                  { icon: <Phone size={16} />, label: "+91 9938354055", href: "tel:+919938354055" },
                  { icon: <MapPin size={16} />, label: "Balugaon, Khordha, Odisha — 752030", href: null },
                  {
                    icon: <Linkedin size={16} />,
                    label: "linkedin.com/in/rakesh-mahapatra-6b9b05293",
                    href: "https://www.linkedin.com/in/rakesh-mahapatra-6b9b05293/",
                  },
                ].map((contact, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span
                      className="p-2 text-primary shrink-0"
                      style={{ background: "rgba(0,212,170,0.1)" }}
                    >
                      {contact.icon}
                    </span>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        target={contact.href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 break-all"
                      >
                        {contact.label}
                      </a>
                    ) : (
                      <span className="text-sm text-muted-foreground">{contact.label}</span>
                    )}
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div
                className="p-8 border h-full"
                style={{ background: "var(--card)", borderColor: "rgba(0,212,170,0.15)" }}
              >
                <div className="mb-6">
                  <h3
                    className="text-2xl font-bold text-foreground mb-2"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                  >
                    Personal Details
                  </h3>
                  <div className="w-10 h-0.5 bg-primary" />
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  {[
                    ["DOB", "15 June 2005"],
                    ["Gender", "Male"],
                    ["Nationality", "Indian"],
                    ["Languages", "English, Hindi, Odia"],
                    ["Strengths", "Adaptability, Problem Solving"],
                    ["Hobbies", "Swimming, Cooking"],
                  ].map(([label, value]) => (
                    <div key={label} className={label === "Languages" || label === "Strengths" || label === "Hobbies" ? "col-span-2" : ""}>
                      <p
                        className="text-[10px] font-mono text-muted-foreground/60 tracking-widest uppercase mb-1"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {label}
                      </p>
                      <p className="text-sm text-foreground font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 border-t text-center"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <p
          className="text-xs font-mono text-muted-foreground"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          © 2025 Rakesh Mahapatra · Built with React
          <span className="text-primary mx-2">·</span>
          Bhubaneswar, India
        </p>
      </footer>
    </div>
  );
}
