import React, { useEffect, useRef, useState } from "react";
import { JsxEmit } from "typescript";
import { BarTask } from "../../types/bar-task";
import { GanttContentMoveAction } from "../../types/gantt-task-actions";
import { Bar } from "./bar/Bar";
import { BarSmall } from "./bar/BarSmall";
import { Milestone } from "./milestone/Milestone";
import { Project } from "./project/Project";
import style from "./task-list.module.css";

// TaskItemPropsの定義
export type TaskItemProps = {
  // BarTask型のtask
  task: BarTask;
  // number型のarrowIndent
  arrowIndent: number;
  // number型のtaskHeight
  taskHeight: number;
  // boolean型のisProgressChangeable
  isProgressChangeable: boolean;
  // boolean型のisDateChangeable
  isDateChangeable: boolean;
  // boolean型のisDelete
  isDelete: boolean;
  // boolean型のisSelected
  isSelected: boolean;
  // boolean型のrtl
  rtl: boolean;
  // eventの開始時
  onEventStart: (
    action: GanttContentMoveAction,
    selectedTask: BarTask,
    // eventで二つを呼び出す
    event?: React.MouseEvent | React.KeyboardEvent
  ) => any;
};

// propsとして、下記を渡す
export const TaskItem: React.FC<TaskItemProps> = (props) => {
  const {
    task,
    arrowIndent,
    isDelete,
    taskHeight,
    isSelected,
    rtl,
    onEventStart,
  } = {
    ...props,
  };
  // SVGTextElementのrefを作成
  const textRef = useRef<SVGTextElement>(null);
  // divのエレメントを持たせる
  const [taskItem, setTaskItem] = useState<JSX.Element>(<div />);
  // 初期値trueのuseState
  const [isTextInside, setIsTextInside] = useState(true);

  // 再レンダリング後の実行
  useEffect(() => {
    // task.typeInternalを切り替える
    switch (task.typeInternal) {
      // milestoneの場合
      case "mileStone":
        setTaskItem(<Milestone {...props} />);
        break;
      // projectの場合
      case "project":
        setTaskItem(<Project {...props} />);
        break;
      // smalltaskの場合
      case "smalltask":
        setTaskItem(<BarSmall {...props} />);
        break;
      // デフォルト
      default:
        setTaskItem(<Bar {...props} />);
        break;
    }
    // 配列内のtask,isSelected
  }, [task, isSelected]);


  useEffect(() => {
    // もしも、現在のtextRrefが
    if (textRef.current) {
      // 左辺より右辺の方が大きければ、
      setIsTextInside(textRef.current.getBBox().width < task.x2 - task.x1);
    }
    // 配列を返す
  }, [textRef, task]);

  const getX = () => {
    const width = task.x2 - task.x1;
    const hasChild = task.barChildren.length > 0;
    // もしもisTextInsideの場合
    if (isTextInside) {
      // 下記を返す
      return task.x1 + width * 0.5;
    }

    // もし、rtlがtrueならtextRef.current、falseならrtlの時、
    if (rtl && textRef.current) {
      return (
        task.x1 -
        // textRefの現在の最小座標は下記
        textRef.current.getBBox().width -
        arrowIndent * +hasChild -
        arrowIndent * 0.2
      );
      // そうでないなら、下記を返す
    } else {
      return task.x1 + width + arrowIndent * +hasChild + arrowIndent * 0.2;
    }
  };

  
  return (
    <g
      onKeyDown={(e) => {
        switch (e.key) {
          case "Delete": {
            // もしデリートの場合
            if (isDelete) onEventStart("delete", task, e);
            // 終了
            break;
          }
        }
        // イベントの伝播を阻止
        e.stopPropagation();
      }}
      // マウスエンターの場合
      onMouseEnter={(e) => {
        onEventStart("mouseenter", task, e);
      }}
      // ダブルクリックの場合
      onDoubleClick={(e) => {
        onEventStart("dblclick", task, e);
      }}
      // クリックの場合
      onClick={(e) => {
        onEventStart("click", task, e);
      }}
      // hover?フォーカスされた時
      onFocus={() => {
        onEventStart("select", task);
      }}
    >
      {taskItem}
      <text
        x={getX()}
        y={task.y + taskHeight * 0.5}
        className={
          isTextInside
          // trueなら右辺、falseなら左辺
            ? style.barLabel
            : style.barLabel && style.barLabelOutside
        }
        ref={textRef}
      >
        {task.name}
      </text>
    </g>
  );
};
