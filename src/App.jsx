import {useEffect, useMemo, useRef, useState} from 'react';
import {ArrowUpRight, ImagePlus, Mail, Pause, Play} from 'lucide-react';
import GooeyNav from './components/reactbits/GooeyNav/GooeyNav.jsx';
import WarpText from './components/reactbits/WarpText/WarpText.jsx';
import VariableProximity from './components/reactbits/VariableProximity/VariableProximity.jsx';
import BlurText from './components/reactbits/BlurText/BlurText.jsx';
import SpotlightCard from './components/reactbits/SpotlightCard/SpotlightCard.jsx';
import Magnet from './components/reactbits/Magnet/Magnet.jsx';
import AccordionGallery from './components/reactbits/AccordionGallery/AccordionGallery.jsx';
import {ColorBendsBackground, IridescenceBackground} from './components/Backgrounds.jsx';
import {email, name, projects, workshop} from './content.js';

const routes = [
  {label: 'Start', path: '/'},
  {label: 'Projekty', path: '/projekty'},
  {label: 'Warsztat', path: '/warsztat'},
  {label: 'Kontakt', path: '/kontakt'}
];

const normalize = value => {
  const source = value || '/';
  const path = source.startsWith('/') ? source : `/${source}`;
  if (path === '/') return '/';
  return path.replace(/\/+$/, '');
};

const readPath = () => normalize(window.location.hash.slice(1) || '/');

const titleFor = path => {
  if (path === '/') return `${name} — Portfolio projektowe`;
  if (path === '/projekty') return `${name} — Projekty`;
  if (path === '/warsztat') return `${name} — Warsztat`;
  if (path === '/kontakt') return `${name} — Kontakt`;
  if (path.startsWith('/projekty/')) {
    const slug = path.split('/')[2];
    const project = projects.find(item => item.id === slug);
    return `${name} — ${project?.title || 'Projekt'}`;
  }
  return `${name} — Portfolio`;
};

