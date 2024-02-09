import styles from "./App.module.css";

type Props = {
  label: string;
  icon?: HTMLSourceElement;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

export const Button = ({ label, icon, onClick }: Props) => {
  return (
    <div className={styles.container} onClick={onClick}>
      {icon && (
        <div className={styles.iconArea}>
          <img src={icon.src} alt="" className={styles.icon} />
        </div>
      )}
      <p className={styles.label}>{label}</p>
    </div>
  );
};
