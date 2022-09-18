import React from "react";
import styles from "./bar.module.css";

// BarDateHandleProps型の宣言
type BarDateHandleProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  barCornerRadius: number;
  // マウスダウン時の型
  onMouseDown: (event: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
};

// BarDateHandleの定義
export const BarDateHandle: React.FC<BarDateHandleProps> = ({
  x,
  y,
  width,
  height,
  barCornerRadius,
  onMouseDown,
}) => {
  // 返却値
  return (
    // 図形
    <rect
    // 座標の定義
      x={x}
      y={y}
      width={width}
      height={height}
      className={styles.barHandle}
      ry={barCornerRadius}
      rx={barCornerRadius}
      onMouseDown={onMouseDown}
    />
  );
};