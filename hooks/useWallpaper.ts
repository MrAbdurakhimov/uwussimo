import WAVES from '@/public/libs/vanta.waves.min';
import GLOBE from '@/public/libs/vanta.globe.min';
import DOTS from '@/public/libs/vanta.dots.min';

import type { WallpaperEffect } from '@/types/components/System/Desktop/Wallpaper';

import * as THREE from 'three';
import Color from 'color';
import { MILLISECONDS_IN_SECOND } from '@/utils/constants';
import { useEffect } from 'react';

const wallpaperColor = (h: number): number =>
  Color(`hsl(${h}, 0%, 0%)`).rgbNumber();

const fps = 20;
const updateIntervalInMilliseconds = MILLISECONDS_IN_SECOND / fps;
const initialColor = 200;
const vantaJsSettings = {
  gyroControls: false,
  mouseControls: true,
  touchControls: true,
  color: 0xffffff, // wallpaperColor(initialColor),
  // shininess: 35,
  size: 0.6,
  // waveHeight: 15,
  // waveSpeed: 0.25,
  backgroundColor: 0x0
  // zoom: 0.95
};

const initRainbowEffect = (wallpaperEffect: WallpaperEffect): (() => void) => {
  let then = Date.now();
  let base = initialColor;
  let colorUpdateAnimationId: number;

  const updateColor = () => {
    const now = Date.now();
    const delta = now - then;

    if (delta > updateIntervalInMilliseconds) {
      base = base > 360 ? 0 : base + 1;
      then = now - (delta % updateIntervalInMilliseconds);
      /* eslint no-param-reassign: off */
      wallpaperEffect.options.color = wallpaperColor(base);
    }

    colorUpdateAnimationId = requestAnimationFrame(updateColor);
  };

  // colorUpdateAnimationId = requestAnimationFrame(updateColor);

  return () => {
    cancelAnimationFrame(colorUpdateAnimationId);
  };
};

const renderWallpaperEffect = ({
  current: renderElement
}: React.RefObject<HTMLElement>): WallpaperEffect => {
  const wallpaperEffect = GLOBE({
    el: renderElement,
    THREE,
    ...vantaJsSettings
  });
  const cancelRainbowEffect = initRainbowEffect(wallpaperEffect);

  wallpaperEffect.onDestroy = cancelRainbowEffect;

  return wallpaperEffect;
};

const useWallpaper = (desktopRef: React.RefObject<HTMLElement>): void => {
  useEffect(() => {
    const wallpaperEffect = renderWallpaperEffect(desktopRef);

    return () => {
      wallpaperEffect?.destroy();
    };
  }, []);
};

export default useWallpaper;
