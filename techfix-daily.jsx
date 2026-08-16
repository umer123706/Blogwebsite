import React, { useState, useEffect, useRef } from "react";
import {
  Search, AppWindow, TerminalSquare, Wifi, Sparkles, LifeBuoy, Layers,
  ArrowLeft, Mail, Menu, X, Clock, ArrowUpRight
} from "lucide-react";

const TOKENS = {
  paper: "#F6F5F0",
  panel: "#FFFFFF",
  ink: "#14181B",
  inkSoft: "#5B5F57",
  line: "#E4E1D6",
  accent: "#2F6FED",
  accentDeep: "#0B1E42",
  ok: "#3FBE72",
  warn: "#E0A62A",
};

const CATEGORIES = [
  { name: "Windows", icon: AppWindow, blurb: "Fix common Windows issues and learn useful settings." },
  { name: "Linux", icon: TerminalSquare, blurb: "Commands, troubleshooting and beginner-friendly Linux guides." },
  { name: "Networking", icon: Wifi, blurb: "Wi-Fi, DNS, IP and connectivity troubleshooting." },
  { name: "AI & Technology", icon: Sparkles, blurb: "Useful AI tools, tips and practical explainers." },
  { name: "IT Support", icon: LifeBuoy, blurb: "Practical support workflows and troubleshooting." },
  { name: "Software & Tools", icon: Layers, blurb: "Guides to useful software and productivity tools." },
];

