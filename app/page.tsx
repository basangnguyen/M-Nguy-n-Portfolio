"use client";

import {
  FormEvent,
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
  TouchEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type FilterKey = "strategy" | "production" | "social";

type ProjectSlide =
  | {
      kind: "image";
      src: string;
      alt: string;
      eyebrow: string;
      title: string;
      copy: string;
    }
  | {
      kind: "text";
      eyebrow: string;
      title: string;
      copy: string;
      facts: string[];
    }
  | {
      kind: "video";
      videoId: string;
      poster: string;
      eyebrow: string;
      title: string;
      copy: string;
    };

type Project = {
  id: string;
  index: string;
  title: string;
  discipline: string;
  description: string;
  role: string;
  slides: ProjectSlide[];
};

type GalleryCard = {
  id: string;
  projectId: string;
  src: string;
  alt: string;
  label: string;
  meta: string;
  ratio: string;
  filters: FilterKey[];
  video?: boolean;
};

const projects: Project[] = [
  {
    id: "lays-max",
    index: "01",
    title: "Lay’s Max",
    discipline: "IMC Plan",
    description:
      "An integrated campaign designed to reduce hesitation around unfamiliar flavours and make Lay’s Max top-of-mind for a new-flavour snack experience.",
    role:
      "Team leader · Market research · Consumer insights · Competitive analysis · Campaign development · Main actress",
    slides: [
      {
        kind: "image",
        src: "/media/lays-max.png",
        alt: "Lay’s Max campaign cover",
        eyebrow: "Integrated marketing campaign",
        title: "Lay’s Max",
        copy:
          "Lay’s Max launched with three bolder flavours: Wagyu Beef, Truffle Mushroom, and Sour Cream & Onion.",
      },
      {
        kind: "text",
        eyebrow: "Campaign direction",
        title: "Khám phá thế giới Max",
        copy:
          "The campaign encourages trial and brings Lay’s Max to top-of-mind as a snack for discovering new flavours.",
        facts: [
          "Key message: “Khám phá thế giới MAX, Khoảnh khắc vị giác thăng hoa”",
          "Research included market segmentation, OSEP, competitor analysis and consumer interviews.",
          "Mỹ led a 10-member team and managed planning, creative development and quality control.",
        ],
      },
      {
        kind: "image",
        src: "/media/lays-wagyu.png",
        alt: "Lay’s Max Wagyu Beef mascot",
        eyebrow: "Mascot exploration",
        title: "Wagyu Beef",
        copy:
          "One of three mascot directions created to give each flavour a distinct, playful identity.",
      },
      {
        kind: "image",
        src: "/media/lays-truffle.png",
        alt: "Lay’s Max Truffle Mushroom mascot",
        eyebrow: "Mascot exploration",
        title: "Truffle Mushroom",
        copy:
          "A flavour-led character study developed as part of the campaign’s creative system.",
      },
      {
        kind: "image",
        src: "/media/lays-sour-cream.png",
        alt: "Lay’s Max Sour Cream and Onion mascot",
        eyebrow: "Mascot exploration",
        title: "Sour Cream & Onion",
        copy:
          "The third character completes the campaign’s three-world experience.",
      },
      {
        kind: "video",
        videoId: "Ui2TqPT5-_A",
        poster: "/media/lays-tvc.jpg",
        eyebrow: "TVC demo",
        title: "Yes to try. Feel high.",
        copy:
          "The demo TVC brings the new-flavour world to life. Mỹ also appears as the main actress.",
      },
    ],
  },
  {
    id: "chupa-chups",
    index: "02",
    title: "Chupa Chups",
    discipline: "Advertising Production",
    description:
      "A playful parody advertisement for Chupa Chups Sour Belt 1M, built around the product’s extraordinary length and the brand’s Forever Fun spirit.",
    role:
      "Market research · Production planning · Moodboard · Shot list · Storyboard · Actress",
    slides: [
      {
        kind: "image",
        src: "/media/chupa-chups.png",
        alt: "Chupa Chups Sour Belt parody campaign",
        eyebrow: "Advertising production",
        title: "Dây kẹo trăm mét",
        copy:
          "A colourful parody inspired by the Vietnamese folktale “The Hundred-Knot Bamboo Tree.”",
      },
      {
        kind: "text",
        eyebrow: "Creative idea",
        title: "Chua ngọt mê ly, dài vui hết ý",
        copy:
          "The story follows a young man searching for a five-colour candy long enough for the whole village to enjoy.",
        facts: [
          "Built the moodboard, shot list and storyboard.",
          "Collaborated with the cameraman and supported on-set production.",
          "Played the rich man’s daughter in the finished parody.",
        ],
      },
      {
        kind: "video",
        videoId: "DBCMMBaScnU",
        poster: "/media/chupa-video.jpg",
        eyebrow: "Parody film",
        title: "Hundred-metre candy string",
        copy:
          "The film uses an adapted song to keep the pace lively, energetic and unmistakably fun.",
      },
    ],
  },
  {
    id: "sfit",
    index: "03",
    title: "SFit",
    discipline: "Digital Marketing",
    description:
      "A two-week launch for a conceptual smart T-shirt brand, combining fanpage growth, social content and email marketing.",
    role:
      "Product ideation · Strategy · Content plan · Facebook design · Email marketing",
    slides: [
      {
        kind: "image",
        src: "/media/sfit.png",
        alt: "SFit smart sportswear identity",
        eyebrow: "Conceptual brand",
        title: "SFit",
        copy:
          "A technology-enabled T-shirt concept designed to help users monitor body metrics.",
      },
      {
        kind: "text",
        eyebrow: "Two-week sprint",
        title: "500+ new followers",
        copy:
          "The team developed the brand idea, built its fanpage and launched a focused social and email campaign.",
        facts: [
          "Planned and designed social content across the two-week launch.",
          "Designed Facebook content and seeded the campaign.",
          "Implemented an email marketing campaign for the new product.",
        ],
      },
    ],
  },
  {
    id: "creative-mindset",
    index: "04",
    title: "Creative Mindset",
    discipline: "Viral Video",
    description:
      "A WHO representative brief calling for support for greening activities in Vietnam through an urgent, responsibility-led story.",
    role:
      "Team leader · Market research · Production · Planning · Actress",
    slides: [
      {
        kind: "image",
        src: "/media/creative-mindset.jpg",
        alt: "Creative Mindset campaign artwork",
        eyebrow: "Viral video concept",
        title: "Creative Mindset",
        copy:
          "A stark visual direction built around the consequences of inaction.",
      },
      {
        kind: "text",
        eyebrow: "Inspire responsibility",
        title: "Để Trái Đất thở hoặc con người nghẹt thở",
        copy:
          "The concept points to human responsibility and asks viewers to help return green space.",
        facts: [
          "Call to action: “Quét mã trả vùng xanh.”",
          "Mỹ led a 10-member team.",
          "Developed the script direction, storyboard, slogan and workshop demo.",
        ],
      },
    ],
  },
  {
    id: "experience",
    index: "05",
    title: "WorkFlow Space",
    discipline: "Marketing Experience",
    description:
      "Hands-on work spanning research, social media planning, KOL booking and marketing-event support.",
    role:
      "Market research · Content plan · KOL booking · Event coordination",
    slides: [
      {
        kind: "image",
        src: "/media/plato-checkin.jpg",
        alt: "Event check-in support at Plato Brand Academy",
        eyebrow: "Experience",
        title: "People, planning and delivery",
        copy:
          "Marketing work carried through from pre-event preparation to on-site customer support and post-event follow-up.",
      },
      {
        kind: "text",
        eyebrow: "WorkFlow Space",
        title: "From content calendar to event floor",
        copy:
          "Mỹ supported both always-on content and campaign execution across teams.",
        facts: [
          "Built weekly and monthly content calendars aligned with brand direction.",
          "Managed and grew the brand’s social presence.",
          "Planned and assisted with marketing events.",
          "Supported vendors, check-in and customer service at Plato Brand Academy.",
        ],
      },
    ],
  },
];

const galleryCards: GalleryCard[] = [
  {
    id: "lays-cover",
    projectId: "lays-max",
    src: "/media/lays-max.png",
    alt: "Lay’s Max campaign cover",
    label: "Lay’s Max",
    meta: "IMC Plan",
    ratio: "16 / 9",
    filters: ["strategy", "production", "social"],
  },
  {
    id: "sfit-cover",
    projectId: "sfit",
    src: "/media/sfit.png",
    alt: "SFit smart sportswear identity",
    label: "SFit",
    meta: "Digital Marketing",
    ratio: "10 / 6",
    filters: ["strategy", "social"],
  },
  {
    id: "chupa-cover",
    projectId: "chupa-chups",
    src: "/media/chupa-chups.png",
    alt: "Chupa Chups parody campaign cover",
    label: "Chupa Chups",
    meta: "Advertising Production",
    ratio: "16 / 9",
    filters: ["production", "social"],
  },
  {
    id: "creative-cover",
    projectId: "creative-mindset",
    src: "/media/creative-mindset.jpg",
    alt: "Creative Mindset viral video artwork",
    label: "Creative Mindset",
    meta: "Viral Video",
    ratio: "9 / 16",
    filters: ["production", "social"],
  },
  {
    id: "lays-wagyu",
    projectId: "lays-max",
    src: "/media/lays-wagyu.png",
    alt: "Lay’s Max Wagyu Beef mascot",
    label: "Wagyu Beef",
    meta: "Mascot Design",
    ratio: "1 / 1",
    filters: ["production"],
  },
  {
    id: "lays-truffle",
    projectId: "lays-max",
    src: "/media/lays-truffle.png",
    alt: "Lay’s Max Truffle Mushroom mascot",
    label: "Truffle Mushroom",
    meta: "Mascot Design",
    ratio: "1 / 1",
    filters: ["production"],
  },
  {
    id: "lays-sour-cream",
    projectId: "lays-max",
    src: "/media/lays-sour-cream.png",
    alt: "Lay’s Max Sour Cream and Onion mascot",
    label: "Sour Cream & Onion",
    meta: "Mascot Design",
    ratio: "1 / 1",
    filters: ["production"],
  },
  {
    id: "lays-tvc",
    projectId: "lays-max",
    src: "/media/lays-tvc.jpg",
    alt: "Lay’s Max TVC demo thumbnail",
    label: "Lay’s Max TVC",
    meta: "Video Production",
    ratio: "16 / 9",
    filters: ["production", "social"],
    video: true,
  },
  {
    id: "chupa-video",
    projectId: "chupa-chups",
    src: "/media/chupa-video.jpg",
    alt: "Chupa Chups parody video thumbnail",
    label: "Dây kẹo trăm mét",
    meta: "Parody Film",
    ratio: "16 / 9",
    filters: ["production", "social"],
    video: true,
  },
  {
    id: "plato",
    projectId: "experience",
    src: "/media/plato-checkin.jpg",
    alt: "Event check-in support at Plato Brand Academy",
    label: "Plato Brand Academy",
    meta: "Event Support",
    ratio: "16 / 10",
    filters: ["strategy", "social"],
  },
];

const filterOptions: { id: FilterKey; label: string; note: string }[] = [
  { id: "strategy", label: "Strategy", note: "Research & planning" },
  { id: "production", label: "Production", note: "Campaign & film" },
  { id: "social", label: "Social", note: "Content & experience" },
];

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [slideIndex, setSlideIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const slide = project.slides[slideIndex];

  const move = useCallback((direction: number) => {
    setSlideIndex((current) => {
      const next = current + direction;
      if (next < 0) return project.slides.length - 1;
      if (next >= project.slides.length) return 0;
      return next;
    });
  }, [project.slides.length]);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("[data-dialog-close]")?.focus();

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
      if (event.key !== "Tab" || !panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], iframe, input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [move, onClose]);

  const onTouchStart = (event: TouchEvent) => {
    touchStart.current = event.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent) => {
    if (touchStart.current === null) return;
    const end = event.changedTouches[0]?.clientX ?? touchStart.current;
    const delta = end - touchStart.current;
    if (Math.abs(delta) > 44) move(delta > 0 ? -1 : 1);
    touchStart.current = null;
  };

  return (
    <div className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-title">
      <button className="dialog-backdrop" onClick={onClose} aria-label="Close project" />
      <div className="dialog-panel" ref={panelRef} tabIndex={-1}>
        <header className="dialog-header">
          <div>
            <span className="dialog-index">{project.index}</span>
            <h2 id="project-title">{project.title}</h2>
            <p>{project.discipline}</p>
          </div>
          <button
            className="dialog-close"
            onClick={onClose}
            aria-label="Close project"
            data-dialog-close
            data-selectable
          >
            Close <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="dialog-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className={`dialog-media dialog-media--${slide.kind}`}>
            {slide.kind === "image" && (
              <img src={slide.src} alt={slide.alt} key={slide.src} />
            )}
            {slide.kind === "video" && (
              <iframe
                key={slide.videoId}
                src={`https://www.youtube-nocookie.com/embed/${slide.videoId}?rel=0`}
                title={slide.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
            {slide.kind === "text" && (
              <div className="dialog-text-card">
                <span className="micro-label">{slide.eyebrow}</span>
                <h3>{slide.title}</h3>
                <p>{slide.copy}</p>
                <ol>
                  {slide.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {slide.kind !== "text" && (
            <div className="dialog-caption">
              <span className="micro-label">{slide.eyebrow}</span>
              <h3>{slide.title}</h3>
              <p>{slide.copy}</p>
            </div>
          )}
        </div>

        <footer className="dialog-footer">
          <div className="dialog-progress" aria-label={`Slide ${slideIndex + 1} of ${project.slides.length}`}>
            {project.slides.map((_, index) => (
              <button
                key={index}
                className={index === slideIndex ? "is-active" : ""}
                onClick={() => setSlideIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="dialog-controls">
            <span>
              {String(slideIndex + 1).padStart(2, "0")} / {String(project.slides.length).padStart(2, "0")}
            </span>
            <button onClick={() => move(-1)} aria-label="Previous slide" data-selectable>
              ←
            </button>
            <button onClick={() => move(1)} aria-label="Next slide" data-selectable>
              →
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

function SelectionFrame() {
  return (
    <>
      <div className="selection-frame" aria-hidden="true">
        {["nw", "n", "ne", "e", "se", "s", "sw", "w"].map((position) => (
          <span key={position} className={`handle handle--${position}`} />
        ))}
      </div>
      <div className="custom-cursor" aria-hidden="true">
        <span />
      </div>
    </>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("production");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const heroVisual = useRef<HTMLDivElement>(null);

  const filteredCards = useMemo(
    () => galleryCards.filter((card) => card.filters.includes(activeFilter)),
    [activeFilter],
  );

  const galleryColumns = useMemo(() => {
    const columns: GalleryCard[][] = [[], [], [], []];
    filteredCards.forEach((card, index) => columns[index % 4].push(card));
    return columns;
  }, [filteredCards]);

  useEffect(() => {
    let lastScroll = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      setHeaderHidden(!menuOpen && current > lastScroll && current > 150);
      lastScroll = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.classList.toggle("is-locked", menuOpen || Boolean(activeProject));
    return () => document.body.classList.remove("is-locked");
  }, [menuOpen, activeProject]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const frame = document.querySelector<HTMLElement>(".selection-frame");
    const cursor = document.querySelector<HTMLElement>(".custom-cursor");
    if (!frame || !cursor) return;

    const onPointerMove = (event: PointerEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-selectable]");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      frame.style.setProperty("--frame-x", `${rect.left - 4}px`);
      frame.style.setProperty("--frame-y", `${rect.top - 4}px`);
      frame.style.setProperty("--frame-width", `${rect.width + 8}px`);
      frame.style.setProperty("--frame-height", `${rect.height + 8}px`);
      frame.classList.add("is-visible");
      cursor.classList.add("is-active");
    };

    const onPointerOut = (event: PointerEvent) => {
      const from = (event.target as Element | null)?.closest<HTMLElement>("[data-selectable]");
      const to = (event.relatedTarget as Element | null)?.closest<HTMLElement>("[data-selectable]");
      if (!from || from === to) return;
      frame.classList.remove("is-visible");
      cursor.classList.remove("is-active");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
    };
  }, []);

  const onHeroPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = heroVisual.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    element.style.setProperty("--hero-x", `${x * 18}px`);
    element.style.setProperty("--hero-y", `${y * 14}px`);
  };

  const openProject = (projectId: string) => {
    const project = projects.find((item) => item.id === projectId);
    if (project) setActiveProject(project);
  };

  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(
      `${message}\n\nFrom: ${name}\nReply to: ${email}`,
    );
    window.location.href = `mailto:mynguyen.working22@gmail.com?subject=${subject}&body=${body}`;
  };

  const onBrandKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === "Enter") setMenuOpen(false);
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SelectionFrame />

      <header
        className={`site-header ${headerHidden ? "is-hidden" : ""}`}
        inert={activeProject ? true : undefined}
        aria-hidden={activeProject ? true : undefined}
      >
        <div className="announcement">
          A joyful, proactive &amp; energetic Marketing Explorer
        </div>
        <div className="nav page-width">
          <a
            className="brand"
            href="#top"
            aria-label="Mỹ Nguyễn, back to top"
            onKeyDown={onBrandKeyDown}
            data-selectable
          >
            <span className="brand-mark">M</span>
            <span className="brand-name">Mỹ Nguyễn</span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#work" data-selectable>My work</a>
            <a href="#bio" data-selectable>About</a>
            <a href="#experience" data-selectable>Experience</a>
            <a className="pill" href="#contact" data-selectable>
              <span aria-hidden="true">★</span> Let&apos;s connect
            </a>
          </nav>

          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            data-selectable
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav className={`mobile-nav ${menuOpen ? "is-open" : ""}`} aria-label="Mobile navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>My work</a>
          <a href="#bio" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a className="pill" href="#contact" onClick={() => setMenuOpen(false)}>
            <span aria-hidden="true">★</span> Let&apos;s connect
          </a>
          <a className="mobile-email" href="mailto:mynguyen.working22@gmail.com">
            mynguyen.working22@gmail.com
          </a>
          <div className="mobile-socials">
            <a href="https://www.facebook.com/mynupo.228/" target="_blank" rel="noreferrer">
              Facebook ↗
            </a>
            <a href="https://www.linkedin.com/in/mynguyen2003/" target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
          </div>
        </nav>
      </header>

      <main
        id="main"
        inert={menuOpen || activeProject ? true : undefined}
        aria-hidden={menuOpen || activeProject ? true : undefined}
      >
        <section className="hero" id="top">
          <div className="hero-inner page-width">
            <div className="hero-copy">
              <p className="micro-label">Marketing · Content · Production</p>
              <h1>Ideas that connect brands, people &amp; emotion.</h1>
              <div className="hero-actions">
                <a className="pill" href="mailto:mynguyen.working22@gmail.com" data-selectable>
                  <span aria-hidden="true">★</span> Email Mỹ
                </a>
                <a className="text-link" href="#work" data-selectable>
                  Explore selected work ↘
                </a>
              </div>
              <blockquote>
                “Marketing is all about connection — between brands and people,
                ideas and emotions.”
              </blockquote>
              <p className="hero-signoff">
                I aspire to create those meaningful connections with joy and authenticity.
              </p>
              <div className="project-names" aria-label="Selected projects and experience">
                <span>Selected projects &amp; experience</span>
                <div>
                  <b>LAY&apos;S MAX</b>
                  <b>CHUPA CHUPS</b>
                  <b>SFIT</b>
                  <b>WORKFLOW SPACE</b>
                </div>
              </div>
            </div>

            <div
              className="hero-visual"
              ref={heroVisual}
              onPointerMove={onHeroPointerMove}
              onPointerLeave={() => {
                heroVisual.current?.style.setProperty("--hero-x", "0px");
                heroVisual.current?.style.setProperty("--hero-y", "0px");
              }}
            >
              <button
                className="hero-mascot hero-mascot--main"
                onClick={() => openProject("lays-max")}
                aria-label="Open Lay’s Max project"
                data-selectable
              >
                <img src="/media/lays-wagyu.png" alt="" />
              </button>
              <img className="hero-mascot hero-mascot--truffle" src="/media/lays-truffle.png" alt="" />
              <img className="hero-mascot hero-mascot--cream" src="/media/lays-sour-cream.png" alt="" />
              <button
                className="hero-video-card"
                onClick={() => openProject("lays-max")}
                aria-label="Open Lay’s Max TVC"
                data-selectable
              >
                <img src="/media/lays-tvc.jpg" alt="" />
                <span className="play-mark" aria-hidden="true">▶</span>
                <small>Lay&apos;s Max · TVC demo</small>
              </button>
              <span className="hero-doodle hero-doodle--one">YES<br />TO<br />TRY!</span>
              <span className="hero-doodle hero-doodle--two">✦</span>
            </div>
          </div>
        </section>

        <section className="bio reveal" id="bio">
          <div className="bio-grid page-width">
            <div className="portrait-wrap">
              <img src="/media/my-nguyen.jpg" alt="Mỹ Nguyễn" />
              <span className="portrait-note">Can-do attitude</span>
            </div>
            <div className="bio-copy">
              <p className="micro-label">✦ Marketing Explorer</p>
              <h2>Hi, I&apos;m Mỹ — joyful, proactive and always ready to explore.</h2>
              <p>
                My work moves between market research, consumer insight, campaign
                planning, content and hands-on production. I care about the point
                where a clear idea becomes a meaningful connection.
              </p>
              <blockquote>
                “Every experience is a note in the symphony of my life — enriching
                it with meaningful lessons and treasured memories.”
              </blockquote>
              <div className="capabilities">
                {[
                  ["01", "Market Research"],
                  ["02", "Consumer Insights"],
                  ["03", "Campaign Planning"],
                  ["04", "Content & Production"],
                ].map(([number, label]) => (
                  <div className="capability" key={number}>
                    <span>{number}</span>
                    <strong>{label}</strong>
                    <i aria-hidden="true">↗</i>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="marquee" aria-label="Projects and experience">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div className="marquee-set" key={copy} aria-hidden={copy === 1}>
                {["LAY’S MAX", "CHUPA CHUPS", "SFIT", "WORKFLOW SPACE", "PLATO BRAND ACADEMY"].map(
                  (label) => (
                    <span key={label}>✦ {label}</span>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>

        <section className="work reveal" id="work">
          <div className="work-heading page-width">
            <div className="work-icon" aria-hidden="true">
              <span>✦</span>
              <i>↗</i>
            </div>
            <p className="micro-label">Selected work</p>
            <h2>My work</h2>
            <p>Open a folder, then select any piece to read the full project story.</p>
          </div>

          <div className="folder-tabs" role="tablist" aria-label="Filter work">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter.id}
                className={`folder-tab folder-tab--${filter.id} ${
                  activeFilter === filter.id ? "is-active" : ""
                }`}
                onClick={() => setActiveFilter(filter.id)}
                data-selectable
              >
                <span className="folder-shape">
                  <i aria-hidden="true">↘</i>
                </span>
                <strong>{filter.label}</strong>
                <small>{filter.note}</small>
              </button>
            ))}
          </div>

          <div className="gallery" aria-live="polite">
            {galleryColumns.map((column, columnIndex) => (
              <div className="gallery-column" key={`${activeFilter}-${columnIndex}`}>
                {column.map((card) => (
                  <article className="gallery-item" key={card.id}>
                    <button
                      className="gallery-media"
                      style={{ aspectRatio: card.ratio }}
                      onClick={() => openProject(card.projectId)}
                      aria-label={`Open ${card.label} project`}
                      data-selectable
                    >
                      <img src={card.src} alt={card.alt} loading="lazy" />
                      {card.video && <span className="play-mark" aria-hidden="true">▶</span>}
                    </button>
                    <p>{card.meta}</p>
                    <h3>{card.label}</h3>
                  </article>
                ))}
              </div>
            ))}
          </div>

          <a className="pill back-to-top" href="#top" data-selectable>
            <span aria-hidden="true">★</span> Back to top
          </a>
        </section>

        <section className="experience reveal" id="experience">
          <div className="experience-grid page-width">
            <div className="experience-copy">
              <p className="micro-label">Experience</p>
              <h2>Planning is only useful when it moves people.</h2>
              <p>
                At WorkFlow Space, Mỹ worked across research, content calendars,
                KOL booking and event support. The work continued on the event
                floor through vendor coordination, check-in and customer service
                at Plato Brand Academy.
              </p>
              <button className="text-link" onClick={() => openProject("experience")} data-selectable>
                View experience story ↗
              </button>
            </div>
            <button
              className="experience-image"
              onClick={() => openProject("experience")}
              aria-label="Open experience project"
              data-selectable
            >
              <img src="/media/plato-checkin.jpg" alt="Mỹ supporting event check-in" />
              <span>People · Planning · Delivery</span>
            </button>
          </div>
        </section>
      </main>

      <footer
        className="contact"
        id="contact"
        inert={menuOpen || activeProject ? true : undefined}
        aria-hidden={menuOpen || activeProject ? true : undefined}
      >
        <div className="contact-grid page-width">
          <div className="contact-copy">
            <p className="micro-label">Say hello</p>
            <h2>Let&apos;s connect.</h2>
            <p>
              Every collaboration is a new story. Thank you for taking the time
              to view my portfolio.
            </p>
            <a className="contact-email" href="mailto:mynguyen.working22@gmail.com" data-selectable>
              mynguyen.working22@gmail.com
            </a>
            <div className="contact-links">
              <a
                href="https://readymag.website/u2638604642/5404969/"
                target="_blank"
                rel="noreferrer"
                data-selectable
              >
                Portfolio archive ↗
              </a>
              <a
                href="https://www.linkedin.com/in/mynguyen2003/"
                target="_blank"
                rel="noreferrer"
                data-selectable
              >
                LinkedIn ↗
              </a>
              <a
                href="https://www.facebook.com/mynupo.228/"
                target="_blank"
                rel="noreferrer"
                data-selectable
              >
                Facebook ↗
              </a>
              <a href="#work" data-selectable>Selected work ↑</a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleContact}>
            <div className="form-row">
              <label>
                <span className="sr-only">Name</span>
                <input name="name" type="text" placeholder="name" required />
              </label>
              <label>
                <span className="sr-only">Email</span>
                <input name="email" type="email" placeholder="email" required />
              </label>
            </div>
            <label>
              <span className="sr-only">Message</span>
              <textarea name="message" placeholder="write your message" required />
            </label>
            <button className="pill" type="submit" data-selectable>
              <span aria-hidden="true">★</span> Send via email
            </button>
            <small>Your default mail app will open with the message prepared.</small>
          </form>
        </div>
        <div className="contact-bottom page-width">
          <span>Portfolio content © Mỹ Nguyễn</span>
          <span>Marketing · Content · Production</span>
        </div>
      </footer>

      {activeProject && (
        <ProjectDialog project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </>
  );
}
