import React from 'react';
import styles from '@/styles/Programs/Code.module.scss';

import type { AppComponent } from '@/types/utils/programs';

const CODE_HOME_PAGE = 'https://vscode.dev';

const Code: React.FC<AppComponent> = () => (
  <iframe className={styles.code} title="Code" src={CODE_HOME_PAGE} />
);

export default Code;

export const loaderOptions = {
  width: 1100,
  height: 800
};
