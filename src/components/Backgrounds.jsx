import {Component, useEffect, useRef, useState} from 'react';
import ColorBends from './reactbits/ColorBends/ColorBends.jsx';
import Iridescence from './reactbits/Iridescence/Iridescence.jsx';
import GradualBlur from './reactbits/GradualBlur/GradualBlur.jsx';

const bends = ['#18b78d', '#5f5ad9', '#2b7fd6'];
const iridescenceColor = [0.1, 0.72, 0.58];

class Guard extends Component {
  state = {failed: false};

  static getDerivedStateFromError() {
    return {failed: true};
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function useActive() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2');
    if (context) {
      setSupported(true);
      context.getExtension('WEBGL_lose_context')?.loseContext();
    }

    let visible = false;
    const update = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });

    if (ref.current) observer.observe(ref.current);
    document.addEventListener('visibilitychange', update);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return [ref, active && supported];
}

export function ColorBendsBackground({paused}) {
  const [ref, active] = useActive();

  return (
    <div className="background-layer color-bends" ref={ref} aria-hidden="true">
      {active && !paused && (
        <Guard>
          <ColorBends
            colors={bends}
            rotation={36}
            speed={0.12}
            scale={1.08}
            frequency={1.05}
            warpStrength={0.72}
            mouseInfluence={0.35}
            parallax={0.18}
            noise={0.015}
            transparent
          />
        </Guard>
      )}
      <GradualBlur target="parent" position="bottom" layers={7} height="96px" zIndex={1} strength={1.9} opacity={0.78} />
    </div>
  );
}

export function IridescenceBackground({paused}) {
  const [ref, active] = useActive();

  return (
    <div className="background-layer iridescence" ref={ref} aria-hidden="true">
      {active && !paused && (
        <Guard>
          <Iridescence
            color={iridescenceColor}
            speed={0.2}
            amplitude={0.58}
            scale={1.2}
            detail={8}
            warp={0.8}
            mouseReact
            brightness={1.2}
            contrast={1.05}
            grain={0.16}
            resolution={0.75}
            paused={paused}
          />
        </Guard>
      )}
      <GradualBlur target="parent" position="top" layers={6} height="84px" zIndex={1} strength={1.6} opacity={0.72} />
    </div>
  );
}
