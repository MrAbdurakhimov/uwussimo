import Head from 'next/head';
import { memo, useEffect } from 'react';
import { lockDocumentTitle } from '@/utils/elements';

const Metadata: React.FC = () => {
  useEffect(lockDocumentTitle, []);

  return (
    <Head>
      <title>UwU - Robinson&lsquo;s Desktop</title>
      <meta
        name="description"
        content="Website of UwUssimmo Robinson where he tries to show his works"
      />
      <meta property="og:site_name" content="UwUssimo's" />
      <link
        rel="preload"
        href="fonts/segoeui.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="fonts/segmdl2.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="fonts/SF-Regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </Head>
  );
};

export default memo(Metadata);
