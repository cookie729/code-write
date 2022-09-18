import React from "react";
import { getProgressPoint } from "../../../helpers/bar-helper";
import { BarDisplay } from "./BarDisplay";
import { BarDateHandle } from "./BarDateHandle";
import { TaskItemProps } from "../task-item";
import styles from "./bar.module.css";
import { BarProgressHandle } from "./BarProgresshandle";

// Bar を定義
export const Bar: React.FC<TaskItemProps> = ({
  task,
  isProgressChangeable,
  isDateChangeable,
  rtl,
  onEventStart,
  isSelected,
}) => {
  // 進捗点
  const progressPoint = getProgressPoint(
    // 左書き？× taskのprogressWidth + taskのprogressX
    +!rtl * task.progressWidth + task.progressX,
    // taskのy
    task.y,
    // taskのheight
    task.height
  );
  // handleHeight はtask.heightを-2する
  const handleHeight = task.height - 2;
  return (
    // barWrapperのstyleを使用 Tabキーによる移動順序が小→大
    <g className={styles.barWrapper} tabIndex={0}>

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
        // クリック時
        onMouseDown={(e) => {
          // trueなら右、falseなら右が返される
          isDateChangeable && onEventStart("move", task, e);
        }}
      />
      {/* SVG要素 */}
      <g className="handleGroup">
        {/* trueならleft,rightが返される */}
        {isDateChangeable && (
          <g>
            {/* left */}
            <BarDateHandle
              x={task.x1 + 1}
              y={task.y + 1}
              width={task.handleWidth}
              height={handleHeight}
              barCornerRadius={task.barCornerRadius}
              onMouseDown={(e) => {
                onEventStart("start", task, e);
              }}
            />
            {/* right */}
            <BarDateHandle
              x={task.x2 - task.handleWidth - 1}
              y={task.y + 1}
              width={task.handleWidth}
              height={handleHeight}
              barCornerRadius={task.barCornerRadius}
              onMouseDown={(e) => {
                onEventStart("end", task, e);
              }}
            />
          </g>
        )}
        {/* trueなら、BarProgressChangeableが返される */}
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
