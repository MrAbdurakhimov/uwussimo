import Img from 'react-optimized-image';
import { basename } from 'path';
import { memo } from 'react';
import DoomImg from '@/public/icons/games/doom.png';
import ExplorerImg from '@/public/icons/programs/explorer.png';
import JazzImg from '@/public/icons/games/jazz.png';
import JsFileImg from '@/public/icons/files/js.svg';
import KeenImg from '@/public/icons/games/keen.png';
import UnknownFileImg from '@/public/icons/files/unknown.svg';
import WebODFImg from '@/public/icons/programs/webodf.png';
import WinampImg from '@/public/icons/programs/winamp.png';

type IconProps = { height: number; src: string; width: number };

const Icon: React.FC<IconProps> = ({ src, width, height }) => {
  const size = { width, height };

  switch (src) {
    case '/icons/files/js.svg':
      return <Img url {...size} src={JsFileImg} alt="JavaScript" />;
    case '/icons/files/unknown.svg':
      return <Img url {...size} src={UnknownFileImg} alt="Unknown" />;
    case '/icons/games/keen.png':
      return <Img {...size} src={KeenImg} alt="Commander Keen" type="icon" />;
    case '/icons/games/doom.png':
      return <Img {...size} src={DoomImg} alt="Doom" type="icon" />;
    case '/icons/games/jazz.png':
      return <Img {...size} src={JazzImg} alt="Jazz Jackrabbit" type="icon" />;
    case '/icons/programs/explorer.png':
      return <Img {...size} src={ExplorerImg} alt="Explorer" type="icon" />;
    case '/icons/programs/webodf.png':
      return <Img {...size} src={WebODFImg} alt="WebODF" type="icon" />;
    case '/icons/programs/winamp.png':
      return <Img {...size} src={WinampImg} alt="Winamp" type="icon" />;

    default:
      return <img {...size} src={src} alt={basename(src)} />;
  }
};

export default memo(Icon);
