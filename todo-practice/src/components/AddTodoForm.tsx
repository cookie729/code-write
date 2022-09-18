import { AddTodo } from "./types";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface AddTodoFormProps {
  // AddTodoをpropsとして受け取る
  addTodo: AddTodo;
}
export const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTodo }) => {
  // newTodo,setNewTodoは初期値は空の文字列型の状態
  const [newTodo, setNewTodo] = useState<string>("");

  // handleChangeは複数の入力の変更を処理する
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // setNewTodoに変更した内容が入る
    setNewTodo(e.target.value);
  };
  // フォームの送信が成功した時にデータを受け取る
  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    // 通常の処理がされない場合、行われない
    e.preventDefault();
    // addTodoにnewTodo（入力された文字列）を入れる
    addTodo(newTodo);
    // 更新されたテキストフィールドは空になる
    setNewTodo("");
  };

  return (
    <form>
      {/* valueは入力されたテキスト */}
      {/* onChangeは入力された内容を処理する */}
      <input type="text" value={newTodo} onChange={handleChange} />
      {/* onClickはテキスト入力後送信ボタンクリック時データを受け取る */}
      <button type="submit" onClick={handleSubmit}>
        Add Todo
      </button>
    </form>
  );
};
