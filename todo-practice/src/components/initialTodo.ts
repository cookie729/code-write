import { Todo } from "./types";

// initialTodosの配列Arrayには型Todoが入る
export const initialTodos: Array<Todo> = [
  {
    // 配列の一つ目にはtext:walk the dogとcomplete:trueが入っている
    text: "Walk the dog",
    complete: true,
  },
  // 配列の二つ目にはtext:Make appとcomplete: falseが入っている
  {
    text: "Make app",
    complete: false,
  },
];
