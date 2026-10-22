import { useState } from 'react';
import { ImagePlus, Radio, Cpu, Braces, Boxes, Waves } from 'lucide-react';
export function Wave({ id='wave', compact=false }) {
 const points = Array.from({length:230},(_,i)=>`${i?'L':'M'}${i*2.4},${90+Math.sin(i*.11)*Math.sin(i*.023)*45+Math.sin(i*.51)*3}`).join(' ');
 return <svg viewBox="0 0 550 180" className={`wave ${compact?'compact':''}`} fill="none" aria-hidden="true"><defs><linearGradient id={id}><stop stopColor="#97ebc4"/><stop offset=".55" stopColor="#a7bad7"/><stop offset="1" stopColor="#afa0f1"/></linearGradient></defs>{[30,60,90,120,150].map(y=><path key={y} d={`M0 ${y}H550`} stroke="currentColor" opacity=".08"/>)}{[50,100,150,200,250,300,350,400,450,500].map(x=><path key={x} d={`M${x} 0V180`} stroke="currentColor" opacity=".08"/>)}<path d={points} stroke={`url(#${id})`} strokeWidth="9" opacity=".13"/><path d={points} stroke={`url(#${id})`} strokeWidth="1.8"/><path d="M0 0V180" stroke="#b9f0d6" opacity=".3" className="wave-scan"/></svg>;
}
export function Orbital() {
 return <div className="orbital" aria-hidden="true"><div className="orbital-halo"/><div className="orbital-axis"/><div className="orbit a"><span/></div><div className="orbit b"><span/></div><div className="orbit c"><span/></div><div className="orbital-core"><Waves size={45}/><span>SIGNAL → SYSTEM</span></div><span className="orbital-note top">ANALOG INPUT</span><span className="orbital-note bottom">DIGITAL POSSIBILITY</span><span className="orbital-coordinate">54° N / 18° E · GDAŃSK</span></div>;
}
export function ProjectVisual({ type, uid }) {
 if(type==='radio') return <div className="radio-art"><div className="art-readout"><span><i/> PCSK225 / RECEIVER</span><span>LONGWAVE</span></div><Wave id={`signal-${uid}`}/><div className="art-readout bottom"><span>SYGNAŁ → DANE → CZAS</span><span>WIZUALIZACJA POGLĄDOWA</span></div></div>;
 if(type==='network') return <div className="network-art"><svg viewBox="0 0 400 160" fill="none" aria-hidden="true"><path d="M60 110L150 45L250 115L345 50M60 110L250 115M150 45L345 50" stroke="#82b6d4" strokeOpacity=".3" strokeDasharray="5 6"/>{[[60,110],[150,45],[250,115],[345,50]].map(([x,y],i)=><g key={x}><circle cx={x} cy={y} r="24" stroke="#84b4da" strokeOpacity=".15"/><circle cx={x} cy={y} r="14" fill="#122833" stroke="#7aa3ba" strokeOpacity=".5"/><circle cx={x} cy={y} r="3" fill="#a0d8e1"/><text x={x} y={y+40} textAnchor="middle" fill="#7c9dae" fontSize="8">{['BLE','LoRa','LoRa','GSM'][i]}</text></g>)}</svg><span className="visual-stamp">CONNECTED / BY DESIGN</span></div>;
 if(type==='layout') return <div className="layout-art" aria-hidden="true"><div className="layout-plate">{Array.from({length:8},(_,i)=><span key={i} style={{'--i':i}}/>)}<div className="layout-center"><Cpu size={30}/><strong>74 · 138</strong><small>MAGIC VLSI</small></div></div><span className="visual-stamp">PHYSICAL / LOGIC</span></div>;
 if(type==='segments') return <div className="segments-art" aria-hidden="true">{['a','b','c'].map((x,i)=><div className={`seven-segment digit-${i}`} key={x}>{Array.from({length:7},(_,n)=><i key={n} className={`seg s${n}`}/>)}</div>)}<span className="visual-stamp">SCHEMAT → UKŁAD → WSKAZANIE</span></div>;
 return <div className="game-art" aria-hidden="true"><div className="game-window"><div className="window-header"><span/><span/><span/><small>Perfect Circuit Builder</small></div><div className="game-circuit"><span className="circuit-wire horizontal"/><span className="circuit-wire vertical"/><span className="circuit-resistor"/><span className="circuit-battery">+<br/>−</span><span className="circuit-lamp"/></div><div className="game-caption"><Braces size={12}/> JAVA / EDUCATIONAL GAME</div></div></div>;
}
export function MediaSlot({ src='', alt, label, hint, className='' }) {
 const [failed,setFailed] = useState(false);
 return <figure className={`media-slot ${className}`}>
 {src && !failed ? <img src={src} alt={alt} loading="lazy" decoding="async" onError={()=>setFailed(true)}/> : <div className="media-placeholder"><div className="media-cross top-left"/><div className="media-cross bottom-right"/><ImagePlus size={25} strokeWidth={1}/><span>{label}</span><small>{hint || 'Miejsce na zdjęcie lub grafikę'}</small><em>PHOTO / DOCUMENTATION</em></div>}
 {src&&!failed&&<figcaption>{label}</figcaption>}
 </figure>;
}
export const workshopIcons = {cpu:Cpu,radio:Radio,code:Braces,box:Boxes};
