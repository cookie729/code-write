import React from "react";
import "./TodoListItem.css";
import { Todo, ToggleComplete } from "./types";

interface TodoListItemProps {
  // todoに対してTodoの型を入れる
  todo: Todo;
  // toggleCompleteに対してToggleCompleteの型を入れる
  toggleComplete: ToggleComplete;
}

// TodoListItem関数の中にはTodoListItemPropsが入る、その中にはtodo(Todo),toggleComplete(ToggleComplete)が入る
export const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  toggleComplete,
}) => {
  return (
    <li>
      {/* todoの中のcompleteがyesならcomplete,noならundefinedが返される */}
      <label className={todo.complete ? "complete" : undefined}>
        <input
          type="checkbox"
          // input内容が選択された時、todoを取り出す
          onChange={() => toggleComplete(todo)}
          // checkboxの状態をtodoのcompleteのbooleanで制御
          checked={todo.complete}
        />
        {/* todoの中のtext内容が反映される */}
        {/* 親からtodo.mapを渡されている */}
        {todo.text}
      </label>
    </li>
  );
};
