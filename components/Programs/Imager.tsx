import React, { useEffect, useRef } from 'react';
import styles from '@/styles/Programs/Imager.module.scss';
import type { AppComponent } from '@/types/utils/programs';

const Imager: React.FC<AppComponent> = ({
  url: appUrl,
  file: { url = '/images/background.png' } = {}
}) => {
  const odfElementRef = useRef<HTMLElement>(null);

  return <img className={styles.imager} src={url} alt={url} />;
};

export default Imager;

export const loaderOptions = {
  width: 700,
  height: 500
};
