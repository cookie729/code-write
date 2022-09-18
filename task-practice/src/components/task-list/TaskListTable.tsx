import React, { useMemo } from "react";
import styles from './task-list-table.module.css'
import { Task } from "../../types/public-types";

// 日付の補完場所
const localeDateStringCache = {};
// 日付の補完工場
const toLocaleDateStringFactory =
(locale: string) => 
// 日時の書式化を可能にする
(date: DateTimeOptions: Intl.DateTimeFormatOptions) => {
  // keyの中はdate.toStringと同じ
  const key = date.toString();
  // Lightning DesignSystem?
  // ローカルの日付け文字列をキャッシュ
  let lds = localeDateStringCache[key];
  if(!lds) {

    lds = date.toLocaleDateString(locale, dateTimeOptions);
    // 日付の文字列にキーを持たせる
    localeDateStringCache[key] = lds;
  }
  return lds;
}
// 日付、時刻のオプション、
// intlでDateTimeFormatOptionsの日付を書式化をする
const dateTimeOptions: Intl.DateTimeFormatOptions = {
  // 平日 短く
  weekday: "short",
  // 年 数値的に
  year: "numeric",
  // 月 長い
  month: "long",
  // 日 数値的に
  day: "numeric"
}
// TaskListTableDefaultの関数の中身を定義する
export const TaskListTableDefault: React.FC<{
  // 行の高さ
  rowHeight: number;
  // 行の幅
  rowWidth: string;
  // 字体
  fontFamily: string;
  // 字の大きさ
  fontSize: string;
  // 単位
  locale: string;
  // Taskの配列
  tasks: Task[];

  selectedTaskId: string;
  // setSelectedTaskはストリング型のtaskIdが入っている
  setSelectedTask: (taskId: string) => void;
  // onExpanderClickはTask(public-types)型のtaskが入っている
  // 押したら拡大させる
  onExpanderClick: (task: Task) => void;
}> = ({
  rowHeight,
  rowWidth,
  tasks,
  fontFamily,
  fontSize,
  locale,
  onExpanderClick,
}) => {

  // useMemo変数のメモ化
  const toLocaleDateString = useMemo(
    () => toLocaleDateStringFactory(locale),
    // localが入った配列
    [locale]
  );
  return (
    <div
    className={StyleSheet.taskListWrapper}
    style={{
      fontFamily: fontFamily,
      fontSize: fontSize,
    }}
    >
      {tasks.map(t => {
        // 初期値空のexpanderSymbolsを変数に設定
        let expanderSymbol = "";
        // もしt.hideChildrenとfalseが同じなら
        if (t.hideChildren === false) {
          // "▼"
          expanderSymbol = "▼";
          // そうでなく、trueと同じなら
        }else if (t.hideChildren === true) {
          // ”▶︎”
          expanderSymbol = "▶";
        }

        return (
          <div
          className={styles.taskListTableRow}
          style={{height: rowHeight}}
          key={`${t.id} row`}
          >
            <div
              className={styles.taskListCell}
              style={{
                minWidth: rowWidth,
                maxWidth: rowWidth,
              }}
              title={t.name}
              >
                <div className={styles.taskListNameWrapper}>
                  <div
                  className={
                    expanderSymbol
                    ? StyleSheet.taskListExpander
                    : StyleSheet.taskListEmptyExpander
                  }
                  onClick={() => onExpanderClick(t)}
                  >
                    {expanderSymbol}
                  </div>
                  <div>{t.name}</div>
                </div>
            </div>
            <div
            className={StyleSheet.taskListCell}
            style={{
              minWidth: rowWidth,
              maxWidth: rowWidth,
            }}
            >
              {/* 自動的な改行を防ぐ 
              始まりのdateTimeOptions
              */}
              &nbsp;{toLocaleDateString(t.start, dateTimeOptions)}
            </div>
            <div
            className={styles.taskListCell}
            style={{
              minWidth: rowWidth,
              maxWidth: rowWidth,
            }}
            >
              {/* 自動的な改行を防ぐ 
              終わりのdateTimeOptions
              */}
              &nbsp;{toLocaleDateString(t.end, dateTimeOptions)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

