import Image from 'next/image'
import SwapIcon from '@/assets/images/swap-icon.svg'
import styles from './index.module.scss'
import ConnectWallet from '@/components/ConnectWallet'

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo}>
        <Image src={SwapIcon} alt="Swap Icon" width={36} height={36} priority />
        <div className={styles.text}>Swap Aggregator</div>
      </div>
      <ConnectWallet />
    </nav>
  )
}
