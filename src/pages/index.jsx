import { useState, useEffect, useRef } from "react";
import { Phone, MessageCircle } from "lucide-react";
import Head from "next/head";

const translations = {
  en: {
    nav: { features: "Features", coaching: "Coaching", ai: "AI", stats: "Stats", team: "Team" },
    hero: {
      badge: "The Future of Fitness",
      title: "Fuel Your",
      titleAccent: "Evolution",
      subtitle: "The all-in-one fitness super-app powered by AI. Track calories, connect with coaches, build your best body.",
      cta1: "Download Android",
      cta2: "Download iOS",
      cta3: "GitHub Repo",
      cta4: "Admin Dashboard",
      stat1: "Active Users",
      stat2: "Calories Tracked",
      stat3: "Coaches",
    },
    tracking: {
      badge: "Smart Tracking",
      title: "Every Calorie.",
      titleAccent: "Every Rep.",
      subtitle: "Log meals, scan food, track burned calories from workouts. Your body is a system — GymFuel is the OS.",
      feature1: "Food intake & macro tracking",
      feature2: "Burned calories from gym sessions",
      feature3: "Custom recipe creation",
      card1: { label: "Calories Today", value: "2,340", sub: "of 2,600 goal" },
      card2: { label: "Protein", value: "142g", sub: "of 160g goal" },
      card3: { label: "Workouts", value: "5", sub: "This week" },
    },
    coaching: {
      badge: "Elite Coaching",
      title: "Your Coach.",
      titleAccent: "Always On.",
      subtitle: "Program and nutrition tracking, along with real-time messaging and voice calls between coaches and clients. Professional support, anywhere, anytime.",
      feature1: "Instant messaging with read receipts",
      feature2: "HD voice calls — no third-party apps",
      feature3: "Coach invitation & role system",
    },
    ai: {
      badge: "AI Intelligence",
      title: "A.I. That",
      titleAccent: "Knows You.",
      subtitle: "Your personal AI assistant understands your fitness profile, nutrition habits, workouts, and full app history.",
      feature1: "Personalized meal suggestions",
      feature2: "Workout optimization based on goals",
      feature3: "Real-time app guidance",
      chat1: "What should I eat before my workout today?",
      chat2: "Based on your 5am strength session and 2,100 kcal goal, have 40g oats + 2 eggs + black coffee 45 min before. Your protein is currently low — I'll adjust dinner.",
    },
    stats: {
      badge: "Progress Analytics",
      title: "Your Progress.",
      titleAccent: "Visualized.",
      subtitle: "Advanced analytics dashboard with weight trends, streak counters, macro breakdowns, and goal milestones.",
      feature1: "Weight goal tracking & projections",
      feature2: "Streak & consistency metrics",
      feature3: "Full macro & calorie history",
    },
    team: {
      badge: "The Builders",
      title: "Built By",
      titleAccent: "Obsessives.",
      subtitle: "A team of RSI master students of FST Settat who believe software should feel as good as results.",
      members: [
        { name: "LAMRISSI Bahaa-eddine", image: "/pahae.png", role: "Full-Stack Developper", github: "https://github.com/oPahae", linkedin: "https://www.linkedin.com/in/bahaa-eddine-lamrissi-81366528a/" },
        { name: "GANA Anas", image: "/anas.png", role: "Full-Stack Developper", github: "https://github.com/anas-gn", linkedin: "https://www.linkedin.com/in/anas-gana-875378325/?locale=en" },
        { name: "TAYEF Jihane", image: "/jihane.png", role: "Full-Stack Developper", github: "https://github.com/tayef-jihane", linkedin: "https://www.linkedin.com/in/tayef-jihane-2a9a10273/" },
        { name: "ZIDANE Zaynab", image: "/zaynab.png", role: "Full-Stack Developper", github: "https://github.com/zaynab-web", linkedin: "https://www.linkedin.com/in/zaynab-zidane-642055301/" },
      ],
    },
    admin: {
      badge: "Admin Dashboard",
      title: "Control.",
      titleAccent: "Everything.",
      subtitle:
        "A powerful administration panel designed to manage the entire GymFuel ecosystem from one place.",
      feature1: "Manage clients and subscriptions",
      feature2: "Manage coaches and permissions",
      feature3: "Manage ingredients and nutrition database",
      feature4: "Manage exercises and training library",
      visit: "Open Admin Panel",
      url: "gymfuel-admin.vercel.app"
    },
    footer: { rights: "All rights reserved.", tagline: "Built for those who never stop." },
  },
  fr: {
    nav: { features: "Fonctionnalités", coaching: "Coaching", ai: "IA", stats: "Statistiques", team: "Équipe" },
    hero: {
      badge: "Le Futur du Fitness",
      title: "Alimentez Votre",
      titleAccent: "Évolution",
      subtitle: "La super-app fitness tout-en-un propulsée par l'IA. Suivez vos calories, connectez-vous avec des coachs, construisez votre meilleur corps.",
      cta1: "Télécharger Android",
      cta2: "Télécharger iOS",
      cta3: "Dépôt GitHub",
      cta4: "Tableau de Bord Admin",
      stat1: "Utilisateurs Actifs",
      stat2: "Calories Suivies",
      stat3: "Coachs",
    },
    tracking: {
      badge: "Suivi Intelligent",
      title: "Chaque Calorie.",
      titleAccent: "Chaque Série.",
      subtitle: "Enregistrez vos repas, scannez les aliments, suivez les calories brûlées. Votre corps est un système — GymFuel est l'OS.",
      feature1: "Suivi des apports alimentaires et macros",
      feature2: "Calories brûlées lors des séances",
      feature3: "Création de recettes personnalisées",
      card1: { label: "Calories Aujourd'hui", value: "2 340", sub: "sur 2 600 objectif" },
      card2: { label: "Protéines", value: "142g", sub: "sur 160g objectif" },
      card3: { label: "Entraînements", value: "5", sub: "Cette semaine" },
    },
    coaching: {
      badge: "Coaching Élite",
      title: "Votre Coach.",
      titleAccent: "Toujours Là.",
      subtitle: "Suivi de programme et de nourriture en plus de la messagerie en temps réel et appels vocaux entre coachs et clients. Un accompagnement professionnel, partout, tout le temps.",
      feature1: "Messagerie instantanée avec accusés de lecture",
      feature2: "Appels vocaux HD — sans applications tierces",
      feature3: "Système d'invitation et de rôles pour coachs",
    },
    ai: {
      badge: "Intelligence Artificielle",
      title: "Une IA Qui",
      titleAccent: "Vous Connaît.",
      subtitle: "Votre assistant IA personnel comprend votre profil fitness, vos habitudes nutritionnelles, vos entraînements et l'historique complet.",
      feature1: "Suggestions de repas personnalisées",
      feature2: "Optimisation des entraînements selon vos objectifs",
      feature3: "Guidage dans l'application en temps réel",
      chat1: "Que devrais-je manger avant mon entraînement aujourd'hui ?",
      chat2: "Vu votre séance de force à 5h et votre objectif de 2 100 kcal, prenez 40g de flocons d'avoine + 2 œufs + café noir 45 min avant. Votre apport protéique est bas — j'adapterai le dîner.",
    },
    stats: {
      badge: "Analytiques de Progression",
      title: "Vos Progrès.",
      titleAccent: "Visualisés.",
      subtitle: "Tableau de bord analytique avec tendances de poids, compteurs de séries, répartitions de macros et jalons d'objectifs.",
      feature1: "Suivi des objectifs de poids et projections",
      feature2: "Métriques de régularité et de constance",
      feature3: "Historique complet des macros et calories",
    },
    team: {
      badge: "Les Créateurs",
      title: "Construit Par Des",
      titleAccent: "Passionnés.",
      subtitle: "Une équipe des étudients en Master RSI à la FST Settat et de designers qui croient que le logiciel doit être aussi performant que les résultats.",
      members: [
        { name: "LAMRISSI Bahaa-eddine", role: "Developpeur Full-Stack", github: "https://github.com/oPahae", linkedin: "https://www.linkedin.com/in/bahaa-eddine-lamrissi-81366528a/" },
        { name: "GANA Anas", role: "Developpeur Full-Stack", github: "https://github.com/anas-gn", linkedin: "https://www.linkedin.com/in/anas-gana-875378325/?locale=en" },
        { name: "TAYEF Jihane", role: "Developpeur Full-Stack", github: "https://github.com/tayef-jihane", linkedin: "https://www.linkedin.com/in/tayef-jihane-2a9a10273/" },
        { name: "ZIDANE Zaynab", role: "Developpeur Full-Stack", github: "https://github.com/zaynab-web", linkedin: "https://www.linkedin.com/in/zaynab-zidane-642055301/" },
      ],
    },
    admin: {
      badge: "Dashboard Admin",
      title: "Contrôlez.",
      titleAccent: "Tout.",
      subtitle:
        "Une plateforme d'administration puissante permettant de gérer tout l'écosystème GymFuel depuis un seul endroit.",
      feature1: "Gestion des clients et abonnements",
      feature2: "Gestion des coachs et permissions",
      feature3: "Gestion des ingrédients et base nutritionnelle",
      feature4: "Gestion des exercices et bibliothèque d'entraînement",
      visit: "Ouvrir le Dashboard",
      url: "gymfuel-admin.vercel.app"
    },
    footer: { rights: "Tous droits réservés.", tagline: "Conçu pour ceux qui ne s'arrêtent jamais." },
  },
};

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function GlowOrb({ style }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        background: "radial-gradient(circle, rgba(163,255,18,0.15) 0%, rgba(163,255,18,0.03) 60%, transparent 100%)",
        filter: "blur(60px)",
        ...style,
      }}
    />
  );
}

