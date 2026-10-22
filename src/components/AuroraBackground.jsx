import { Component, useEffect, useRef, useState } from 'react';
import Aurora from './reactbits/Aurora.jsx';
class ShaderBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}
const colors = ['#8fe9bf', '#8b7cdf', '#74aab3'];
export default function AuroraBackground({ paused }) {
  const host = useRef(null);
  const [visible, setVisible] = useState(false);
  const [capable, setCapable] = useState(false);
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    if (gl) { setCapable(true); gl.getExtension('WEBGL_lose_context')?.loseContext(); }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (host.current) observer.observe(host.current);
    const visibility = () => setVisible(!document.hidden && !!host.current && host.current.getBoundingClientRect().bottom > 0);
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  return <div ref={host} className="aurora-host" aria-hidden="true">{!paused && visible && capable && <ShaderBoundary><Aurora colorStops={colors} blend={0.65} amplitude={0.9} speed={0.35}/></ShaderBoundary>}</div>;
}