const ARTICLES = [
  {
    id: "network-troubleshooting",
    category: "Networking",
    title: "How to Troubleshoot a Network Connection: A Beginner's Guide",
    excerpt: "A simple process for checking cables, adapters, IP configuration, DNS and ping before you escalate a network issue.",
    readTime: 8,
    level: "Beginner",
    body: [
      { h: "Start with the physical layer", p: "Before touching any settings, confirm the cable is fully seated, the Wi-Fi network is the one you expect, and the adapter's link light is on. A surprising number of outages are solved by re-seating a cable or power-cycling the router." },
      { h: "Confirm the adapter is detected", p: "Your operating system needs to see the network adapter before anything else can work. Check Device Manager on Windows, System Settings on macOS, or run ip link show on Linux to confirm the interface is up." },
      { h: "Check your IP configuration", p: "Run ipconfig or ip addr. An address starting with 169.254 means the device never got a real address from the router — release and renew it, or reconnect to the network." },
      { h: "Separate DNS problems from connectivity problems", p: "Ping an IP address directly, then ping a domain name. If the IP works but the domain doesn't, DNS is the problem, not your connection. Switching to a public resolver like 1.1.1.1 often clears it up." },
      { h: "Trace the rest of the path", p: "If pinging your router fails, the fault is between you and it. If the router responds but nothing beyond it does, run a trace route to see exactly where the path breaks — and whether it's time to call your ISP." },
    ],
  },
  {
    id: "windows-boot-recovery",
    category: "Windows",
    title: "Windows Won't Boot? A Step-by-Step Recovery Checklist",
    excerpt: "From a black screen to a boot loop — a calm, ordered checklist for getting a Windows machine back to life.",
    readTime: 7,
    level: "Intermediate",
    body: [
      { h: "Don't panic, and don't reinstall yet", p: "Most boot failures are fixable without wiping the drive. Reinstalling should be the last resort, not the first troubleshooting step." },
      { h: "Get into the recovery environment", p: "Interrupt the boot process three times in a row (turning the PC off during startup) to force Windows Recovery Environment to load automatically, or boot from installation media." },
      { h: "Try Startup Repair first", p: "It's automated, safe, and fixes the most common causes: a corrupted boot configuration data (BCD) file or a damaged master boot record." },
      { h: "Roll back recent changes", p: "If the failure started right after a driver install or Windows update, use System Restore or Uninstall Updates from the recovery menu to undo the change that likely caused it." },
      { h: "Check the disk itself", p: "From the recovery command prompt, run chkdsk /f to repair file system errors and sfc /scannow to repair corrupted system files. Run these before assuming the drive has failed." },
      { h: "When to stop troubleshooting", p: "If chkdsk reports bad sectors it can't repair, or the drive isn't detected by BIOS at all, that points to hardware failure — back up what you can from recovery mode and plan for a replacement drive." },
    ],
  },
  {
    id: "linux-commands-beginners",
    category: "Linux",
    title: "10 Linux Commands Every IT Beginner Should Know",
    excerpt: "The small set of commands that cover most day-to-day troubleshooting on any Linux machine.",
    readTime: 6,
    level: "Beginner",
    body: [
      { h: "Move and look around", p: "pwd shows where you are, ls lists what's there, and cd moves you. Add ls -la to see hidden files and permissions in one view." },
      { h: "Read and search files", p: "cat prints a whole file, less lets you page through a long one, and grep searches inside files for a pattern — grep -r \"error\" /var/log searches recursively." },
      { h: "Understand what's running", p: "ps aux lists every running process, and top (or htop, if installed) shows live CPU and memory usage so you can spot what's hogging resources." },
      { h: "Check disk and memory", p: "df -h shows disk space in human-readable form, and free -h shows memory usage. Both are usually the first thing to check when a system feels slow." },
      { h: "Manage permissions safely", p: "chmod changes what a file allows, and chown changes who owns it. Get comfortable with these before you reach for sudo out of habit." },
      { h: "Network basics", p: "ip addr shows your network configuration, and ping tests reachability. Between those two, you can diagnose most simple connectivity issues." },
    ],
  },
  {
    id: "how-llms-work",
    category: "AI & Technology",
    title: "How Large Language Models Actually Work, Explained Simply",
    excerpt: "No jargon, no hype — a plain explanation of what's happening when you type a prompt and get an answer back.",
    readTime: 9,
    level: "Beginner",
    body: [
      { h: "It starts with prediction, not understanding", p: "A language model is trained to predict the next word in a sequence, over and over, across enormous amounts of text. Everything it can do grows out of that one repeated task." },
      { h: "Text becomes numbers", p: "Your prompt is broken into small chunks called tokens, and each token is converted into a list of numbers the model can do math on. Words with related meanings end up with similar number patterns." },
      { h: "Attention decides what matters", p: "As the model processes your prompt, a mechanism called attention lets it weigh which earlier words are relevant to the word it's generating next — this is how it keeps track of context over a long passage." },
      { h: "Generation is one word at a time", p: "The model produces one token, adds it to the conversation, and repeats — using everything generated so far to inform the next token. That loop, running very fast, is what feels like a written reply." },
      { h: "Why it can still be wrong", p: "Because the model is predicting plausible text rather than looking facts up, it can produce confident, fluent answers that are incorrect. Treat it as a capable assistant to verify, not an infallible source." },
    ],
  },
  {
    id: "writing-support-tickets",
    category: "IT Support",
    title: "How to Write a Support Ticket That Gets Fixed Faster",
    excerpt: "The details that let a technician solve your problem on the first pass, instead of the third round of back-and-forth.",
    readTime: 5,
    level: "Beginner",
    body: [
      { h: "Describe the problem, not your theory about it", p: "\"The printer won't print\" is more useful than \"I think the network is down,\" even if you suspect the network. Let the technician diagnose the cause." },
      { h: "Include the exact error message", p: "A screenshot or the exact text of an error message saves a technician from having to reproduce the problem just to see what you saw." },
      { h: "Say what you already tried", p: "If you already restarted the device or cleared the cache, say so. It stops the ticket from bouncing back with the first thing you already ruled out." },
      { h: "Note when it started and how often it happens", p: "\"Every time I open the app\" and \"once, this morning\" point to very different causes. Timing is often the clue that narrows the problem down." },
      { h: "Flag the impact", p: "One sentence on how it affects your work helps support teams prioritize correctly — a login issue blocking your whole team is not the same urgency as a cosmetic UI glitch." },
    ],
  },
  {
    id: "choosing-password-manager",
    category: "Software & Tools",
    title: "Choosing the Right Password Manager for Your Team",
    excerpt: "What actually matters when comparing password managers for a small team, beyond the marketing page.",
    readTime: 6,
    level: "Beginner",
    body: [
      { h: "Shared vaults, not shared passwords", p: "The core feature you're buying is the ability to share a login with a teammate without ever revealing the plaintext password to them. If a tool can't do that cleanly, keep looking." },
      { h: "Look for real admin controls", p: "You'll eventually need to revoke access when someone leaves the team. Confirm the tool can deprovision a user and rotate shared credentials in one step, not several manual ones." },
      { h: "Check where encryption actually happens", p: "Look for tools that encrypt data on your device before it ever reaches their servers (zero-knowledge architecture), so even the provider can't read your vault." },
      { h: "Don't ignore the recovery story", p: "Ask what happens if someone forgets their master password. A tool with no recovery path is safe but brittle; one with a weak recovery path defeats the point of a password manager." },
      { h: "Trial it with real workflows", p: "Try the browser extension, the mobile app, and a shared-folder scenario before committing — most tools look identical on a features page and diverge completely in daily use." },
    ],
  },
  {
    id: "windows-update-errors",
    category: "Windows",
    title: "Understanding Windows Update Errors and How to Fix Them",
    excerpt: "The handful of causes behind most failed Windows updates, and the order to check them in.",
    readTime: 7,
    level: "Intermediate",
    body: [
      { h: "Most failures are one of three things", p: "A stuck update cache, insufficient disk space, or a corrupted system file. Working through these three in order resolves the majority of update errors." },
      { h: "Clear the update cache first", p: "Stop the Windows Update service, clear the contents of the SoftwareDistribution folder, then restart the service. This forces Windows to re-download update files instead of retrying a corrupted one." },
      { h: "Check available disk space", p: "Major updates can need several gigabytes of free space to stage. If the drive is nearly full, updates will silently fail or roll back — clearing space is often the entire fix." },
      { h: "Run the built-in troubleshooter", p: "Windows' own Update Troubleshooter (in Settings) automatically detects and fixes the most common configuration issues, and it's worth running before any manual steps." },
      { h: "Repair system files as a last step", p: "If the error persists, run sfc /scannow followed by DISM /Online /Cleanup-Image /RestoreHealth to repair the underlying system files an update depends on." },
    ],
  },
  {
    id: "remote-work-security-checklist",
    category: "IT Support",
    title: "Remote Work IT Checklist: Securing a Home Office Setup",
    excerpt: "The practical, non-paranoid checklist for making a home office setup reasonably secure.",
    readTime: 6,
    level: "Intermediate",
    body: [
      { h: "Start with the router", p: "Change the default admin password, confirm WPA3 or WPA2 encryption is enabled, and keep the router's firmware updated. This is the single highest-impact step and the most commonly skipped." },
      { h: "Separate work from personal traffic", p: "Where possible, put work devices on a separate network or VLAN from smart home devices and guest traffic — a compromised smart bulb shouldn't have a path to your work laptop." },
      { h: "Keep the VPN and updates non-optional", p: "Company VPNs and automatic OS updates exist for a reason. Disabling them for convenience is one of the most common ways home setups become the weak link." },
      { h: "Lock the physical device too", p: "Full-disk encryption and a short auto-lock timeout matter more at home than in an office, since a lost or stolen laptop has no building security to fall back on." },
      { h: "Use a password manager and MFA everywhere", p: "Multi-factor authentication on email and core work tools closes off the most common way stolen credentials turn into an actual breach." },
    ],
  },
];

