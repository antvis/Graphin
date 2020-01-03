import { useState } from 'react';

const MAX_ZOOM = 2;
const MIN_ZOOM = 0.1;
const getNextZoom = (curZoom, isZoomIn, minZoom, maxZoom) => {
  let zoom = curZoom + (isZoomIn ? 0.1 : -0.1);
  if (zoom < minZoom) {
    zoom = minZoom;
  } else if (zoom > maxZoom) {
    zoom = maxZoom;
  }
  return zoom;
};
interface FunHandleZoom {
  (isZoomIn: boolean): number;
}
interface FunUseZoom {
  (initZoom: number): [number, FunHandleZoom];
}

const useZoom: FunUseZoom = (initZoom = 1) => {
  const [zoom, setZoom] = useState(initZoom);
  const handleZoom: FunHandleZoom = isZoomIn => {
    const newZoom = getNextZoom(zoom, isZoomIn, MIN_ZOOM, MAX_ZOOM);
    setZoom(newZoom);
    return newZoom;
  };
  return [zoom, handleZoom];
};

export default useZoom;
