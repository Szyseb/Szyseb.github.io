import {useEffect, useState} from 'react';
import {Check, Copy, Plus} from 'lucide-react';
import {email, projects, toolGroups} from './content.js';
import Header from './Header.jsx';

const previousRoutes = new Map([
  ['/', 'start'],
  ['/projekty', 'projekty'],
  ['/projekty/pcsk225', 'pcsk225'],
  ['/projekty/lokalizacja', 'wireless'],
  ['/projekty/sn74138', 'layout'],
  ['/projekty/kicad-7seg', 'projekty'],
  ['/projekty/perfect-circuit-builder', 'game'],
  ['/warsztat', 'warsztat'],
  ['/kontakt', 'kontakt'],
  ['display', 'projekty'],
]);

const projectCount = String(projects.length).padStart(2, '0');
const countForm = new Intl.PluralRules('pl').select(projects.length);
const projectLabel = {one: 'realizacja', few: 'realizacje'}[countForm] ?? 'realizacji';

function Project({project, index}) {
  const {id, title, description, detail, status, tags, image, images} = project;

  return (
    <li>
      <details className="project" id={id} name="projects">
        <summary>
          <span className="project-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <span className="project-intro">
            <strong>{title}</strong>
            <span>{description}</span>
          </span>
          <span className="project-tools" aria-hidden="true">{tags.join(' / ')}</span>
          <span className="project-toggle" aria-hidden="true"><Plus size={19} /></span>
        </summary>
        <div className="project-detail">
          <div className="project-meta">
            {status && <span className="project-status">{status}</span>}
            <span>{tags.join(' / ')}</span>
          </div>
          <p>{detail}</p>
          {[image, ...images].filter(Boolean).map((src, imageIndex) => (
            <img key={src} src={src} alt={`Dokumentacja projektu ${title}, ilustracja ${imageIndex + 1}`} loading="lazy" />
          ))}
        </div>
      </details>
    </li>
  );
}

function Contact() {
  const [copyStatus, setCopyStatus] = useState('idle');

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('failed');
    }
  }

  return (
    <section className="contact" id="kontakt" aria-labelledby="contact-title">
      <div>
        <h2 id="contact-title">Kontakt</h2>
        <p>Pomysł, projekt, współpraca? Napisz.</p>
      </div>
      <div className="contact-actions">
        <button className="email-copy" type="button" onClick={copyEmail} aria-label={`Skopiuj adres ${email}`}>
          <span>{email}</span>
          {copyStatus === 'copied' ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
        </button>
        <p className={copyStatus === 'idle' ? 'sr-only' : 'copy-note'} role="status">
          {copyStatus === 'copied' && 'Adres e-mail skopiowany.'}
          {copyStatus === 'failed' && 'Zaznacz i skopiuj adres ręcznie.'}
        </p>
      </div>
    </section>
  );
}

export default function App() {
  useEffect(() => {
    function openLinkedProject() {
      const fragment = window.location.hash.slice(1);
      const target = document.getElementById(previousRoutes.get(fragment) ?? fragment);
      if (target instanceof HTMLDetailsElement) {
        target.open = true;
        target.scrollIntoView({block: 'start'});
      } else {
        target?.scrollIntoView({block: 'start'});
      }
    }

    openLinkedProject();
    window.addEventListener('hashchange', openLinkedProject);
    return () => window.removeEventListener('hashchange', openLinkedProject);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Przejdź do treści</a>
      <span id="start" className="anchor-alias" aria-hidden="true" />
      <Header />
      <main className="container" id="main" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy" id="o-mnie">
            <h1 id="hero-title">Elektronik<span>.</span></h1>
            <p className="hero-description">Projektuję układy i piszę oprogramowanie.</p>
          </div>
        </section>
        <section className="projects" id="projekty" aria-labelledby="projects-title">
          <span id="galeria" className="anchor-alias" aria-hidden="true" />
          <div className="section-heading">
            <h2 id="projects-title">Projekty</h2>
            <p className="technical-label">{projectCount} {projectLabel}</p>
          </div>
          <ol className="project-list" role="list">
            {projects.map((project, index) => <Project key={project.id} project={project} index={index} />)}
          </ol>
        </section>
        <section className="workshop" id="warsztat" aria-labelledby="workshop-title">
          <div>
            <h2 id="workshop-title">Warsztat</h2>
            <p>Narzędzia, których używam w projektach.</p>
          </div>
          <dl>
            {toolGroups.map(([group, tools]) => (
              <div key={group}><dt>{group}</dt><dd>{tools}</dd></div>
            ))}
          </dl>
        </section>
        <Contact />
      </main>
    </>
  );
}
