import { StrictMode } from "react";
import "./styles.css";
import ToDoList from "./ToDoList.jsx";
import ToDoListUserReducer from "./ToDoListUseReducer.jsx";

export default function App() {
  return (
    <StrictMode>
      <div className='App'>
        {/* TODO: 这个文件又用了strictMode，有必要吗？root已经用strict mode包裹了。 */}
        {/* <ToDoList /> */}
        <ToDoListUserReducer />
      </div>
    </StrictMode>
  );
}
