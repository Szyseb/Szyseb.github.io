import {access, mkdir, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = path.join(root, 'src/components/reactbits');
const publicDir = path.join(root, 'public');
const license = path.join(publicDir, 'REACT-BITS-LICENSE.txt');

const components = {
  GooeyNav: 'Components',
  WarpText: 'TextAnimations',
  VariableProximity: 'TextAnimations',
  BlurText: 'TextAnimations',
  SpotlightCard: 'Components',
  Magnet: 'Animations',
  AccordionGallery: 'Components',
  ColorBends: 'Backgrounds',
  Iridescence: 'Backgrounds',
  Noise: 'Animations',
  GradualBlur: 'Animations'
};

const base = 'https://raw.githubusercontent.com/DavidHDev/react-bits/main/';
const updateRequested = process.argv.includes('--update');

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function validateCommittedAssets() {
  const missing = [];

  for (const name of Object.keys(components)) {
    const dir = path.join(source, name);
    const jsx = path.join(dir, `${name}.jsx`);
    const meta = path.join(dir, 'SOURCE.json');
    if (!(await exists(dir))) missing.push(`${name}/`);
    if (!(await exists(jsx))) missing.push(`${name}/${name}.jsx`);
    if (!(await exists(meta))) missing.push(`${name}/SOURCE.json`);
  }

  if (!(await exists(license))) missing.push('public/REACT-BITS-LICENSE.txt');

  if (missing.length) {
    throw new Error(
      `Brakujące zasoby React Bits: ${missing.join(', ')}. ` +
        'Uruchom ręcznie: npm run reactbits:update i zacommituj pobrane pliki.'
    );
  }

  console.log('React Bits: zweryfikowano lokalne zasoby (bez pobierania z sieci).');
}

async function get(url) {
  const response = await fetch(url, {signal: AbortSignal.timeout(30000)});
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
  return response.text();
}

async function updateReactBits() {
  await mkdir(source, {recursive: true});
  await mkdir(publicDir, {recursive: true});

  if (!(await exists(license))) {
    await writeFile(license, await get(base + 'LICENSE.md'));
  }

  const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
  const known = new Set(Object.keys(packageJson.dependencies || {}));

  for (const [name, folder] of Object.entries(components)) {
    const output = path.join(source, name);
    const entry = path.join(output, `${name}.jsx`);

    let files;
    try {
      const data = JSON.parse(await get(`https://reactbits.dev/r/${name}-JS-CSS.json`));
      const missingDeps = (data.dependencies || []).filter(dep => !known.has(dep.replace(/@[^/]+$/, '')) && !known.has(dep));
      if (missingDeps.length) throw new Error(`DEPENDENCIES:${missingDeps.join(' ')}`);
      files = (data.files || []).filter(file => /\.(jsx|js|css)$/.test(file.path || file.name || ''));
      if (!files.some(file => (file.path || file.name || '').endsWith(`${name}.jsx`))) throw new Error('Missing JSX entry');
      if (files.some(file => typeof file.content !== 'string')) throw new Error('Missing content');
    } catch (error) {
      if (error.message.startsWith('DEPENDENCIES:')) {
        throw new Error(`Najpierw doinstaluj zależności React Bits: npm install ${error.message.slice(13)}`);
      }

      let jsx;
      let usedFolder;
      const folders = name === 'JellyRadio' ? ['Micro', 'MicroInteractions'] : [folder];
      for (const candidate of folders) {
        try {
          jsx = await get(`${base}src/content/${candidate}/${name}/${name}.jsx`);
          usedFolder = candidate;
          break;
        } catch {
          // spróbuj kolejny katalog
        }
      }

      if (!jsx) {
        throw new Error(`Nie udało się pobrać ${name} z oficjalnych źródeł.`);
      }

      files = [{path: `${name}.jsx`, content: jsx}];
      const cssBase = `${base}src/content/${usedFolder}/${name}/`;
      for (const match of jsx.matchAll(/import\s+['"]\.\/([^'"]+\.css)['"]/g)) {
        files.push({path: match[1], content: await get(cssBase + match[1])});
      }
    }

    await mkdir(output, {recursive: true});
    for (const file of files) {
      const filename = path.basename(file.path || file.name);
      if (!/^[A-Za-z0-9_.-]+\.(jsx|js|css)$/.test(filename)) throw new Error('Nieoczekiwana nazwa pliku źródłowego');
      await writeFile(path.join(output, filename), file.content);
    }

    await writeFile(
      path.join(output, 'SOURCE.json'),
      JSON.stringify({registry: `https://reactbits.dev/r/${name}-JS-CSS.json`}, null, 2)
    );

    if (!(await exists(entry))) {
      throw new Error(`Aktualizacja ${name} zakończona błędem: brak pliku ${name}.jsx`);
    }

    console.log(`React Bits updated: ${name}`);
  }
}

if (updateRequested) {
  await updateReactBits();
  await validateCommittedAssets();
} else {
  await validateCommittedAssets();
}
