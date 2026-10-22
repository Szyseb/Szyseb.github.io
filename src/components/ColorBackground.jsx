import {Component,useEffect,useRef,useState} from 'react';
import ColorBends from './reactbits/ColorBends/ColorBends.jsx';
const colors=['#78c4ac','#7161ab','#46758d'];
class Guard extends Component{state={failed:false};static getDerivedStateFromError(){return {failed:true};}render(){return this.state.failed?null:this.props.children;}}
export default function ColorBackground({paused}){
 const element=useRef(null);const [active,setActive]=useState(false),[supported,setSupported]=useState(false);
 useEffect(()=>{const canvas=document.createElement('canvas');const context=canvas.getContext('webgl2');if(context){setSupported(true);context.getExtension('WEBGL_lose_context')?.loseContext();}let visible=false;const update=()=>setActive(visible&&!document.hidden);const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update();});if(element.current)observer.observe(element.current);document.addEventListener('visibilitychange',update);return()=>{observer.disconnect();document.removeEventListener('visibilitychange',update);};},[]);
 return <div className="color-background" ref={element} aria-hidden="true">{active&&supported&&!paused&&<Guard><ColorBends colors={colors} rotation={35} speed={0.16} scale={1.1} frequency={1.2} warpStrength={0.7} mouseInfluence={0.4} parallax={0.25} noise={0.025} transparent/></Guard>}</div>;
}
