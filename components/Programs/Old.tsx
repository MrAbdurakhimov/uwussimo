import styles from '@/styles/Programs/Old.module.scss';

import type { AppComponent } from '@/types/utils/programs';

const OLD_HOME_PAGE = 'https://old.bsba.uz/';

const Old: React.FC<AppComponent> = () => (
  <iframe className={styles.blog} title="Old Website" src={OLD_HOME_PAGE} />
);

export default Old;

export const loaderOptions = {
  width: 1000,
  height: 750
};