function useIsNarrow(max = 760) {
  const [narrow, setNarrow] = useState(() => window.matchMedia(`(max-width: ${max}px)`).matches);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${max}px)`);
    const update = () => setNarrow(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [max]);

  return narrow;
}

function MediaSlot({src, alt, label, tall = false}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`media-slot media-slot--placeholder${tall ? ' media-slot--tall' : ''}`}>
        <ImagePlus size={24} strokeWidth={1.4} />
        <p>{label}</p>
      </div>
    );
  }

  return (
    <figure className={`media-slot${tall ? ' media-slot--tall' : ''}`}>
      <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
    </figure>
  );
}

function ContactBlock() {
  return (
    <section className="contact" aria-labelledby="contact-title">
      <h1 id="contact-title">Kontakt</h1>
      <p>Najłatwiej złapać mnie mailowo.</p>
      <a className="mailto" href={`mailto:${email}`}>
        <Mail size={20} />
        {email}
      </a>
    </section>
  );
}

export default function App() {
  const [path, setPath] = useState(() => readPath());
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const mainRef = useRef(null);
  const proximityRef = useRef(null);
  const narrow = useIsNarrow();

  const stopped = paused || reduced;
  const selectedProject = useMemo(
    () => (path.startsWith('/projekty/') ? projects.find(item => item.id === path.split('/')[2]) : null),
    [path]
  );

  const currentPath = selectedProject ? `/projekty/${selectedProject.id}` : path;
  const navIndex = currentPath.startsWith('/projekty/')
    ? 1
    : Math.max(0, routes.findIndex(item => item.path === currentPath));

  useEffect(() => {
    const onHashChange = () => {
      const next = readPath();
      if (next.startsWith('/projekty/')) {
        const slug = next.split('/')[2];
        if (!projects.some(item => item.id === slug)) {
          window.location.hash = '#/projekty';
          return;
        }
      }
      setPath(next);
    };

    window.addEventListener('hashchange', onHashChange);
    onHashChange();
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = stopped ? 'off' : 'on';
  }, [stopped]);

  useEffect(() => {
    const pageTitle = titleFor(currentPath);
    if (document.title !== pageTitle) document.title = pageTitle;
    window.scrollTo({top: 0, behavior: 'instant'});
    requestAnimationFrame(() => mainRef.current?.focus());
  }, [currentPath]);

  const navItems = routes.map(item => ({label: item.label, href: `#${item.path}`}));

  const galleryItems = projects.map(project => ({
    image: project.image,
    label: project.title,
    alt: `Ilustracja projektu ${project.title}`,
    link: `#/projekty/${project.id}`
  }));

  const projectCards = projects.map(project => (
    <SpotlightCard
      key={project.id}
      className="project-card"
      spotlightColor="rgb(112 255 203)"
      intensity={0.4}
      borderGlow={0.75}
      grain={0.1}
      smoothing={0.35}
      flare
      ambient
    >
      <div className="project-card__content">
        <span className="project-card__status">{project.status || 'Projekt ukończony'}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <a className="text-link" href={`#/projekty/${project.id}`}>
          Otwórz stronę projektu <ArrowUpRight size={16} />
        </a>
      </div>
    </SpotlightCard>
  ));

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Przejdź do treści
      </a>

      <header className="topbar">
        <a className="wordmark" href="#/">
          {name}
        </a>
        <GooeyNav
          items={navItems}
          activeIndex={navIndex}
          onChange={index => setPath(routes[index].path)}
          color="#65f0c5"
          colors={['#65f0c5', '#68b1ff', '#9d79ff']}
          frame
          size={narrow ? 'sm' : 'md'}
          className="main-nav"
        />
        <button className="motion-toggle" type="button" onClick={() => setPaused(value => !value)} disabled={reduced}>
          {stopped ? <Play size={14} /> : <Pause size={14} />}
          {stopped ? 'Animacje wyłączone' : 'Pauza animacji'}
        </button>
      </header>

      <main id="main" ref={mainRef} tabIndex="-1">
        {currentPath === '/' && (
          <>
            <section className="hero" aria-labelledby="hero-title">
              <ColorBendsBackground paused={stopped} />
              <div className="hero__content">
                <h1 id="hero-title" className="sr-only">
                  Portfolio projektowe
                </h1>
                {stopped ? (
                  <p className="hero__fallback">Elektronika\nKod i sygnały</p>
                ) : (
                  <WarpText
                    text={'Elektronika\nKod i sygnały'}
                    className="hero__warp"
                    fontSize="clamp(2.4rem, 11vw, 6rem)"
                    fontWeight={700}
                    color="#e8f6ff"
                    idleDrift={0.22}
                    clickRipple
                    warpStrength={0.08}
                  />
                )}

                <div ref={proximityRef} className="hero__lead">
                  <VariableProximity
                    label="Projektuję układy i narzędzia edukacyjne. Ten serwis zbiera notatki, schematy i dokumentację pięciu projektów."
                    fromFontVariationSettings="'wght' 390, 'opsz' 14"
                    toFontVariationSettings="'wght' 820, 'opsz' 28"
                    fromColor="#b5d2db"
                    toColor="#e8fff6"
                    idleWave
                    radius={140}
                    lift={0.06}
                    scale={1.05}
                    containerRef={proximityRef}
                  />
                </div>

                <BlurText
                  className="hero__sub"
                  text="Kliknij projekt i przejdź do jego oddzielnej strony z miejscami na dokumentację."
                  animateBy="words"
                  direction="bottom"
                  effect="focus"
                  trigger="view"
                  delay={80}
                  stepDuration={0.28}
                />

                <Magnet padding={50} magnetStrength={4} disabled={stopped}>
                  <a className="cta" href="#/projekty">
                    Przejdź do projektów <ArrowUpRight size={16} />
                  </a>
                </Magnet>
              </div>
            </section>

            <section className="section">
              <div className="section-head">
                <h2>Projekty</h2>
                <a className="text-link" href="#/projekty">
                  Zobacz wszystkie
                </a>
              </div>
              <div className="grid">{projectCards.slice(0, 3)}</div>
            </section>
          </>
        )}

        {currentPath === '/projekty' && (
          <section className="section" aria-labelledby="projects-title">
            <div className="section-head">
              <h1 id="projects-title">Indeks projektów</h1>
              <p>Każdy projekt ma własną podstronę z miejscem na dokumentację i zdjęcia.</p>
            </div>

            <div className="gallery-shell">
              <AccordionGallery
                items={galleryItems}
                defaultIndex={0}
                accentColor="#8bf7d1"
                textColor="#f4fbff"
                orientation={narrow ? 'vertical' : 'horizontal'}
                trigger={narrow ? 'click' : 'hover'}
                height={narrow ? 320 : 430}
                className="project-gallery"
              />
            </div>

            <div className="grid">{projectCards}</div>
          </section>
        )}

        {selectedProject && (
          <section className="section project-page" aria-labelledby="project-title">
            <div className="section-head">
              <h1 id="project-title">{selectedProject.title}</h1>
              <p>{selectedProject.description}</p>
            </div>

            <SpotlightCard
              className="project-page__hero"
              spotlightColor="#78c4ff"
              intensity={0.35}
              borderGlow={0.68}
              grain={0.08}
              smoothing={0.28}
              flare
              ambient
            >
              <MediaSlot
                src={selectedProject.image}
                alt={`Ilustracja projektu ${selectedProject.title}`}
                label={`Okładka projektu ${selectedProject.title} (ilustracja)`}
                tall
              />
            </SpotlightCard>

            <div className="docs-grid">
              {selectedProject.images.map((src, index) => (
                <MediaSlot
                  key={`${selectedProject.id}-${index}`}
                  src={src}
                  alt={`Dokumentacja projektu ${selectedProject.title}, obraz ${index + 1}`}
                  label={`Dodaj zdjęcie dokumentacji ${index + 1}`}
                />
              ))}
            </div>

            <div className="row-links">
              <a className="text-link" href="#/projekty">
                Wróć do indeksu projektów
              </a>
              <a className="text-link" href="#/kontakt">
                Napisz mail
              </a>
            </div>
          </section>
        )}

        {currentPath === '/warsztat' && (
          <section className="section workshop" aria-labelledby="workshop-title">
            <IridescenceBackground paused={stopped} />
            <div className="section-head">
              <h1 id="workshop-title">Warsztat i notatki</h1>
              <p>{workshop.intro}</p>
            </div>

            <SpotlightCard
              className="workshop-note"
              spotlightColor="#a289ff"
              intensity={0.33}
              borderGlow={0.65}
              grain={0.09}
              smoothing={0.3}
              flare
              ambient
            >
              <p>{workshop.about}</p>
            </SpotlightCard>

            <div className="tools" role="list" aria-label="Narzędzia">
              {workshop.tools.map(tool => (
                <Magnet key={tool} padding={24} magnetStrength={6} disabled={stopped}>
                  <span role="listitem" className="tool-pill">
                    {tool}
                  </span>
                </Magnet>
              ))}
            </div>

            <div className="docs-grid">
              <MediaSlot
                src={workshop.portraitSlot}
                alt="Portret lub zdjęcie autora przy stanowisku"
                label="Dodaj zdjęcie portretowe lub przy stanowisku"
              />
              <MediaSlot
                src={workshop.workbenchSlot}
                alt="Zdjęcie stanowiska warsztatowego"
                label="Dodaj zdjęcie stanowiska warsztatowego"
              />
            </div>
          </section>
        )}

        {currentPath === '/kontakt' && <ContactBlock />}
      </main>

      <footer className="footer">
        <span>{name}</span>
        <a href={`mailto:${email}`}>{email}</a>
      </footer>
    </div>
  );
}
