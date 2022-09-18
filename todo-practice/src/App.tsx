import React, {useState} from "react";
import { initialTodos } from "./components/initialTodo";
import { TodoList } from "./components/TodoList";
import { AddTodoForm } from "./components/AddTodoForm";
import { Todo } from "./components/types";
import { ToggleComplete, AddTodo } from "./components/types";

const App: React.FC = () => {
  // todos,setTodosには初期値がinitialTodosの変更前の値が入っている
  const [todos, setTodos] = useState<Array<Todo>>(initialTodos);

  // toggleCompleteにはselectedTodoが入っている型ToggleCompleteが入っているチェックボックス
  const toggleComplete: ToggleComplete = (selectedTodo) => {
    // updateTodosにはtodos(Todo)のmap(中身)が入る
    const updatedTodos = todos.map((todo) => {
      // もしtodoとselectedTodo(変更された値)が同じであれば
      if (todo === selectedTodo) {
        // todoの配列にfalseを返しチェックボックスcompleteにチェックをつける
        return { ...todo, complete: !todo.complete };
      }
      // trueになればtodoが返却される
      return todo;
    });
    // setTodoが更新されるとupdateTodosの機能が入る
    setTodos(updatedTodos);
  };
  // addTodoの型として、AddTodoを定義しその中にはstring型のnewTodoが入っている
  const addTodo: AddTodo = (newTodo) => {
    // newTodoの値(テキストフィールドの値)がスペースのみか空の時がtrueならsetTodo(更新された値)のtextとcompleteが返される
    newTodo.trim() !== "" &&
      setTodos([...todos, { text: newTodo, complete: false }]);
  };
  return (
    <>
      {/* TodoListにtodoとtoggleCompleteを渡す */}
      <TodoList todos={todos} toggleComplete={toggleComplete} />
      {/* AddTodoFormにaddTodoを渡す */}
      <AddTodoForm addTodo={addTodo} />
    </>
  );
};

export default App;