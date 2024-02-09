import styles from "./App.module.css";

type Props = {
  label: string;
  value: string;
};

export const InfoItem = ({ label, value }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};
