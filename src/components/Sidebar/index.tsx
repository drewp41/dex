import Image from 'next/image';
import SwapIcon from '@/assets/images/swap-icon.svg';
import styles from './index.module.scss';

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <Image className={styles.logo} src={SwapIcon} alt="Swap Icon" width={48} height={48} priority />
    </nav>
  );
}