function useInjectFonts() {
  useEffect(() => {
    const id = "techfix-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);
}

function Eyebrow({ children }) {
  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        letterSpacing: "0.12em",
        color: TOKENS.accent,
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}

function TerminalBoot() {
  const lines = [
    "$ techfix --index",
    "Loading categories ... done",
    "Indexing 8 articles ... done",
    "Search ready",
    "Status: ONLINE",
  ];
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), 450);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <div
      style={{
        background: TOKENS.accentDeep,
        borderRadius: 10,
        overflow: "hidden",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13,
        color: "#CFE0FF",
        boxShadow: "0 1px 0 rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#E0605A", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#E0A62A", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3FBE72", display: "inline-block" }} />
        <span style={{ marginLeft: 8, fontSize: 12, color: "#8FA6D6" }}>techfix-index.sh</span>
      </div>
      <pre style={{ margin: 0, padding: "18px 16px", minHeight: 150, whiteSpace: "pre-wrap" }}>
        {lines.slice(0, shown).map((l, i) => (
          <div key={i} style={{ color: i === lines.length - 1 ? TOKENS.ok : "#CFE0FF", marginBottom: 4 }}>
            {l}
          </div>
        ))}
        {shown < lines.length && <span style={{ opacity: 0.6 }}>▍</span>}
      </pre>
    </div>
  );
}

function CategoryCard({ cat, active, onClick }) {
  const Icon = cat.icon;
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: "left",
        background: active ? "#EAF0FF" : TOKENS.panel,
        border: `1px solid ${active ? TOKENS.accent : TOKENS.line}`,
        borderRadius: 12,
        padding: "16px 18px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        transition: "border-color 0.15s ease, background 0.15s ease",
      }}
    >
      <Icon size={20} color={TOKENS.accent} strokeWidth={1.8} />
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: TOKENS.ink }}>
        {cat.name}
      </div>
      <div style={{ fontSize: 13, color: TOKENS.inkSoft, lineHeight: 1.5 }}>{cat.blurb}</div>
    </button>
  );
}