function Badge({ text }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
      style={{
        background: "rgba(163,255,18,0.08)",
        border: "1px solid rgba(163,255,18,0.3)",
        color: "#A3FF12",
        letterSpacing: "0.18em",
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
      {text}
    </span>
  );
}

function FeatureItem({ text }) {
  return (
    <li className="flex items-start gap-3 text-sm text-gray-400">
      <span
        className="mt-1 w-4 h-4 rounded-full flex items-center justify-center shrink-0"
        style={{ background: "rgba(163,255,18,0.12)", border: "1px solid rgba(163,255,18,0.4)" }}
      >
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M1.5 4L3.5 6L6.5 2" stroke="#A3FF12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {text}
    </li>
  );
}

function PhoneFrame({ src, alt, className = "" }) {
  return (
    <div
      className={`relative mx-auto ${className}`}
      style={{ width: 220, filter: "drop-shadow(0 0 40px rgba(163,255,18,0.18))" }}
    >
      <div
        className="rounded-[2.5rem] overflow-hidden"
        style={{
          border: "1.5px solid rgba(163,255,18,0.18)",
          background: "#0a0a0a",
          boxShadow: "0 0 60px rgba(163,255,18,0.08), inset 0 0 30px rgba(0,0,0,0.8)",
        }}
      >
        <img src={src} alt={alt} className="w-full h-auto block" style={{ minHeight: 380, objectFit: "cover" }} />
      </div>
    </div>
  );
}

function TeamCard({ member }) {
  const initials = member.name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  return (
    <div
      className="group relative rounded-2xl p-6 transition-all duration-500 cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
      }}
    >
      <img
        className="absolute aspect-square inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, rgba(163,255,18,0.06) 0%, transparent 60%)",
          border: "1px solid rgba(163,255,18,0.2)",
        }}
        src={member.image}
      />
      <div className="relative z-10 aspect-square flex justify-center items-center flex-col">
        <img
          className="w-28 h-28 rounded-2xl group flex items-center justify-center text-lg font-black mb-4 mx-auto transition-transform duration-300 group-hover:scale-110"
          style={{
            background: "linear-gradient(135deg, rgba(163,255,18,0.2), rgba(163,255,18,0.05))",
            border: "1px solid rgba(163,255,18,0.3)",
            color: "#A3FF12",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
          src={member.image}
        >
        </img>
        <h3 className="text-white group-hover:text-black font-bold text-sm text-center mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {member.name}
        </h3>
        <p className="text-gray-500 text-xs text-center mb-4">{member.role}</p>
        <div className="flex justify-center gap-3">
          {[
            {
              href: member.github, icon: (
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.3 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" /></svg>
              ), label: "GitHub"
            },
            {
              href: member.linkedin, icon: (
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.23 0z" /></svg>
              ), label: "LinkedIn"
            },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:text-black text-gray-500 hover:text-white transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState("en");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const t = translations[lang];

  const [heroRef, heroVisible] = useScrollReveal();
  const [trackRef, trackVisible] = useScrollReveal();
  const [coachRef, coachVisible] = useScrollReveal();
  const [aiRef, aiVisible] = useScrollReveal();
  const [statsRef, statsVisible] = useScrollReveal();
  const [teamRef, teamVisible] = useScrollReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    if (mobileMenuOpen) {
      const close = () => setMobileMenuOpen(false);
      window.addEventListener("scroll", close, { once: true });
      return () => window.removeEventListener("scroll", close);
    }
  }, [mobileMenuOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <Head>
        <title>GymFuel — Fuel Your Evolution</title>
        <meta name="description" content="The all-in-one fitness super-app powered by AI." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #030303; color: #fff; font-family: 'Space Grotesk', sans-serif; overflow-x: hidden; }
        .font-display { font-family: 'Syne', sans-serif; }
        ::selection { background: rgba(163,255,18,0.3); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: rgba(163,255,18,0.3); border-radius: 2px; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes reveal-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes reveal-left {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes reveal-right {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: floatSlow 8s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
        .animate-ticker { animation: ticker 30s linear infinite; }
        .animate-gradient { animation: gradient-shift 6s ease infinite; background-size: 200% 200%; }
        .reveal-up { animation: reveal-up 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
        .reveal-left { animation: reveal-left 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
        .reveal-right { animation: reveal-right 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .hidden-init { opacity: 0; }
        .glass {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .neon-border {
          border: 1px solid rgba(163,255,18,0.25);
          box-shadow: 0 0 20px rgba(163,255,18,0.08), inset 0 0 20px rgba(163,255,18,0.02);
        }
        .text-accent { color: #A3FF12; }
        .bg-accent { background-color: #A3FF12; }
        .glow-text {
          text-shadow: 0 0 40px rgba(163,255,18,0.4), 0 0 80px rgba(163,255,18,0.15);
        }
        .cursor-blink { animation: blink 1s step-end infinite; }
        .grid-bg {
          background-image:
            linear-gradient(rgba(163,255,18,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(163,255,18,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .noise-overlay {
          position: fixed; inset: 0; pointer-events: none; z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.4;
        }
        .nav-link {
          position: relative; color: rgba(255,255,255,0.6); font-size: 13px; font-weight: 500;
          transition: color 0.2s; cursor: pointer; letter-spacing: 0.02em;
        }
        .nav-link:hover { color: #fff; }
        .nav-link::after {
          content: ''; position: absolute; bottom: -4px; left: 0; right: 0; height: 1px;
          background: #A3FF12; transform: scaleX(0); transition: transform 0.2s; transform-origin: left;
        }
        .nav-link:hover::after { transform: scaleX(1); }
        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 20px 24px;
          transition: all 0.3s;
        }
        .stat-card:hover {
          background: rgba(163,255,18,0.05);
          border-color: rgba(163,255,18,0.2);
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(163,255,18,0.08);
        }
        .progress-bar {
          height: 4px; border-radius: 2px;
          background: rgba(255,255,255,0.07);
          overflow: hidden; position: relative;
        }
        .progress-fill {
          height: 100%; border-radius: 2px;
          background: linear-gradient(90deg, #A3FF12, #7ACC00);
          transition: width 1.5s cubic-bezier(0.22,1,0.36,1);
        }
        .chat-bubble-user {
          background: rgba(163,255,18,0.1);
          border: 1px solid rgba(163,255,18,0.2);
          border-radius: 18px 18px 4px 18px;
          padding: 12px 16px; font-size: 13px; color: #e0e0e0;
          max-width: 80%; align-self: flex-end;
        }
        .chat-bubble-ai {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px 18px 18px 4px;
          padding: 12px 16px; font-size: 13px; color: #c0c0c0;
          max-width: 85%; align-self: flex-start; line-height: 1.6;
        }
        .lang-toggle {
          display: flex; align-items: center; gap: 2px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 100px; padding: 3px;
        }
        .lang-btn {
          padding: 4px 12px; border-radius: 100px; font-size: 11px; font-weight: 700;
          letter-spacing: 0.08em; cursor: pointer; transition: all 0.2s;
        }
        .lang-btn.active {
          background: #A3FF12; color: #000;
        }
        .lang-btn:not(.active) { color: rgba(255,255,255,0.4); }
        .cta-primary {
          background: #A3FF12; color: #000;
          font-weight: 700; font-size: 13px;
          padding: 12px 24px; border-radius: 100px;
          display: inline-flex; align-items: center; gap-8px;
          transition: all 0.25s; cursor: pointer;
          border: none; letter-spacing: 0.02em;
          text-decoration: none;
        }
        .cta-primary:hover {
          background: #b8ff3a;
          box-shadow: 0 0 30px rgba(163,255,18,0.4);
          transform: translateY(-2px) scale(1.03);
        }
        .cta-secondary {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          color: #fff; font-weight: 600; font-size: 13px;
          padding: 12px 24px; border-radius: 100px;
          display: inline-flex; align-items: center;
          transition: all 0.25s; cursor: pointer;
          text-decoration: none;
        }
        .cta-secondary:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.25);
          transform: translateY(-2px);
        }
        .section-divider {
          width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(163,255,18,0.15), transparent);
        }

        /* ─── MOBILE MENU ─── */
        .mobile-menu {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 45;
          padding: 80px 24px 32px;
          background: rgba(3,3,3,0.97);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          animation: slideDown 0.25s ease forwards;
        }
        .mobile-menu-link {
          display: block;
          width: 100%;
          text-align: left;
          padding: 14px 0;
          font-size: 18px;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          cursor: pointer;
          transition: color 0.2s;
          background: none;
          border-left: none;
          border-right: none;
          border-top: none;
          font-family: 'Syne', sans-serif;
        }
        .mobile-menu-link:last-child { border-bottom: none; }
        .mobile-menu-link:hover { color: #A3FF12; }
        .hamburger-btn {
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          cursor: pointer;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 8px;
        }
        .hamburger-btn span {
          display: block;
          height: 1.5px;
          background: #fff;
          border-radius: 2px;
          transition: all 0.25s;
          transform-origin: center;
        }
        .hamburger-btn.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger-btn.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger-btn.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ─── RESPONSIVE OVERRIDES ─── */

        /* Hero: on mobile show only 2 phone screenshots instead of 4 */
        @media (max-width: 768px) {
          .hero-title { font-size: clamp(2.4rem, 10vw, 4.5rem) !important; }

          /* Hero phone row: show 2 images, hide the last 2 */
          .hero-phones { gap: 12px !important; justify-content: center; }
          .hero-phones img:nth-child(3),
          .hero-phones img:nth-child(4) { display: none; }
          .hero-phones img { max-width: 42vw !important; }

          /* CTA buttons: 2 per row */
          .hero-ctas { gap: 10px !important; }
          .hero-ctas a { font-size: 12px !important; padding: 10px 16px !important; flex: 1 1 calc(50% - 5px); justify-content: center; }

          /* Stats: smaller */
          .hero-stats { gap: 20px !important; }
          .hero-stats .font-display { font-size: 1.6rem !important; }

          /* Section padding */
          section { padding-top: 64px !important; padding-bottom: 64px !important; }

          /* Feature sections: stack vertically */
          .feature-grid { grid-template-columns: 1fr !important; gap: 40px !important; }

          /* Image visuals: smaller */
          .section-image { max-width: 75vw !important; }

          /* Coaching dual phones: simplify positioning */
          .coaching-phones { position: relative !important; display: flex !important; justify-content: center !important; min-height: 280px; }
          .coaching-phone-1 { transform: none !important; position: relative !important; z-index: 1; max-width: 44vw !important; }
          .coaching-phone-2 { position: absolute !important; right: 0 !important; bottom: -20px !important; z-index: 2; max-width: 44vw !important; }

          /* Stat cards: 3 in a row but smaller padding */
          .tracking-cards { gap: 8px !important; }
          .tracking-cards .stat-card { padding: 12px 10px !important; }
          .tracking-cards .stat-card .font-display { font-size: 1.1rem !important; }
          .tracking-cards .stat-card .text-xs { font-size: 10px !important; }

          /* Stats section metric grid: 2 cols */
          .stats-metrics { grid-template-columns: 1fr 1fr !important; }

          /* Team: 2 columns */
          .team-grid { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }

          /* Footer: center everything */
          .footer-inner { flex-direction: column !important; align-items: center !important; gap: 16px !important; text-align: center; }
          .footer-links { justify-content: center !important; }

          /* Hide glow orbs on mobile for perf */
          .mobile-hide-orb { display: none !important; }

          /* Ticker: smaller text */
          .ticker-bar span { font-size: 10px !important; margin: 0 16px !important; }

          /* AI section: full width chat bubble */
          .ai-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }

        @media (max-width: 480px) {
          /* Extra small: 1-col team */
          .team-grid { grid-template-columns: 1fr !important; }

          /* CTA: stack */
          .hero-ctas a { flex: 1 1 100%; }

          /* Hide 2nd phone in hero too */
          .hero-phones img:nth-child(2) { display: none; }
          .hero-phones img { max-width: 70vw !important; }

          /* Tracking cards 1 col */
          .tracking-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="noise-overlay" />

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(3,3,3,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.png" className="w-8 h-8" />
            <span className="font-bold text-white text-base font-display -translate-x-1">ymFuel</span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {Object.entries(t.nav).map(([key, label]) => (
              <button key={key} className="nav-link" onClick={() => scrollTo(key)}>
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="lang-toggle">
              <button className={`lang-btn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>EN</button>
              <button className={`lang-btn ${lang === "fr" ? "active" : ""}`} onClick={() => setLang("fr")}>FR</button>
            </div>

            {/* Hamburger — mobile only */}
            <button
              className={`flex md:hidden hamburger-btn ${mobileMenuOpen ? "open" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="mobile-menu md:hidden">
          {Object.entries(t.nav).map(([key, label]) => (
            <button key={key} className="mobile-menu-link" onClick={() => scrollTo(key)}>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* TICKER */}
      <div className="fixed top-0 left-0 right-0 z-40 overflow-hidden" style={{ height: 2 }}>
        <div className="h-full" style={{ background: "linear-gradient(90deg, transparent, #A3FF12, transparent)" }} />
      </div>

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg"
        ref={heroRef}
      >
        <GlowOrb style={{ width: 600, height: 600, top: "10%", left: "50%", transform: "translateX(-50%)" }} />
        <GlowOrb style={{ width: 300, height: 300, top: "60%", left: "10%", opacity: 0.5 }} />
        <GlowOrb style={{ width: 250, height: 250, top: "30%", right: "5%", opacity: 0.4 }} />

        <div
          className="absolute top-1/4 left-1/4 w-px h-32 opacity-20"
          style={{ background: "linear-gradient(180deg, transparent, #A3FF12, transparent)" }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-px h-24 opacity-15"
          style={{ background: "linear-gradient(180deg, transparent, #A3FF12, transparent)" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-16 text-center">
          <div className={`${heroVisible ? "reveal-up" : "hidden-init"}`}>
            <Badge text={t.hero.badge} />
          </div>

          <h1
            className={`hero-title font-display font-black leading-none mb-6 ${heroVisible ? "reveal-up delay-100" : "hidden-init"}`}
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.03em" }}
          >
            {t.hero.title}{" "}
            <span className="text-accent glow-text">{t.hero.titleAccent}</span>
            <span className="text-accent cursor-blink">_</span>
          </h1>

          <p
            className={`text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed ${heroVisible ? "reveal-up delay-200" : "hidden-init"}`}
          >
            {t.hero.subtitle}
          </p>

          <div
            className={`hero-ctas flex flex-wrap gap-3 justify-center mb-16 ${heroVisible ? "reveal-up delay-300" : "hidden-init"}`}
          >
            <a
              href="/ios.apk"
              download
              className="cta-primary gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.39.07 2.35.74 3.15.8 1.22-.26 2.33-.95 3.61-.84 1.54.13 2.7.73 3.46 1.88-3.2 1.97-2.66 6.37.78 7.54-.46 1.17-1 2.31-3 3.5z" />
              </svg>
              {t.hero.cta2}
            </a>
            
            <a
              href="/android.apk"
              download
              className="cta-primary gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10z" />
              </svg>
              {t.hero.cta1}
            </a>
            <a href="https://github.com/oPahae/GymApp" target="_blank" rel="noopener noreferrer" className="cta-secondary gap-2">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.3 3.5 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" /></svg>
              {t.hero.cta3}
            </a>
            <a href="https://gymfuel-admin.vercel.app" className="cta-secondary gap-2">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              {t.hero.cta4}
            </a>
          </div>

          <div
            className={`hero-stats flex flex-wrap gap-8 justify-center ${heroVisible ? "reveal-up delay-400" : "hidden-init"}`}
          >
            {[
              { value: "48K+", label: t.hero.stat1 },
              { value: "12M+", label: t.hero.stat2 },
              { value: "1.2K+", label: t.hero.stat3 },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display font-black text-3xl text-accent glow-text">{s.value}</div>
                <div className="text-gray-500 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div
            className={`mt-16 relative mx-auto ${heroVisible ? "reveal-up delay-500" : "hidden-init"}`}
          >
            <div className="animate-float hero-phones flex justify-around">
              <img className="max-w-65" style={{ filter: "drop-shadow(0 0 40px rgba(163,255,18,0.18))" }} src="/welcome.png" alt="GymFuel Welcome" />
              <img className="max-w-65" style={{ filter: "drop-shadow(0 0 40px rgba(163,255,18,0.18))" }} src="/login.png" alt="GymFuel Login" />
              <img className="max-w-65" style={{ filter: "drop-shadow(0 0 40px rgba(163,255,18,0.18))" }} src="/tutorial.png" alt="Exercice Tutorial" />
              <img className="max-w-65" style={{ filter: "drop-shadow(0 0 40px rgba(163,255,18,0.18))" }} src="/profile.png" alt="User Profile" />
            </div>
            <div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full animate-pulse-glow"
              style={{
                width: 160, height: 30,
                background: "radial-gradient(ellipse, rgba(163,255,18,0.25), transparent)",
                filter: "blur(10px)",
              }}
            />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce">
          <div className="text-xs text-gray-500 uppercase tracking-widest">Scroll</div>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#A3FF12" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </div>
      </section>

      {/* TICKER BAR */}
      <div className="ticker-bar overflow-hidden py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(163,255,18,0.02)" }}>
        <div className="flex animate-ticker whitespace-nowrap">
          {Array(2).fill(["CALORIE TRACKING", "AI COACHING", "VOICE CALLS", "RECIPE CREATOR", "GYM LIBRARY", "PROGRESS ANALYTICS", "SMART GOALS", "REAL-TIME CHAT"]).flat().map((item, i) => (
            <span key={i} className="text-xs font-bold tracking-widest text-gray-600 mx-8">
              <span className="text-accent mr-8">✦</span>{item}
            </span>
          ))}
        </div>
      </div>

      {/* TRACKING SECTION */}
      <section id="features" className="relative py-32 overflow-hidden" ref={trackRef}>
        <GlowOrb style={{ width: 500, height: 500, top: "20%", right: "-10%", opacity: 0.6 }} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="feature-grid grid lg:grid-cols-2 gap-16 items-center">
            <div className={trackVisible ? "reveal-left" : "hidden-init"}>
              <Badge text={t.tracking.badge} />
              <h2 className="font-display font-black leading-none mb-6" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}>
                {t.tracking.title}<br />
                <span className="text-accent">{t.tracking.titleAccent}</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">{t.tracking.subtitle}</p>
              <ul className="space-y-4 mb-10">
                {[t.tracking.feature1, t.tracking.feature2, t.tracking.feature3].map((f, i) => (
                  <FeatureItem key={i} text={f} />
                ))}
              </ul>
              <div className="tracking-cards grid grid-cols-3 gap-4">
                {[
                  { ...t.tracking.card1, pct: 90 },
                  { ...t.tracking.card2, pct: 89 },
                  { ...t.tracking.card3, pct: 100 },
                ].map((card) => (
                  <div key={card.label} className="stat-card">
                    <div className="text-xl font-black text-white font-display">{card.value}</div>
                    <div className="text-xs text-gray-500 mt-1 mb-3">{card.sub}</div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: trackVisible ? `${card.pct}%` : "0%" }} />
                    </div>
                    <div className="text-xs text-gray-600 mt-2">{card.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`flex justify-center ${trackVisible ? "reveal-right delay-200" : "hidden-init"}`}>
              <div className="animate-float-slow">
                <img src="/home.png" alt="Home Screen" className="section-image max-w- md:max-w-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* COACHING SECTION */}
      <section id="coaching" className="relative py-32 overflow-hidden" ref={coachRef}>
        <GlowOrb style={{ width: 400, height: 400, top: "30%", left: "-8%", opacity: 0.5 }} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="feature-grid grid lg:grid-cols-2 gap-16 items-center">
            <div className={`flex justify-center order-2 lg:order-1 ${coachVisible ? "reveal-left" : "hidden-init"}`}>
              <div className="coaching-phones relative">
                <div className="coaching-phone-1 -translate-x-80 md:-translate-x-28 animate-float">
                  <img src="/chat.png" alt="Chat Screen" className="max-w-2xl" />
                </div>
                <div
                  className="coaching-phone-2 absolute -bottom-12 -right-22 -translate-x-44 md:translate-x-0 animate-float-slow"
                  style={{ zIndex: 10, animationDelay: "1s" }}
                >
                  <img src="/voice.png" alt="Voice Screen" className="max-w-2xl" />
                </div>
              </div>
            </div>
            <div className={`order-1 lg:order-2 ${coachVisible ? "reveal-right delay-200" : "hidden-init"}`}>
              <Badge text={t.coaching.badge} />
              <h2 className="font-display font-black leading-none mb-6" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}>
                {t.coaching.title}<br />
                <span className="text-accent">{t.coaching.titleAccent}</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">{t.coaching.subtitle}</p>
              <ul className="space-y-4">
                {[t.coaching.feature1, t.coaching.feature2, t.coaching.feature3].map((f, i) => (
                  <FeatureItem key={i} text={f} />
                ))}
              </ul>
              <div className="mt-10 flex gap-4">
                {[
                  { icon: Phone, label: "Real-time Chat", sub: "Socket.IO powered" },
                  { icon: MessageCircle, label: "Voice Calls", sub: "WebRTC powered" },
                ].map((chip) => (
                  <div
                    key={chip.label}
                    className="flex-1 rounded-2xl p-4 transition-all duration-300 hover:scale-105"
                    style={{ background: "rgba(163,255,18,0.04)", border: "1px solid rgba(163,255,18,0.12)" }}
                  >
                    <chip.icon className="text-2xl mb-2"></chip.icon>
                    <div className="text-white font-bold text-sm">{chip.label}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{chip.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* AI SECTION */}
      <section id="ai" className="relative py-32 overflow-hidden" ref={aiRef}>
        <GlowOrb style={{ width: 600, height: 600, top: "10%", left: "50%", transform: "translateX(-50%)", opacity: 0.5 }} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className={aiVisible ? "reveal-up" : "hidden-init"}>
              <Badge text={t.ai.badge} />
            </div>
            <h2
              className={`font-display font-black leading-none mb-6 ${aiVisible ? "reveal-up delay-100" : "hidden-init"}`}
              style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}
            >
              {t.ai.title}<br />
              <span className="text-accent glow-text">{t.ai.titleAccent}</span>
            </h2>
            <p className={`text-gray-400 text-lg max-w-2xl mx-auto ${aiVisible ? "reveal-up delay-200" : "hidden-init"}`}>
              {t.ai.subtitle}
            </p>
          </div>
          <div className="ai-grid grid lg:grid-cols-2 gap-16 items-center">
            <div className={aiVisible ? "reveal-left delay-300" : "hidden-init"}>
              <ul className="space-y-4 mb-10">
                {[t.ai.feature1, t.ai.feature2, t.ai.feature3].map((f, i) => (
                  <FeatureItem key={i} text={f} />
                ))}
              </ul>
              <div
                className="rounded-2xl p-6"
                style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black"
                    style={{ background: "rgba(163,255,18,0.15)", border: "1px solid rgba(163,255,18,0.3)", color: "#A3FF12" }}
                  >
                    AI
                  </div>
                  <span className="text-white font-bold text-sm">GymFuel AI Assistant</span>
                  <span
                    className="ml-auto text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(163,255,18,0.1)", color: "#A3FF12", border: "1px solid rgba(163,255,18,0.2)" }}
                  >
                    Online
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="chat-bubble-user">{t.ai.chat1}</div>
                  <div className="chat-bubble-ai">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span className="text-xs text-gray-500">GymFuel AI</span>
                    </div>
                    {t.ai.chat2}
                  </div>
                </div>
              </div>
            </div>
            <div className={`flex justify-center ${aiVisible ? "reveal-right delay-200" : "hidden-init"}`}>
              <div className="animate-float" style={{ filter: "drop-shadow(0 0 40px rgba(163,255,18,0.18))" }}>
                <img src="/ai.png" alt="AI Screen" className="section-image max-w-4xl md:max-w-xs" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* STATS SECTION */}
      <section id="stats" className="relative py-32 overflow-hidden" ref={statsRef}>
        <GlowOrb style={{ width: 400, height: 400, bottom: "10%", right: "5%", opacity: 0.5 }} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="feature-grid grid lg:grid-cols-2 gap-16 items-center">
            <div className={statsVisible ? "reveal-left" : "hidden-init"}>
              <Badge text={t.stats.badge} />
              <h2 className="font-display font-black leading-none mb-6" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}>
                {t.stats.title}<br />
                <span className="text-accent">{t.stats.titleAccent}</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">{t.stats.subtitle}</p>
              <ul className="space-y-4">
                {[t.stats.feature1, t.stats.feature2, t.stats.feature3].map((f, i) => (
                  <FeatureItem key={i} text={f} />
                ))}
              </ul>
              <div className="stats-metrics mt-10 grid grid-cols-2 gap-4">
                {[
                  { label: "Avg. Weekly Loss", value: "-0.6 kg", color: "#A3FF12" },
                  { label: "Consistency", value: "94%", color: "#A3FF12" },
                  { label: "Days Streak", value: "38", color: "#fff" },
                  { label: "Goal Progress", value: "72%", color: "#fff" },
                ].map((m) => (
                  <div key={m.label} className="stat-card">
                    <div className="font-display font-black text-2xl" style={{ color: m.color }}>{m.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`flex justify-center ${statsVisible ? "reveal-right delay-200" : "hidden-init"}`}>
              <div className="animate-float-slow">
                <img src="/stats.png" alt="Stats Screen" className="section-image max-w-xl rounded-4xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ADMIN SECTION */}
      <section
        id="admin"
        className="relative py-32 overflow-hidden"
      >
        <GlowOrb
          style={{
            width: 500,
            height: 500,
            right: "-5%",
            top: "20%",
            opacity: 0.5,
          }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge text={t.admin.badge} />
            <h2
              className="font-display font-black leading-none mb-6"
              style={{
                fontSize: "clamp(2.2rem,6vw,5rem)",
                letterSpacing: "-0.03em"
              }}
            >
              {t.admin.title}
              <br />
              <span className="text-accent">
                {t.admin.titleAccent}
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              {t.admin.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT */}
            <div>
              <div className="glass rounded-3xl p-6 mb-8">
                <div className="text-xs text-gray-500 mb-2 uppercase tracking-widest">
                  Dashboard URL
                </div>
                <a
                  href="https://gymfuel-admin.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent text-xl font-bold break-all hover:opacity-80 transition"
                >
                  gymfuel-admin.vercel.app
                </a>
              </div>
              <ul className="space-y-5">
                <FeatureItem text={t.admin.feature1} />
                <FeatureItem text={t.admin.feature2} />
                <FeatureItem text={t.admin.feature3} />
                <FeatureItem text={t.admin.feature4} />
              </ul>
              <a
                href="https://gymfuel-admin.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary mt-10 inline-flex"
              >
                {t.admin.visit}
              </a>
            </div>

            {/* RIGHT */}
            <div className="grid">
              <img src="/admin-1.png" alt="Admin Clients" className="w-full h-full object-cover" />
              <img src="/admin-2.png" alt="Admin Exercises" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* TEAM SECTION */}
      <section id="team" className="relative py-32 overflow-hidden" ref={teamRef}>
        <GlowOrb style={{ width: 500, height: 500, top: "30%", left: "50%", transform: "translateX(-50%)", opacity: 0.4 }} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className={teamVisible ? "reveal-up" : "hidden-init"}>
              <Badge text={t.team.badge} />
            </div>
            <h2
              className={`font-display font-black leading-none mb-6 ${teamVisible ? "reveal-up delay-100" : "hidden-init"}`}
              style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}
            >
              {t.team.title}<br />
              <span className="text-accent">{t.team.titleAccent}</span>
            </h2>
            <p className={`text-gray-400 text-lg max-w-xl mx-auto ${teamVisible ? "reveal-up delay-200" : "hidden-init"}`}>
              {t.team.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.team.members.map((member, i) => (
              <div key={member.name} className={teamVisible ? `reveal-up delay-${(i + 2) * 100}` : "hidden-init"}>
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="relative py-16 overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="footer-inner flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-black text-sm" style={{ background: "#A3FF12" }}>G</div>
              <div>
                <div className="font-bold text-white font-display">GymFuel</div>
                <div className="text-gray-600 text-xs">{t.footer.tagline}</div>
              </div>
            </div>
            <div className="text-gray-600 text-sm">
              © {new Date().getFullYear()} GymFuel. {t.footer.rights}
            </div>
            <div className="footer-links flex gap-4">
              {[
                { label: t.nav.features, id: "features" },
                { label: t.nav.coaching, id: "coaching" },
                { label: t.nav.team, id: "team" },
              ].map((link) => (
                <button
                  key={link.id}
                  className="text-gray-500 hover:text-white text-sm transition-colors duration-200"
                  onClick={() => scrollTo(link.id)}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-12 text-center">
            <div
              className="inline-block font-display font-black text-6xl md:text-8xl opacity-5 select-none"
              style={{ letterSpacing: "-0.05em" }}
            >
              GYMFUEL
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
