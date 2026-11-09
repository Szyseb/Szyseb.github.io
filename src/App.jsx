import {useEffect, useState} from 'react';
import {ArrowDown, ArrowUp, ArrowUpRight, Check, Copy, Plus} from 'lucide-react';
import {email, name, projects, toolGroups} from './content.js';
import monogram from './monogram.svg';

const previousRoutes = new Map([
  ['/', 'start'],
  ['/projekty', 'projekty'],
  ['/projekty/pcsk225', 'pcsk225'],
  ['/projekty/lokalizacja', 'wireless'],
  ['/projekty/sn74138', 'layout'],
  ['/projekty/kicad-7seg', 'display'],
  ['/projekty/perfect-circuit-builder', 'game'],
  ['/warsztat', 'warsztat'],
  ['/kontakt', 'kontakt'],
]);

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
        <p>Masz pytanie o któryś projekt? Napisz do mnie.</p>
      </div>
      <div className="contact-actions">
        <a className="email-link" href={`mailto:${email}`}>{email}<ArrowUpRight size={19} aria-hidden="true" /></a>
        <button className="copy-button" type="button" onClick={copyEmail}>
          {copyStatus === 'copied' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          {copyStatus === 'copied' ? 'Skopiowano' : 'Kopiuj adres'}
        </button>
        <p className={copyStatus === 'failed' ? 'copy-note' : 'sr-only'} role="status">
          {copyStatus === 'copied' && 'Adres e-mail skopiowany.'}
          {copyStatus === 'failed' && 'Skopiuj adres ręcznie lub otwórz go w poczcie.'}
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
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#start">
            <img className="brand-mark" src={monogram} alt="" width="38" height="38" />
            <span className="brand-name">{name}</span>
          </a>
          <nav className="navigation" aria-label="Nawigacja główna">
            <a href="#projekty">Projekty</a>
            <a href="#warsztat">Warsztat</a>
            <a href="#kontakt">Kontakt<ArrowUpRight size={14} aria-hidden="true" /></a>
          </nav>
        </div>
      </header>
      <main className="container" id="main" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy" id="o-mnie">
            <h1 id="hero-title">Elektronika w praktyce<span>.</span></h1>
            <p className="hero-description">Nazywam się Sebastian Szyszło. Projektuję układy elektroniczne i piszę oprogramowanie. Zajmuję się też odbiorem i przetwarzaniem sygnałów radiowych.</p>
            <a className="primary-link" href="#projekty">Zobacz projekty <ArrowDown size={18} aria-hidden="true" /></a>
          </div>
        </section>
        <section className="projects" id="projekty" aria-labelledby="projects-title">
          <span id="galeria" className="anchor-alias" aria-hidden="true" />
          <div className="section-heading">
            <h2 id="projects-title">Projekty</h2>
            <p className="technical-label">{String(projects.length).padStart(2, '0')} realizacji</p>
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
      <footer className="container footer">
        <span>{name}</span>
        <a href="#start">Do góry <ArrowUp size={16} aria-hidden="true" /></a>
      </footer>
    </>
  );
}
