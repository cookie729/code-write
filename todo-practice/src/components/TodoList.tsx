import React from "react";
import { Todo, ToggleComplete } from "./types";
import { TodoListItem } from "./TodoListItem";

interface TodoListProps {
  todos: Array<Todo>;
  toggleComplete: ToggleComplete;
}

// TodoListにはTodoListPropsのpropsが入る、その中にはtodos,toggleCompleteが入っている
export const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleComplete,
}) => {
  return (
    <ul>
      {/* ulの中身をmapで囲むことで、liに内容を入れられる */}
      {/* todosの中身をmapで取り出し、todoという名前で定義する */}
      {todos.map((todo) => (
        <TodoListItem
          // TodoListItemの中に変更の識別をする為にkeyを付与
          // todo(Todo)の中のtextを取り出す為、todo.textと定義
          key={todo.text}
          // todo(Todoの配列)を子要素へ
          todo={todo}
          // toggleComplete(selectedTodoを取得したTodo)を子要素へ
          toggleComplete={toggleComplete}
        />
      ))}
    </ul>
  );
};
