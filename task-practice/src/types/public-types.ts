export enum ViewMode {
  Hour = "Hour",
  QuarterDay = "Quarter Day",
  HalfDay = "Half Day",
  Day = "Day",
  /**ISO-8601 week **/
  Week = "Week",
  Month = "Month",
  Year = "Year",
}
export type TaskType = "task" | "mileStone" | "project";
export interface Task {
  id: string;
  type: TaskType;
  name: string;
  start: Date;
  end: Date;
  /**
   * Form 0 to 100
   */
  // フォームは0~100
  progress: number;
  styles?: {
    backgroundColor?: string;
    progressColor?: string;
    progressSelectedColor?: string;
  };
  isDisabled?: boolean;
  project?: string;
  dependencies?: string[];
  hideChildren?: boolean;
  displayOrder?: number;
}

export interface EventOption {
  /**
   * Time step value for date changes.
   */
  // 日付変更時のタイムステップ時
  timeStep?: number;
  /**
   * Invokes on bar select on unselect.
   */
  // バー選択時、日選択時に呼び出される
  onSelect?: (task: Task, isSelected: boolean) => void;
  /**
   * Invokes on bar double click.
   */
  // バーのダブルクリックで起動
  onDoubleClick?: (task: Task) => void;
  /**
   * Invokes on bar click.
   */
  //  バーのクリックで起動
  onClick?: (task: Task) => void;
  /**
   * Invokes on end and start time change. Chart undoes operation if method return false or error.
   */
  // 終了時刻と開始時刻の変更時に呼び出される。メソッドがfalseまたはエラーを返した場合、チャートは操作を取り消します。
  onDateChange?: (
    task: Task,
    children: Task[]
  ) => void | boolean | Promise<void> | Promise<boolean>;
  /**
   * Invokes on progress change. Chart undoes operation if method return false or error.
   */
  //  進行状況が変化したときに呼び出されます。メソッドがfalseまたはエラーを返した場合、チャートは操作を取り消します。
  onProgressChange?: (
    task: Task,
    children: Task[]
  ) => void | boolean | Promise<void> | Promise<boolean>;
  /**
   * Invokes on delete selected task. Chart undoes operation if method return false or error.
   */
  //  選択されたタスクの削除時に呼び出されます。チャートは、メソッドがfalseまたはエラーを返した場合、操作を元に戻すことができます。
  onDelete?: (task: Task) => void | boolean | Promise<void> | Promise<boolean>;
  /**
   * Invokes on expander on task list
   */
  //  タスクリスト上のエクスパンダを呼び出す
  onExpanderClick?: (task: Task) => void;
}
export interface DisplayOption {
  viewMode?: ViewMode;
  viewDate?: Date;
  preStepsCount?: number;
  /**
   * Specifies the month name language. Able formats: ISO 639-2, Java Locale
   */
  //  月名の言語を指定する。使用可能な形式。ISO 639-2、Java Locale
  locale?: string;
  rtl?: boolean;
}

export interface StylingOption {
  headerHeight?: number;
  columnWidth?: number;
  listCellWidth?: string;
  rowHeight?: number;
  ganttHeight?: number;
  barCornerRadius?: number;
  handleWidth?: number;
  fontFamily?: string;
  fontSize?: string;
  /**
   * How many of row width can be taken by task.
   * From 0 to 100
   */
  //  タスクで何列分の幅を取ることができるのか。
  //  0から100まで
  barFill?: number;
  barProgressColor?: string;
  barProgressSelectedColor?: string;
  barBackgroundColor?: string;
  barBackgroundSelectedColor?: string;
  projectProgressColor?: string;
  projectProgressSelectedColor?: string;
  projectBackgroundColor?: string;
  projectBackgroundSelectedColor?: string;
  milestoneBackgroundColor?: string;
  milestoneBackgroundSelectedColor?: string;
  arrowColor?: string;
  arrowIndent?: number;
  todayColor?: string;
  TooltipContent?: React.FC<{
    task: Task;
    fontSize: string;
    fontFamily: string;
  }>;
  TaskListHeader?: React.FC<{
    headerHeight: number;
    rowWidth: string;
    fontFamily: string;
    fontSize: string;
  }>;
  TaskListTable?: React.FC<{
    rowHeight: number;
    rowWidth: string;
    fontFamily: string;
    fontSize: string;
    locale: string;
    tasks: Task[];
    selectedTaskId: string;
    /**
     * Sets selected task by id
     */
    //  選択されたタスクをidで設定
    setSelectedTask: (taskId: string) => void;
    onExpanderClick: (task: Task) => void;
  }>;
}

// 型GanttPropsはEventOption, DisplayOption, StylingOptionを継承したtask:Task[]を持っている
export interface GanttProps extends EventOption, DisplayOption, StylingOption {
  tasks: Task[];
}
