import React from "react";
import { TaskItemProps } from "../task-item";
import styles from "./milestone.module.css";

// マイルストーン関数の定義、TaskItemPropsを指定
export const Milestone: React.FC<TaskItemProps> = ({
  task,
  isDateChangeable,
  onEventStart,
  isSelected,
}) => {
  // 変える 角度
  const transform = `rotate(45 ${task.x1 + task.height * 0.356}
    ${task.y + task.height * 0.85})`;
    // barの色を取得と命名
  const getBarColor = () => {
    // 選ばれたら、backgroundSelectedColor,そうでなければbackgroundColor
    return isSelected

      ? task.styles.backgroundSelectedColor
      : task.styles.backgroundColor;
  };

  return (
    // SVGの要素グループ化、タブキーで小→大
    <g tabIndex={0} className={styles.milestoneWrapper}>
      <rect
        // getBarColorに塗りつぶす
        fill={getBarColor()}
        // 座標
        x={task.x1}
        width={task.height}
        y={task.y}
        height={task.height}
        rx={task.barCornerRadius}
        ry={task.barCornerRadius}
        transform={transform}
        className={styles.milestoneBackground}
        // クリック時、イベントtrueならonEventStartが返される
        onMouseDown={(e) => {
          isDateChangeable && onEventStart("move", task, e);
        }}
      />
    </g>
  );
};
