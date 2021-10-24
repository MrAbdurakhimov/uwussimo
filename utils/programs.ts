import dynamic from 'next/dynamic';
import { extname } from 'path';
import type { AppFile, AppLoader, AppLoaders } from '@/types/utils/programs';
import { isValidUrl } from '@/utils/url';
import { loaderOptions as genematorLoaderOptions } from '@/components/Programs/Genemator';
import { loaderOptions as codeLoaderOptions } from '@/components/Programs/Code';
import { loaderOptions as telegramLoaderOptions } from '@/components/Programs/Telegram';
import { loaderOptions as explorerLoaderOptions } from '@/components/Programs/Explorer';
import { loaderOptions as webampLoaderOptions } from '@/components/Programs/WebODF';
import { loaderOptions as winampLoaderOptions } from '@/components/Programs/Winamp';
import { ROOT_DIRECTORY } from '@/utils/constants';

const Genemator = dynamic(import('@/components/Programs/Genemator'));
const Code = dynamic(import('@/components/Programs/Code'));
const Telegram = dynamic(import('@/components/Programs/Telegram'));
const Explorer = dynamic(import('@/components/Programs/Explorer'));
const WebODF = dynamic(import('@/components/Programs/WebODF'));
const Winamp = dynamic(import('@/components/Programs/Winamp'));

const appLoaders: AppLoaders = {
  genemator: {
    loader: Genemator,
    loaderOptions: genematorLoaderOptions
  },
  code: {
    loader: Code,
    loaderOptions: codeLoaderOptions
  },
  telegram: {
    loader: Telegram,
    loaderOptions: telegramLoaderOptions
  },
  explorer: {
    loader: Explorer,
    loaderOptions: explorerLoaderOptions
  },
  webodf: {
    loader: WebODF,
    loaderOptions: webampLoaderOptions
  },
  winamp: {
    loader: Winamp,
    loaderOptions: winampLoaderOptions
  }
};

export const getAppNameByExtension = (ext: string): string => {
  switch (ext) {
    case '.jsdos':
    case '.zip':
      return 'DOS';
    case '.odt':
      return 'WebODF';
    case '.mp3':
    case '.m3u':
    case '.wsz':
      return 'Winamp';
    default:
      return '';
  }
};

const appLoaderByName = (name: string): AppLoader | undefined =>
  appLoaders[name];

const appLoaderByFileType = (
  appFile: AppFile,
  ext?: string,
  searchParams?: URLSearchParams
): AppLoader | undefined => {
  const extName = ext || extname(appFile.url);

  if (!extName) {
    return {
      ...appLoaders.explorer,
      loadedAppOptions: {
        file: appFile
      }
    };
  }

  const appLoader = appLoaders[getAppNameByExtension(extName).toLowerCase()];

  if (appLoader) {
    return {
      ...appLoader,
      loadedAppOptions: {
        file: appFile,
        args: searchParams
      }
    };
  }

  return undefined;
};

export const appLoader = (appFile: AppFile): AppLoader | undefined => {
  const { ext, url } = appFile;

  if (isValidUrl(url)) {
    const { pathname, searchParams } = new URL(url);

    return pathname === ROOT_DIRECTORY
      ? appLoaderByName(searchParams.get('app') || '')
      : appLoaderByFileType(appFile, ext || extname(pathname), searchParams);
  }

  return appLoaderByFileType(appFile);
};
