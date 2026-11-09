import {useEffect, useRef, useState} from 'react';
import {Moon, Sun} from 'lucide-react';
import {name} from './content.js';

const expansionDistance = 136;

function Brand() {
  const wordmark = useRef(null);
  const [firstName, lastName] = name.split(' ');

  useEffect(() => {
    const mark = wordmark.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    function updateProgress() {
      frame = 0;
      const fraction = Math.min(1, Math.max(0, window.scrollY / expansionDistance));
      const progress = reducedMotion.matches ? Number(fraction === 1) : fraction;
      mark.style.setProperty('--brand-progress', progress);
    }

    function scheduleProgress() {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    }

    const runs = mark.querySelectorAll('.brand-reveal > span');
    const measure = new ResizeObserver(entries => {
      for (const {target, contentRect} of entries) {
        target.parentElement.style.setProperty('--run-width', `${contentRect.width}px`);
      }
    });

    for (const run of runs) {
      run.parentElement.style.setProperty('--run-width', `${run.getBoundingClientRect().width}px`);
      measure.observe(run);
    }

    updateProgress();
    window.addEventListener('scroll', scheduleProgress, {passive: true});
    reducedMotion.addEventListener('change', scheduleProgress);

    return () => {
      measure.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleProgress);
      reducedMotion.removeEventListener('change', scheduleProgress);
    };
  }, []);

  return (
    <a className="brand" href="#start" aria-label={name}>
      <span className="brand-wordmark" ref={wordmark} aria-hidden="true">
        <span>{firstName[0]}</span>
        <span className="brand-reveal"><span>{firstName.slice(1)}&nbsp;</span></span>
        <span>{lastName[0]}</span>
        <span className="brand-reveal"><span>{lastName.slice(1)}</span></span>
        <span className="brand-dot">.</span>
      </span>
    </a>
  );
}

export default function Header() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme);
  const isLight = theme === 'light';
  const toggleLabel = isLight ? 'Włącz ciemny motyw' : 'Włącz jasny motyw';

  function toggleTheme() {
    const nextTheme = isLight ? 'dark' : 'light';
    document.documentElement.dataset.theme = nextTheme;
    const themeColor = document.getElementById('theme-color');
    themeColor.content = themeColor.dataset[nextTheme];
    setTheme(nextTheme);
    try {
      localStorage.setItem('portfolio-theme', nextTheme);
    } catch {
      // The current tab still uses the selected theme when storage is unavailable.
    }
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={toggleLabel} title={toggleLabel}>
          {isLight ? <Moon size={19} aria-hidden="true" /> : <Sun size={20} aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
