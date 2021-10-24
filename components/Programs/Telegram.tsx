import styles from '@/styles/Programs/Telegram.module.scss';

import type { AppComponent } from '@/types/utils/programs';

const TELEGRAM_HOME_PAGE = 'https://evgeny-nadymov.github.io/telegram-react/';

const Telegram: React.FC<AppComponent> = () => (
  <iframe
    className={styles.telegram}
    title="Telegram"
    src={TELEGRAM_HOME_PAGE}
  />
);

export default Telegram;

export const loaderOptions = {
  width: 1100,
  height: 800
};
