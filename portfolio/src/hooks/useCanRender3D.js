import { useEffect, useState } from 'react';

// Enables the 3D scene only on capable, non-mobile devices with WebGL support.
export function useCanRender3D() {
  const [canRender, setCanRender] = useState(false);
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const lowPower = (navigator.hardwareConcurrency || 4) <= 2;
    let hasWebGL = false;
    try {
      const canvas = document.createElement('canvas');
      hasWebGL = !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
      hasWebGL = false;
    }
    setCanRender(hasWebGL && !isMobile && !lowPower);
  }, []);
  return canRender;
}