function ArticleCard({ article, onOpen }) {
  return (
    <button
      onClick={onOpen}
      style={{
        textAlign: "left",
        background: TOKENS.panel,
        border: `1px solid ${TOKENS.line}`,
        borderRadius: 12,
        padding: 20,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        height: "100%",
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.04em",
          color: TOKENS.accent,
          background: "#EAF0FF",
          padding: "3px 8px",
          borderRadius: 6,
          width: "fit-content",
        }}
      >
        [{article.category}]
      </span>
      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 700, color: TOKENS.ink, margin: 0, lineHeight: 1.35 }}>
        {article.title}
      </h3>
      <p style={{ fontSize: 14, color: TOKENS.inkSoft, margin: 0, lineHeight: 1.6, flexGrow: 1 }}>
        {article.excerpt}
      </p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: TOKENS.inkSoft, borderTop: `1px solid ${TOKENS.line}`, paddingTop: 12 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Clock size={13} /> {article.readTime} min · {article.level}
        </span>
        <span style={{ color: TOKENS.accent, fontWeight: 500, display: "flex", alignItems: "center", gap: 3 }}>
          Read <ArrowUpRight size={13} />
        </span>
      </div>
    </button>
  );
}

export default function TechFixDaily() {
  useInjectFonts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [view, setView] = useState("home");
  const [articleId, setArticleId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subEmail, setSubEmail] = useState("");
  const [subMsg, setSubMsg] = useState("");
  const topRef = useRef(null);
  const latestRef = useRef(null);

  const filtered = ARTICLES.filter((a) => {
    const matchCat = category === "All" || a.category === category;
    const q = query.trim().toLowerCase();
    const matchQ =
      !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const openArticle = (id) => {
    setArticleId(id);
    setView("article");
    window.scrollTo?.({ top: 0, behavior: "instant" });
  };

  const goHome = () => {
    setView("home");
    window.scrollTo?.({ top: 0, behavior: "instant" });
  };

  const jumpToLatest = (cat) => {
    if (cat) setCategory(cat);
    setView("home");
    setTimeout(() => latestRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const activeArticle = ARTICLES.find((a) => a.id === articleId);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!subEmail.trim() || !subEmail.includes("@")) {
      setSubMsg("Enter a valid email address.");
      return;
    }
    setSubMsg(`You're subscribed with ${subEmail}.`);
    setSubEmail("");
  };

  return (
    <div ref={topRef} style={{ background: TOKENS.paper, minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: TOKENS.ink }}>
      <header style={{ borderBottom: `1px solid ${TOKENS.line}`, position: "sticky", top: 0, background: "rgba(246,245,240,0.92)", backdropFilter: "blur(6px)", zIndex: 20 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={goHome} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
            <span style={{ width: 32, height: 32, borderRadius: 8, background: TOKENS.accentDeep, color: "#CFE0FF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 13 }}>TF</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, color: TOKENS.ink }}>
              TechFix <span style={{ color: TOKENS.accent }}>Daily</span>
            </span>
          </button>

          <nav style={{ display: "flex", gap: 22, alignItems: "center" }} className="techfix-nav">
            {["Home", "Categories", "Latest", "About", "Contact"].map((label) => (
              <button
                key={label}
                onClick={() => {
                  if (label === "Home") goHome();
                  else if (label === "Categories") jumpToLatest(null);
                  else if (label === "Latest") jumpToLatest(null);
                  else {
                    setView("home");
                    setTimeout(() => document.getElementById(label.toLowerCase())?.scrollIntoView({ behavior: "smooth" }), 50);
                  }
                }}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: TOKENS.inkSoft, fontWeight: 500 }}
              >
                {label}
              </button>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: TOKENS.panel, border: `1px solid ${TOKENS.line}`, borderRadius: 8, padding: "6px 10px" }} className="techfix-search-desktop">
              <Search size={14} color={TOKENS.inkSoft} />
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setView("home"); }}
                placeholder="Search articles..."
                style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, width: 140, fontFamily: "'Inter', sans-serif" }}
              />
            </div>
          </div>
        </div>
      </header>

      {view === "home" && (
        <main>
          <section style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 24px 40px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center" }} className="techfix-hero-grid">
              <div>
                <Eyebrow>IT · AI · NETWORKING · HOW-TO</Eyebrow>
                <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 42, fontWeight: 700, lineHeight: 1.1, margin: "14px 0 16px" }}>
                  Technology made <span style={{ color: TOKENS.accent }}>simple.</span>
                </h1>
                <p style={{ fontSize: 16, color: TOKENS.inkSoft, lineHeight: 1.65, marginBottom: 24, maxWidth: 460 }}>
                  Practical troubleshooting guides, technology tutorials and beginner-friendly IT knowledge — without the confusing jargon.
                </p>
                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={() => jumpToLatest(null)} style={{ background: TOKENS.ink, color: "#fff", border: "none", borderRadius: 8, padding: "11px 20px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                    Explore articles
                  </button>
                  <button onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "transparent", color: TOKENS.ink, border: `1px solid ${TOKENS.line}`, borderRadius: 8, padding: "11px 20px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                    Browse topics
                  </button>
                </div>
              </div>
              <TerminalBoot />
            </div>
          </section>

          <section style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px 56px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, borderTop: `1px solid ${TOKENS.line}`, borderBottom: `1px solid ${TOKENS.line}`, padding: "24px 0" }} className="techfix-stats">
              {[["8", "Articles indexed"], ["6", "Topics covered"], ["47", "Minutes of reading"], ["Free", "Always"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 22, color: TOKENS.accent }}>{n}</div>
                  <div style={{ fontSize: 12, color: TOKENS.inkSoft, marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="categories" style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px 56px" }}>
            <Eyebrow>EXPLORE TOPICS</Eyebrow>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 700, margin: "8px 0 20px" }}>Find what you need</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }} className="techfix-cat-grid">
              {CATEGORIES.map((c) => (
                <CategoryCard key={c.name} cat={c} active={category === c.name} onClick={() => jumpToLatest(category === c.name ? "All" : c.name)} />
              ))}
            </div>
          </section>

          <section id="latest" ref={latestRef} style={{ maxWidth: 1080, margin: "0 auto", padding: "0 24px 56px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20, flexWrap: "wrap", gap: 16 }}>
              <div>
                <Eyebrow>LATEST GUIDES</Eyebrow>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 700, margin: "8px 0 0" }}>Practical answers</h2>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, background: TOKENS.panel, border: `1px solid ${TOKENS.line}`, borderRadius: 8, padding: "8px 12px" }}>
                  <Search size={14} color={TOKENS.inkSoft} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search articles..."
                    style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, width: 150, fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ border: `1px solid ${TOKENS.line}`, borderRadius: 8, padding: "8px 10px", fontSize: 13, background: TOKENS.panel, color: TOKENS.ink, fontFamily: "'Inter', sans-serif" }}
                >
                  <option value="All">All topics</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <p style={{ color: TOKENS.inkSoft, fontSize: 14, padding: "24px 0" }}>No articles match your search.</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="techfix-article-grid">
                {filtered.map((a) => (
                  <ArticleCard key={a.id} article={a} onOpen={() => openArticle(a.id)} />
                ))}
              </div>
            )}
          </section>

          <section style={{ background: TOKENS.accentDeep, padding: "48px 24px" }}>
            <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
              <div>
                <Eyebrow>FREE TECHNOLOGY TIPS</Eyebrow>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: "#fff", margin: "8px 0 6px" }}>
                  Get useful guides in your inbox.
                </h2>
                <p style={{ color: "#9FB3DC", fontSize: 14, margin: 0 }}>No spam. Unsubscribe any time.</p>
              </div>
              <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="email"
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    placeholder="you@company.com"
                    style={{ border: "none", borderRadius: 8, padding: "11px 14px", fontSize: 14, width: 220, fontFamily: "'Inter', sans-serif" }}
                  />
                  <button type="submit" style={{ background: TOKENS.accent, color: "#fff", border: "none", borderRadius: 8, padding: "11px 18px", fontSize: 14, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" }}>
                    Subscribe
                  </button>
                </div>
                {subMsg && <span style={{ fontSize: 12, color: "#9FE1CB" }}>{subMsg}</span>}
              </form>
            </div>
          </section>

          <section id="about" style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }} className="techfix-about">
            <div>
              <Eyebrow>ABOUT TECHFIX DAILY</Eyebrow>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, margin: "8px 0 0", lineHeight: 1.3 }}>
                Useful technology knowledge without the jargon.
              </h2>
            </div>
            <div style={{ fontSize: 14, color: TOKENS.inkSoft, lineHeight: 1.7 }}>
              <p>TechFix Daily is a practical technology publication covering IT support, troubleshooting, networking, Windows, Linux, AI and software.</p>
              <p>The goal is simple: explain technical problems clearly and give readers steps they can actually follow.</p>
            </div>
          </section>

          <section id="contact" style={{ background: TOKENS.panel, borderTop: `1px solid ${TOKENS.line}`, borderBottom: `1px solid ${TOKENS.line}` }}>
            <div style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
              <div>
                <Eyebrow>CONTACT</Eyebrow>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, margin: "8px 0 4px" }}>Have a topic you'd like explained?</h2>
                <p style={{ fontSize: 14, color: TOKENS.inkSoft, margin: 0 }}>Send a suggestion and help shape future guides.</p>
              </div>
              <a href="mailto:hello@techfixdaily.example" style={{ display: "flex", alignItems: "center", gap: 8, background: TOKENS.ink, color: "#fff", borderRadius: 8, padding: "11px 20px", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
                <Mail size={15} /> Email TechFix Daily
              </a>
            </div>
          </section>
        </main>
      )}

      {view === "article" && activeArticle && (
        <main style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 80px" }}>
          <button onClick={goHome} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: TOKENS.inkSoft, fontSize: 13, marginBottom: 24 }}>
            <ArrowLeft size={15} /> Back to all articles
          </button>

          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: TOKENS.accent,
              background: "#EAF0FF",
              padding: "3px 8px",
              borderRadius: 6,
            }}
          >
            [{activeArticle.category}]
          </span>

          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 700, lineHeight: 1.25, margin: "16px 0 12px" }}>
            {activeArticle.title}
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: TOKENS.inkSoft, marginBottom: 32, paddingBottom: 24, borderBottom: `1px solid ${TOKENS.line}` }}>
            <Clock size={14} /> {activeArticle.readTime} min read · {activeArticle.level}
          </div>

          {activeArticle.body.map((section, i) => (
            <div key={i} style={{ marginBottom: 26 }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 19, fontWeight: 700, margin: "0 0 10px" }}>{section.h}</h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.75, color: "#2C302B", margin: 0 }}>{section.p}</p>
            </div>
          ))}

          <div style={{ marginTop: 40, paddingTop: 24, borderTop: `1px solid ${TOKENS.line}` }}>
            <Eyebrow>KEEP READING</Eyebrow>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }} className="techfix-related">
              {ARTICLES.filter((a) => a.id !== activeArticle.id && a.category === activeArticle.category)
                .concat(ARTICLES.filter((a) => a.id !== activeArticle.id && a.category !== activeArticle.category))
                .slice(0, 2)
                .map((a) => (
                  <ArticleCard key={a.id} article={a} onOpen={() => openArticle(a.id)} />
                ))}
            </div>
          </div>
        </main>
      )}

      <footer style={{ borderTop: `1px solid ${TOKENS.line}` }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 24px 24px", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 32 }} className="techfix-footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ width: 28, height: 28, borderRadius: 7, background: TOKENS.accentDeep, color: "#CFE0FF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: 11 }}>TF</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15 }}>TechFix Daily</span>
            </div>
            <p style={{ fontSize: 13, color: TOKENS.inkSoft, maxWidth: 260, lineHeight: 1.6 }}>Practical technology guides and troubleshooting resources.</p>
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, margin: "0 0 10px" }}>Topics</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {CATEGORIES.slice(0, 4).map((c) => (
                <button key={c.name} onClick={() => jumpToLatest(c.name)} style={{ background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", fontSize: 13, color: TOKENS.inkSoft }}>
                  {c.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, margin: "0 0 10px" }}>Information</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button onClick={() => { setView("home"); setTimeout(() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), 50); }} style={{ background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", fontSize: 13, color: TOKENS.inkSoft }}>About</button>
              <button onClick={() => { setView("home"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 50); }} style={{ background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", fontSize: 13, color: TOKENS.inkSoft }}>Contact</button>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "16px 24px", borderTop: `1px solid ${TOKENS.line}`, fontSize: 12, color: TOKENS.inkSoft }}>
          © 2026 TechFix Daily. All rights reserved.
        </div>
      </footer>

      <style>{`
        @media (max-width: 760px) {
          .techfix-nav { display: none; }
          .techfix-search-desktop { display: none; }
          .techfix-hero-grid { grid-template-columns: 1fr !important; }
          .techfix-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .techfix-cat-grid { grid-template-columns: 1fr !important; }
          .techfix-article-grid { grid-template-columns: 1fr !important; }
          .techfix-about { grid-template-columns: 1fr !important; }
          .techfix-footer-grid { grid-template-columns: 1fr !important; }
          .techfix-related { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
