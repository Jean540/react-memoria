"use client";
import styles from "./App.module.css";
import logoImage from "../assets/devmemory_logo.png";
import { InfoItem } from "@/components/infoItem";
import { Button } from "@/components/Button";
import restartIcon from "../svgs/restart.svg";
import { items } from "@/data/items";
import { useEffect, useState } from "react";
import { GridItemType } from "@/types/GridItemType";
import { GridItem } from "@/components/GridItem";
import { formatTimeElapsed } from "@/helpers/formatTimeElapsed";

const Page = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  //verifica se os abertos são iguais
  useEffect(() => {
    if (shownCount == 2) {
      let opened = gridItems.filter((e) => e.shown == true);
      if (opened.length == 2) {
        //v1 se ambos forem iguais , fazer com que os dois fiquem permanente
        let tmpGrid = [...gridItems];
        if (opened[0].item == opened[1].item) {
          tmpGrid.forEach((e) => {
            if (e.shown) {
              e.permanentShown = true;
              e.shown = false;
            }
          });
        } else {
          //v2 - Se eles não forem iguais
          setTimeout(() => {
            tmpGrid.forEach((e) => (e.shown = false));
          }, 500);
        }
        setGridItems(tmpGrid);
        setShownCount(0);
        setMoveCount(moveCount + 1);
      }
    }
  }, [shownCount, gridItems]);

  //verica se o jogo acabou
  useEffect(() => {
    if (moveCount > 0 && gridItems.every((e) => e.permanentShown == true)) {
      setPlaying(false);
    }
  }, [moveCount, gridItems]);

  const resetAndCreateGrid = () => {
    //step 1 reset the game
    setTimeElapsed(0);
    setPlaying(false);
    setMoveCount(0);
    setShownCount(0);

    //step 2 create the grid and start the game
    //2.1 - create a empyt grid
    let tmpGrid: GridItemType[] = [];

    for (let i = 0; i < items.length * 2; i++) {
      tmpGrid.push({ item: null, shown: false, permanentShown: false });
    }

    //2.2 fill the grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        var pos = -1;
        while (pos < 0 || tmpGrid[pos].item != null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = i;
      }
    }

    //2.3 jogar no state
    setGridItems(tmpGrid);

    // step 3 start the game
    setPlaying(true);
  };

  const handleItemClick = (index: number) => {
    if (playing && index != null && shownCount < 2) {
      let tempGrid = [...gridItems];

      if (
        tempGrid[index].permanentShown == false &&
        tempGrid[index].shown == false
      ) {
        tempGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }

      setGridItems(tempGrid);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <a className={styles.logoLink} href="">
          <img src={logoImage.src} width="200" alt="" />
        </a>
        <div className={styles.infoArea}>
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount.toString()} />
        </div>
        <Button
          label="Reiniciar"
          icon={restartIcon}
          onClick={resetAndCreateGrid}
        />
      </div>
      <div className={styles.gridArea}>
        <div className={styles.grid}>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
