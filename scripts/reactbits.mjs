import {mkdir,writeFile,readFile,access} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const components={"GooeyNav": "Components", "WarpText": "TextAnimations", "VariableProximity": "TextAnimations", "BlurText": "TextAnimations", "SpotlightCard": "Components", "Magnet": "Animations", "AccordionGallery": "Components", "ColorBends": "Backgrounds", "Iridescence": "Backgrounds", "Noise": "Animations", "GradualBlur": "Animations"};
const base='https://raw.githubusercontent.com/DavidHDev/react-bits/main/';
const source=path.join(root,'src/components/reactbits');
const license=path.join(root,'public/REACT-BITS-LICENSE.txt');
const known=new Set(Object.keys(JSON.parse(await readFile(path.join(root,'package.json'),'utf8')).dependencies));
async function exists(file){try{await access(file);return true;}catch{return false;}}
async function get(url){const response=await fetch(url,{signal:AbortSignal.timeout(30000)});if(!response.ok)throw Error(`HTTP ${response.status}: ${url}`);return response.text();}
await mkdir(source,{recursive:true});await mkdir(path.join(root,'public'),{recursive:true});
if(!await exists(license))await writeFile(license,await get(base+'LICENSE.md'));
for(const [name,folder] of Object.entries(components)){
 const output=path.join(source,name);const entry=path.join(output,name+'.jsx');
 if(await exists(entry))continue;
 let files;
 try{
  const data=JSON.parse(await get(`https://reactbits.dev/r/${name}-JS-CSS.json`));
  const missing=(data.dependencies||[]).filter(dep=>!known.has(dep.replace(/@[^/]+$/,''))&&!known.has(dep));
  if(missing.length)throw Error('DEPENDENCIES:'+missing.join(' '));
  files=(data.files||[]).filter(file=>/\.(jsx|js|css)$/.test(file.path||file.name||''));
  if(!files.some(file=>(file.path||file.name||'').endsWith(name+'.jsx')))throw Error('Missing JSX entry');
  if(files.some(file=>typeof file.content!=='string'))throw Error('Missing content');
 }catch(error){
  if(error.message.startsWith('DEPENDENCIES:'))throw Error(`Install React Bits dependencies first: npm install ${error.message.slice(13)}`);
  let jsx,lastError,usedFolder;
  const folders=name==='JellyRadio'?['Micro','MicroInteractions']:[folder];
  for(const candidate of folders){try{jsx=await get(`${base}src/content/${candidate}/${name}/${name}.jsx`);lastError=null;usedFolder=candidate;break;}catch(e){lastError=e;}}
  if(!jsx)throw Error(`Could not obtain official ${name}. Registry and GitHub source unavailable. ${lastError?.message||''}`);
  files=[{path:name+'.jsx',content:jsx}];
  const cssBase=`${base}src/content/${usedFolder}/${name}/`;
  for(const match of jsx.matchAll(/import\s+['"]\.\/([^'"]+\.css)['"]/g))files.push({path:match[1],content:await get(cssBase+match[1])});
 }
 await mkdir(output,{recursive:true});
 for(const file of files){const filename=path.basename(file.path||file.name);if(!/^[A-Za-z0-9_.-]+\.(jsx|js|css)$/.test(filename))throw Error('Unexpected source filename');await writeFile(path.join(output,filename),file.content);}
 await writeFile(path.join(output,'SOURCE.json'),JSON.stringify({registry:`https://reactbits.dev/r/${name}-JS-CSS.json`},null,2));
 console.log('React Bits installed: '+name);
}
