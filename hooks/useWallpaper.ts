import * as THREE from 'three';
import Color from 'color';
import { useEffect } from 'react';
import FOG from '@/public/libs/vanta.fog.min';

import type { WallpaperEffect } from '@/types/components/System/Desktop/Wallpaper';

import { MILLISECONDS_IN_SECOND } from '@/utils/constants';

const wallpaperColor = (h: number): number =>
  Color(`hsl(${h}, 0%, 0%)`).rgbNumber();

const fps = 20;
const updateIntervalInMilliseconds = MILLISECONDS_IN_SECOND / fps;
const initialColor = 200;
const vantaJsSettings = {
  gyroControls: false,
  mouseControls: true,
  touchControls: true,
  highlightColor: 0xffffff,
  midtoneColor: 0xffffff,
  lowlightColor: 0x4e2ceb,
  speed: 2
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  const wallpaperEffect = FOG({
    el: renderElement,
    THREE,
    ...vantaJsSettings
  });
  wallpaperEffect.onDestroy = initRainbowEffect(wallpaperEffect);

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
