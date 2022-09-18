export type Todo = {
  text: string;
  // on/off?
  complete: boolean;
};

// ToggleCompleteには型Todoが入ったselectedTodoが入っている
export type ToggleComplete = (selectedTodo: Todo) => void;
// AddTodoはnewToroを取得
export type AddTodo = (newTodo: string) => void;



