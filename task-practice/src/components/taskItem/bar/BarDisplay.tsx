import React from "react";
import styles from "./bar.module.css";

// BarDisplayPropsのprops宣言
type BarDisplayProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  isSelected: boolean;
  /* progress start point */
  progressX: number;
  progressWidth: number;
  barCornerRadius: number;
  styles: {
    backgroundColor: string;
    backgroundSelectedColor: string;
    progressColor: string;
    progressSelectedColor: string;
  };
  // マウスクリック時のマウス操作する時のイベントの型
  onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
};

export const BarDisplay: React.FC<BarDisplayProps> = ({
  // BarDisplayのpropsとして定義
  x,
  y,
  width,
  height,
  isSelected,
  progressX,
  progressWidth,
  barCornerRadius,
  styles,
  onMouseDown,
}) => {
  const getProcessColor = () => {
    // isSelectedはtrueなら左を返す、falseなら右を返す
    return isSelected ? styles.progressSelectedColor : styles.progressColor;
  };

  const getBarColor = () => {
    // isSelectedはtrueなら左、falseなら右を返す
    return isSelected ? styles.backgroundSelectedColor : styles.backgroundColor;
  };

  return (
    // SVGグループ化のコンテナはマウスダウン時
    <g onMouseDown={onMouseDown}>
      {/* 四角形の要素 */}
      <rect
      // 座標の定義
        x={x}
        width={width}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getBarColor()}
        className={style.barBackground}
      />
      <rect
        width={progressWidth}
        y={y}
        height={height}
        ry={barCornerRadius}
        rx={barCornerRadius}
        fill={getProcessColor()}
      />
    </g>
  );
};
