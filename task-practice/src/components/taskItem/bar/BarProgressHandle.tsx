import React from "react";
import styles from "./bar.module.css";


type BarProgressHandleProps = {

  progressPoint: string;
  // mousedown（クリックした瞬間）時の
  onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
};

export const BarProgressHandle: React.FC<BarProgressHandleProps> = ({
  // 進捗点
  progressPoint,
  // マウスクリック時
  onMouseDown,
}) => {
  return (
    // 直線のセグメント
    <polygon
      className={styles.barHandle}
      points={progressPoint}
      onMouseDown={onMouseDown}
    />
  );
};
