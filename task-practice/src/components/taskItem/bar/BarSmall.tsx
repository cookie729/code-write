import React from "react";
import { getProgressPoint } from "../../../helpers/bar-helper";
import { BarDisplay } from "./BarDisplay";
import { BarProgressHandle } from "./BarProgresshandle";
import { TaskItemProps } from "../task-item";
import styles from "./bar.module.css";

// BarSmall関数にTaskItemPropsを定義
export const BarSmall: React.FC<TaskItemProps> = ({
  task,
  isProgressChangeable,
  isDateChangeable,
  onEventStart,
  isSelected,
}) => {
  // 進捗点として、taskの中の要素を定義
  const progressPoint = getProgressPoint(
    task.progressWidth + task.x1,
    task.y,
    task.height
  );

  return (
    // SVG要素をグループ化、適用された変形は子要素に対して実行される
    <g className={styles.barWrapper} tabIndex={0}>
      {/* BarDisplayに定義 */}
      <BarDisplay
      // 座標
        x={task.x1}
        y={task.y}
        width={task.x2 - task.x1}
        height={task.height}
        progressX={task.progressX}
        progressWidth={task.progressWidth}
        barCornerRadius={task.barCornerRadius}
        styles={task.styles}
        isSelected={isSelected}
        onMouseDown={(e) => {
          // isDateChangeableがtrueならonEventStartを返す
          // isDateChangeableがfalseならそのまま返す
          isDateChangeable && onEventStart("move", task, e);
        }}
      />
      <g className="handleGroup">
        {isProgressChangeable && (
          <BarProgressHandle
            progressPoint={progressPoint}
            onMouseDown={(e) => {
              onEventStart("progress", task, e);
            }}
          />
        )}
      </g>
    </g>
  );
};
