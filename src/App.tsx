import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  MapPin,
  Phone,
  ChevronUp,
  Terminal,
  Cpu,
  Brain,
  Database,
  Code2,
  Layers,
  Zap,
  Award,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Sparkles,
  Activity,
  GitBranch,
  Container,
  Cloud,
  MessageSquare,
  BookOpen,
  Target
} from 'lucide-react';

// ============ NEURAL NETWORK BACKGROUND ============
const NeuralNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<{ x: number; y: number; vx: number; vy: number; radius: number }[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    const initNodes = () => {
      const nodeCount = Math.floor((canvas.width * canvas.height) / 15000);
      nodesRef.current = [];
      for (let i = 0; i < nodeCount; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1
        });
      }
    };

    const draw = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(10, 15, 26, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nodesRef.current.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.5)';
        ctx.fill();

        nodesRef.current.slice(i + 1).forEach(other => {
          const dist = Math.hypot(node.x - other.x, node.y - other.y);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 - dist / 1000})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });

        const mouseDist = Math.hypot(node.x - mouseRef.current.x, node.y - mouseRef.current.y);
        if (mouseDist < 200) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `rgba(20, 184, 166, ${0.3 - mouseDist / 700})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();

    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: 0.4 }}
      onMouseMove={(e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; }}
    />
  );
};

// ============ ANIMATED CODE TERMINAL ============
const CodeTerminal = () => {
  const [lines, setLines] = useState<string[]>([]);
  const fullCode = [
    '>>> import ai_engineer',
    '>>> from ml import pipelines, explainability',
    '>>> from nlp import transformers, agents',
    '',
    '>>> profile = ai_engineer.load("eklakh_dewan")',
    '>>> profile.skills',
    '["Python", "NLP", "ML Engineering", "FastAPI"]',
    '',
    '>>> profile.experience',
    '["AI/ML Intern @ Flowrage", "6+ Projects"]',
    '',
    '>>> profile.status',
    '"Available for opportunities"',
    '',
    '>>> profile.predict_future()',
    '"Senior AI Engineer by 2027"'
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullCode.length) {
        setLines(prev => [...prev, fullCode[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="code-block w-full max-w-lg">
      <div className="code-header">
        <div className="code-dot code-dot-red" />
        <div className="code-dot code-dot-yellow" />
        <div className="code-dot code-dot-green" />
        <span className="ml-4 text-xs text-[var(--text-muted)] font-mono">terminal</span>
      </div>
      <div className="p-4 font-mono text-sm space-y-1 min-h-[280px]">
        {lines.map((line, i) => (
          <div key={i} className={`animate-fade-in ${line.startsWith('>>>') ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)]'}`}>
            {line || '\u00A0'}
          </div>
        ))}
        <span className="inline-block w-2 h-4 bg-[var(--accent-primary)] animate-pulse ml-1" />
      </div>
    </div>
  );
};

// ============ SKILL BAR COMPONENT ============
const SkillBar = ({ skill, percentage, delay = 0 }: { skill: string; percentage: number; delay?: number }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(percentage), delay * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [percentage, delay]);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-[var(--text-primary)] font-medium">{skill}</span>
        <span className="text-[var(--accent-primary)] font-mono">{percentage}%</span>
      </div>
      <div className="skill-bar">
        <div className="skill-bar-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
};

// ============ PROJECT CARD ============
const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="glass card-hover rounded-xl overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="h-48 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-elevated)] relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-7xl font-bold text-[var(--border-color)] group-hover:text-[var(--accent-primary)] transition-colors duration-500">
            0{index + 1}
          </span>
        </div>
        <div className="absolute top-4 left-4">
          <span className="tag">{project.category}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded bg-[var(--bg-secondary)] text-[var(--text-muted)] font-mono">
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <a
            href="https://github.com/Eklakh-Dewan"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
          >
            <Github size={16} /> Code
          </a>
          <button className="flex items-center gap-2 text-sm text-[var(--accent-primary)] hover:underline">
            <ExternalLink size={16} /> Details
          </button>
        </div>
      </div>
    </div>
  );
};

