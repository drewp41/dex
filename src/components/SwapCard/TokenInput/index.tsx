import styles from '../index.module.scss';

export default function TokenInput() {
  return (
    <div className={styles.inputGroup}>
      <input className={styles.input} type='number' />
      <button className={styles.tokenBtn}>ETH</button>
    </div>
  );
}
