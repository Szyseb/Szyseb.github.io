import {Component,useEffect,useRef,useState} from 'react';
import ColorBends from './reactbits/ColorBends/ColorBends.jsx';
import Iridescence from './reactbits/Iridescence/Iridescence.jsx';
import Noise from './reactbits/Noise/Noise.jsx';
import GradualBlur from './reactbits/GradualBlur/GradualBlur.jsx';
const bends=['#7bc7a6','#6f5fae','#4d7d95'];
const iridescence=['#a8e8ca','#7f76c9','#4f7d94'];
class Guard extends Component{state={failed:false};static getDerivedStateFromError(){return {failed:true};}render(){return this.state.failed?null:this.props.children;}}
function useActive(){const ref=useRef(null);const [active,setActive]=useState(false);const [supported,setSupported]=useState(false);useEffect(()=>{const canvas=document.createElement('canvas');const context=canvas.getContext('webgl2');if(context){setSupported(true);context.getExtension('WEBGL_lose_context')?.loseContext();}let visible=false;const update=()=>setActive(visible&&!document.hidden);const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update();});if(ref.current)observer.observe(ref.current);document.addEventListener('visibilitychange',update);return()=>{observer.disconnect();document.removeEventListener('visibilitychange',update);};},[]);return [ref,active&&supported];}
export function ColorBendsBackground({paused}){
 const [ref,active]=useActive();
 return <div className="background-layer color-bends" ref={ref} aria-hidden="true">{active&&!paused&&<Guard><ColorBends colors={bends} rotation={30} speed={0.15} scale={1.15} frequency={1.15} warpStrength={0.75} mouseInfluence={0.4} parallax={0.25} noise={0.02} transparent/></Guard>}</div>;
}
export function IridescenceBackground({paused}){
 const [ref,active]=useActive();
 return <div className="background-layer iridescence" ref={ref} aria-hidden="true">{active&&!paused&&<Guard><Iridescence color={iridescence} speed={0.35} amplitude={0.75} mouseReact={true} noise={0.08} transparent/></Guard>}</div>;
}
export function NoiseLayer({paused}){
 const [ref,active]=useActive();
 return <div className="background-layer noise-layer" ref={ref} aria-hidden="true">{active&&!paused&&<Guard><Noise patternSize={250} patternScaleX={1} patternScaleY={1} patternRefreshInterval={2} patternAlpha={18}/></Guard>}<GradualBlur target="page" position="bottom" height="25%" strength={2.5} opacity={0.65} exponential={1.5}/></div>;
}