// ============ TIMELINE ITEM ============
const TimelineItem = ({ item, isLast }: { item: typeof timeline[0]; isLast: boolean }) => (
  <div className="relative pl-8 pb-8">
    <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[var(--accent-primary)] to-transparent" />
    <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-[var(--accent-primary)] timeline-dot" style={{ transform: 'translateX(-50%)' }} />

    <div className="glass rounded-lg p-5 ml-4 card-hover">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="text-xs px-2 py-1 rounded bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-mono uppercase">
          {item.type}
        </span>
        <span className="text-xs text-[var(--text-muted)]">{item.date}</span>
      </div>
      <h4 className="font-semibold text-[var(--text-primary)]">{item.title}</h4>
      <p className="text-sm text-[var(--text-secondary)] mt-1">{item.org}</p>
      {item.description && (
        <p className="text-sm text-[var(--text-muted)] mt-2">{item.description}</p>
      )}
    </div>
  </div>
);

// ============ STAT CARD ============
const StatCard = ({ icon: Icon, value, label, suffix = '' }: { icon: React.ElementType; value: string; label: string; suffix?: string }) => (
  <div className="glass-accent rounded-xl p-6 text-center card-hover">
    <div className="flex justify-center mb-3">
      <Icon className="w-8 h-8 text-[var(--accent-primary)]" />
    </div>
    <div className="stat-number">
      {value}<span className="text-2xl">{suffix}</span>
    </div>
    <div className="text-sm text-[var(--text-muted)] mt-1">{label}</div>
  </div>
);

