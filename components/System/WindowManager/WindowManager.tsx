import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useContext } from 'react';
import styles from '@/styles/System/WindowManager/WindowManager.module.scss';

import useIFrameFocuser from '@/hooks/useIFrameFocuser';
import { ProcessContext } from '@/contexts/ProcessManager';

const ProcessWindow = dynamic(
  import('@/components/System/WindowManager/ProcessWindow')
);

const WindowManager: React.FC = () => {
  const { processes } = useContext(ProcessContext);

  useIFrameFocuser();

  return (
    <div className={styles.windows}>
      <AnimatePresence>
        {processes.map((process) => (
          <ProcessWindow key={process.id} {...process} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WindowManager;
