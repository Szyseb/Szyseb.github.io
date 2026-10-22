// Copies the official React Bits component from its public registry.
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createHash } from 'node:crypto';
const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, 'src/components/reactbits');
const registryURL = 'https://reactbits.dev/r/Aurora-JS-CSS.json';
const licenseURL = 'https://raw.githubusercontent.com/DavidHDev/react-bits/main/LICENSE.md';
async function exists(file) { try { await access(file); return true; } catch { return false; } }
async function get(url) {
 const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
 if (!response.ok) throw new Error(`${response.status}: ${url}`);
 return response.text();
}
const jsxPath = path.join(out,'Aurora.jsx');
const cssPath = path.join(out,'Aurora.css');
const licensePath = path.join(root,'public/REACT-BITS-LICENSE.txt');
if (await exists(jsxPath) && await exists(cssPath) && await exists(licensePath)) {
 console.log('React Bits Aurora: local source ready.');
} else {
 try {
  const [raw, license] = await Promise.all([get(registryURL), get(licenseURL)]);
  const registry = JSON.parse(raw);
  if (!Array.isArray(registry.files)) throw new Error('Unexpected React Bits registry format.');
  const files = registry.files.filter(item => /Aurora\.(jsx|css)$/.test(item.path || item.name || ''));
  if (!files.some(item=>/Aurora\.jsx$/.test(item.path||item.name||'')) || !files.some(item=>/Aurora\.css$/.test(item.path||item.name||''))) throw new Error('Registry must include Aurora.jsx and Aurora.css.');
  if (!license.includes('Copyright') || !license.includes('Commons Clause')) throw new Error('Unexpected React Bits license response.');
  await mkdir(out,{recursive:true});
  await mkdir(path.join(root,'public'),{recursive:true});
  for (const item of files) {
   if (typeof item.content !== 'string' || !item.content.trim()) throw new Error('Registry file content is empty.');
   const name = /Aurora\.jsx$/.test(item.path||item.name||'') ? 'Aurora.jsx' : 'Aurora.css';
   await writeFile(path.join(out,name),item.content,'utf8');
  }
  await writeFile(licensePath,license,'utf8');
  await writeFile(path.join(out,'SOURCE.json'),JSON.stringify({source:registryURL,license:licenseURL,sha256:createHash('sha256').update(raw).digest('hex')},null,2)+'\n');
  console.log('Installed official React Bits Aurora + original license. Commit these files to keep the component version fixed.');
 } catch (error) {
  console.error('Could not install React Bits Aurora:',error.message);
  console.error('Check your internet connection and run: node scripts/reactbits.mjs');
  process.exitCode=1;
 }
}