// ============ NAVIGATION ============
const Navigation = ({ activeSection }: { activeSection: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Projects', 'Experience', 'Contact'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)] group-hover:scale-150 transition-transform" />
          <span className="font-mono text-sm text-[var(--text-primary)]">eklakh.dewan</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`text-sm font-medium transition-colors ${activeSection === item.toLowerCase() ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
            >
              {item}
            </a>
          ))}
          <a
            href="https://drive.google.com/file/d/1AnkPW0jqdqRUwSJReCvHOcT-m_KYwCdm/view?usp=sharing"
            target="_blank"
            rel="noopener"
            className="btn-primary text-sm flex items-center gap-2"
          >
            <Download size={16} /> Resume
          </a>
        </div>

        <button
          className="md:hidden text-[var(--text-primary)]"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d={isMobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {isMobileOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-lg p-4 animate-scale-in">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block py-3 text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
              onClick={() => setIsMobileOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="https://drive.google.com/file/d/1AnkPW0jqdqRUwSJReCvHOcT-m_KYwCdm/view?usp=sharing"
            target="_blank"
            rel="noopener"
            className="btn-primary w-full mt-4 text-center flex items-center justify-center gap-2"
          >
            <Download size={16} /> Resume
          </a>
        </div>
      )}
    </nav>
  );
};

// ============ DATA ============
const skills = {
  languages: [
    { name: 'Python', level: 95 },
    { name: 'SQL', level: 80 },
    { name: 'JavaScript', level: 72 },
    { name: 'Java', level: 70 },
  ],
  aiml: [
    { name: 'NLP / Transformers', level: 88 },
    { name: 'Scikit-learn', level: 90 },
    { name: 'TensorFlow / Keras', level: 78 },
    { name: 'LangChain / Agents', level: 80 },
    { name: 'SHAP / Explainability', level: 82 },
  ],
  engineering: [
    { name: 'FastAPI / REST', level: 85 },
    { name: 'Docker / Git', level: 80 },
    { name: 'React / Node.js', level: 70 },
    { name: 'AWS Fundamentals', level: 72 },
  ]
};

const projects = [
  {
    title: 'AI Agent Workflow Automation Platform',
    category: 'Artificial Intelligence',
    description: 'LLM-powered agentic platform for multi-step task execution with YAML-driven configuration. Orchestrates complex workflows using LangChain, FastAPI, and Docker.',
    tech: ['Python', 'LangChain', 'FastAPI', 'Docker', 'YAML']
  },
  {
    title: 'AI Career Path Recommendation System',
    category: 'Machine Learning',
    description: 'Explainable recommendation engine with SHAP attribution. Serves real-time predictions through FastAPI with feature engineering and ranking logic.',
    tech: ['Python', 'Scikit-learn', 'SHAP', 'FastAPI', 'Streamlit']
  },
  {
    title: 'Job Recommendation & Resume Matching',
    category: 'NLP',
    description: 'Resume-to-job semantic matching using BERT embeddings and TF-IDF. Includes skills gap-analysis module for learning path recommendations.',
    tech: ['Python', 'BERT', 'NLP', 'TF-IDF', 'Streamlit']
  },
  {
    title: 'Multilingual AI Chatbot',
    category: 'NLP',
    description: 'Intent classification and entity recognition pipeline supporting 3+ languages with transformer models and REST API deployment.',
    tech: ['Python', 'Transformers', 'Hugging Face', 'Docker']
  },
  {
    title: 'Career Path Recommender',
    category: 'Data Science',
    description: 'Job-market analysis aggregating signals from multiple portals. Interactive Tableau dashboards for skill trajectory visualization.',
    tech: ['Python', 'Web Scraping', 'Tableau', 'Plotly']
  },
  {
    title: 'Churn Prediction & Explainability',
    category: 'Machine Learning',
    description: 'XGBoost-based churn prediction with SHAP attribution for business-facing retention planning and cross-validation metrics.',
    tech: ['Python', 'XGBoost', 'SHAP', 'Feature Engineering']
  }
];

const timeline = [
  {
    type: 'Education',
    title: 'B.Tech — AI & Data Science',
    org: 'KPR Institute of Engineering and Technology',
    date: 'Sep 2023 – Sep 2027',
    description: 'CGPA 8.41/10. Coursework in ML, NLP, Computer Vision, Generative AI.'
  },
  {
    type: 'Certification',
    title: 'NPTEL Elite — NLP & Business Intelligence',
    org: 'IIT Madras',
    date: 'Jan–Apr 2026',
    description: 'Dual Elite certification with distinction.'
  },
  {
    type: 'Achievement',
    title: 'HackVega 2.0 — National Hackathon',
    org: 'HirePro × MyCareernet',
    date: 'June 2026',
    description: 'Represented KPRIET in national-level hackathon.'
  },
  {
    type: 'Experience',
    title: 'AI/ML Engineering Intern',
    org: 'Flowrage Technology',
    date: 'Jan 2025 – Feb 2025',
    description: 'Deployed 3 ML prototypes. Reduced latency 20%, improved accuracy 12%.'
  },
  {
    type: 'Certification',
    title: 'AWS Certified Cloud Practitioner',
    org: 'Amazon Web Services',
    date: '2025',
    description: 'Cloud architecture, EC2, S3, IAM fundamentals.'
  }
];

const certifications = [
  { name: 'NPTEL Elite — NLP', org: 'IIT Madras', icon: Brain },
  { name: 'NPTEL Elite — Business Intelligence', org: 'IIT Madras', icon: Database },
  { name: 'AWS Cloud Practitioner', org: 'Amazon Web Services', icon: Cloud },
  { name: 'Deep Learning Specialization', org: 'deeplearning.ai', icon: Layers },
  { name: 'Google Data Analytics', org: 'Google / Coursera', icon: Activity },
  { name: 'ML Specialization', org: 'Stanford / Coursera', icon: Zap },
];

// ============ MAIN APP ============
function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      const sections = ['home', 'about', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] relative">
      <NeuralNetwork />
      <Navigation activeSection={activeSection} />

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-up">
            <div className="flex items-center gap-2">
              <div className="status-dot" />
              <span className="text-sm font-mono text-[var(--success)]">OPEN TO OPPORTUNITIES</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-[var(--text-primary)]">Eklakh</span>
              <span className="gradient-text-animated"> Dewan</span>
            </h1>

            <div className="flex flex-wrap gap-3 text-lg md:text-xl font-medium text-[var(--text-secondary)]">
              <span className="flex items-center gap-2"><Brain className="w-5 h-5 text-[var(--accent-primary)]" /> AI Engineer</span>
              <span className="text-[var(--text-muted)]">|</span>
              <span className="flex items-center gap-2"><Cpu className="w-5 h-5 text-[var(--accent-secondary)]" /> ML Developer</span>
              <span className="text-[var(--text-muted)]">|</span>
              <span className="flex items-center gap-2"><Code2 className="w-5 h-5 text-[var(--accent-tertiary)]" /> Full Stack</span>
            </div>

            <p className="text-lg text-[var(--text-secondary)] max-w-xl">
              Building intelligent applications with <span className="text-[var(--accent-primary)] font-medium">AI</span>, <span className="text-[var(--accent-primary)] font-medium">ML</span>, and <span className="text-[var(--accent-primary)] font-medium">NLP</span> — from model to production. Specialized in explainable ML, agentic LLM workflows, and end-to-end deployment.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="tag">Python</span>
              <span className="tag">NLP</span>
              <span className="tag">FastAPI</span>
              <span className="tag">LangChain</span>
              <span className="tag">SHAP</span>
              <span className="tag">Docker</span>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="#projects" className="btn-primary flex items-center gap-2">
                View Projects <ArrowRight size={18} />
              </a>
              <a
                href="https://drive.google.com/file/d/1AnkPW0jqdqRUwSJReCvHOcT-m_KYwCdm/view?usp=sharing"
                target="_blank"
                rel="noopener"
                className="btn-secondary flex items-center gap-2"
              >
                <Download size={18} /> Resume
              </a>
              <a href="https://github.com/Eklakh-Dewan" target="_blank" rel="noopener" className="p-3 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/eklakh-dewan" target="_blank" rel="noopener" className="p-3 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="hidden lg:block animate-slide-up" style={{ animationDelay: '200ms' }}>
            <CodeTerminal />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Sparkles} value="6" suffix="+" label="Projects" />
          <StatCard icon={Award} value="6" label="Certifications" />
          <StatCard icon={Briefcase} value="1" label="Internship" />
          <StatCard icon={Zap} value="20" suffix="%" label="Latency Optimized" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 section-reveal">
            <span className="font-mono text-sm text-[var(--accent-primary)]">// ABOUT</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-[var(--text-primary)]">
              Building ML Systems that Ship
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto">
              B.Tech AI & Data Science student at KPRIET with production ML experience. I build end-to-end intelligent systems — not just notebooks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Languages */}
            <div className="glass rounded-xl p-6 section-reveal">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-[var(--accent-primary)]/10">
                  <Terminal className="w-6 h-6 text-[var(--accent-primary)]" />
                </div>
                <h3 className="text-lg font-semibold">Languages</h3>
              </div>
              <div className="space-y-4">
                {skills.languages.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill.name} percentage={skill.level} delay={i} />
                ))}
              </div>
            </div>

            {/* AI/ML */}
            <div className="glass rounded-xl p-6 section-reveal" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-[var(--accent-primary)]/10">
                  <Brain className="w-6 h-6 text-[var(--accent-primary)]" />
                </div>
                <h3 className="text-lg font-semibold">AI / ML</h3>
              </div>
              <div className="space-y-4">
                {skills.aiml.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill.name} percentage={skill.level} delay={i} />
                ))}
              </div>
            </div>

            {/* Engineering */}
            <div className="glass rounded-xl p-6 section-reveal" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-[var(--accent-primary)]/10">
                  <Container className="w-6 h-6 text-[var(--accent-primary)]" />
                </div>
                <h3 className="text-lg font-semibold">Engineering</h3>
              </div>
              <div className="space-y-4">
                {skills.engineering.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill.name} percentage={skill.level} delay={i} />
                ))}
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-16 section-reveal">
            <h3 className="text-xl font-semibold mb-6 text-center">
              <Award className="inline w-6 h-6 mr-2 text-[var(--accent-primary)]" />
              Certifications & Credentials
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {certifications.map((cert, i) => (
                <div key={i} className="glass-accent rounded-lg p-4 text-center card-hover">
                  <cert.icon className="w-8 h-8 mx-auto text-[var(--accent-primary)] mb-3" />
                  <div className="text-sm font-medium text-[var(--text-primary)]">{cert.name}</div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">{cert.org}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-20 px-6 bg-[var(--bg-secondary)]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 section-reveal">
            <span className="font-mono text-sm text-[var(--accent-primary)]">// PROJECTS</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-[var(--text-primary)]">
              Featured Work
            </h2>
            <p className="mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto">
              Six shipped projects spanning agentic systems, explainable ML, and multilingual NLP.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 section-reveal">
            <span className="font-mono text-sm text-[var(--accent-primary)]">// JOURNEY</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-[var(--text-primary)]">
              Career Timeline
            </h2>
          </div>

          <div className="space-y-0 section-reveal">
            {timeline.map((item, i) => (
              <TimelineItem key={i} item={item} isLast={i === timeline.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6 bg-[var(--bg-secondary)]/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 section-reveal">
            <span className="font-mono text-sm text-[var(--accent-primary)]">// CONNECT</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 text-[var(--text-primary)]">
              Let's Build Something That Ships
            </h2>
            <p className="mt-4 text-[var(--text-secondary)]">
              Open to AI/ML internships, research collaborations, and engineering roles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 section-reveal">
            {/* Contact Info */}
            <div className="space-y-6">
              <a href="mailto:eklakh.inplace@gmail.com" className="flex items-center gap-4 glass rounded-lg p-4 card-hover group">
                <Mail className="w-6 h-6 text-[var(--accent-primary)] group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-sm text-[var(--text-muted)]">Email</div>
                  <div className="text-[var(--text-primary)]">eklakh.inplace@gmail.com</div>
                </div>
              </a>

              <a href="tel:+918092158233" className="flex items-center gap-4 glass rounded-lg p-4 card-hover group">
                <Phone className="w-6 h-6 text-[var(--accent-primary)] group-hover:scale-110 transition-transform" />
                <div>
                  <div className="text-sm text-[var(--text-muted)]">Phone</div>
                  <div className="text-[var(--text-primary)]">+91 8092158233</div>
                </div>
              </a>

              <div className="flex items-center gap-4 glass rounded-lg p-4">
                <MapPin className="w-6 h-6 text-[var(--accent-primary)]" />
                <div>
                  <div className="text-sm text-[var(--text-muted)]">Location</div>
                  <div className="text-[var(--text-primary)]">Coimbatore, Tamil Nadu, India</div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <a href="https://linkedin.com/in/eklakh-dewan" target="_blank" rel="noopener" className="flex-1 glass rounded-lg p-4 text-center card-hover group">
                  <Linkedin className="w-6 h-6 mx-auto text-[var(--accent-primary)] group-hover:scale-110 transition-transform" />
                  <div className="text-sm mt-2 text-[var(--text-secondary)]">LinkedIn</div>
                </a>
                <a href="https://github.com/Eklakh-Dewan" target="_blank" rel="noopener" className="flex-1 glass rounded-lg p-4 text-center card-hover group">
                  <Github className="w-6 h-6 mx-auto text-[var(--accent-primary)] group-hover:scale-110 transition-transform" />
                  <div className="text-sm mt-2 text-[var(--text-secondary)]">GitHub</div>
                </a>
              </div>
            </div>

            {/* CTA */}
            <div className="glass-accent rounded-xl p-8 flex flex-col justify-center items-center text-center">
              <Target className="w-12 h-12 text-[var(--accent-primary)] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ready to collaborate?</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6">
                I respond within 24 hours. Let's discuss your AI/ML needs.
              </p>
              <a href="https://drive.google.com/file/d/1AnkPW0jqdqRUwSJReCvHOcT-m_KYwCdm/view?usp=sharing" target="_blank" rel="noopener" className="btn-primary flex items-center gap-2">
                <Download size={18} /> Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-[var(--text-muted)]">
            © 2026 Eklakh Dewan — Designed, Built & Explained End-to-End
          </div>
          <div className="flex items-center gap-2">
            <div className="status-dot" />
            <span className="text-sm font-mono text-[var(--success)]">SYSTEM STATUS: AVAILABLE</span>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 glass rounded-full text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)] transition-all animate-scale-in z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
}

export default App;
