import { GridItemType } from "@/types/GridItemType";
import styles from "./App.module.css";
import { items } from "@/data/items";
import b7Svg from "../../svgs/b7.svg";

type Props = {
  item: GridItemType;
  onClick: () => void;
};

export const GridItem = ({ item, onClick }: Props) => {
  return (
    <div
      className={styles.container}
      style={{
        backgroundColor:
          item.permanentShown || item.shown ? "#1550FF" : "#E2E3E3",
      }}
      onClick={onClick}
    >
      {/* {item.item != null && <img src={items[item.item].icon.src} />} */}
      {item.permanentShown === false && item.shown === false && (
        <img
          className={styles.icon}
          alt=""
          src={b7Svg.src}
          style={{ opacity: "0.1" }}
          onClick={onClick}
        />
      )}
      {(item.permanentShown || item.shown) && item.item !== null && (
        <img src={items[item.item].icon.src} className={styles.icon} />
      )}
    </div>
  );
};
