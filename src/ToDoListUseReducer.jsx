import { useReducer } from "react";
import reducer from "./reducer";

const ToDoListUserReducer = () => {
  const [state, dispatch] = useReducer(reducer, {
    taskInput: "",
    taskList: [],
    itemCount: 0,
    editingText: null,
    error: "",
  });
  const addTask = (e) => {
    e.preventDefault();
    dispatch({ type: "addTask" });
  };

  const pressKeyHandler = (e, targetTask) => {
    // save with Enter, cancel with Esc

    if (e.key === "Enter") {
      dispatch({ type: "saveEdit", targetTask: targetTask });
    }
    if (e.key === "Escape") {
      dispatch({ type: "cancelEdit", targetTask: targetTask });
    }
    return;
  };

  const editTask = (targetTask) => {
    // TODO: 光标不能自动focus在文本框内 ref + useEffect + editingTextId(这个状态我没有定义)
    if (targetTask.editing) return;
    dispatch({ type: "editTask", targetTask: targetTask });
  };

  const removeTask = (targetTask) => {
    if (targetTask.editing) return;
    const ok = window.confirm(`Delete the task "${targetTask.text}"?`);
    if (!ok) return; //TODO: window 弹窗，不如modal
    dispatch({ type: "removeTask", targetTask: targetTask });
  };
  return (
    <div className='card'>
      <div className='header'>
        <h2>Todo</h2>
        <p>{state.itemCount} items left</p>
      </div>
      <div className='checkboxList'>
        <form onSubmit={addTask}>
          <input
            type={"text"}
            placeholder={"Add a task..."}
            value={state.taskInput}
            onChange={(e) =>
              dispatch({ type: "enterText", text: e.target.value })
            } //TODO: 会不断更新过度渲染吗？
          />
          <button type={"submit"}> Add </button>
        </form>

        {state.taskList.map((task) => {
          console.log(task);
          return (
            <div key={task.id} className={"task"}>
              {task.editing ? (
                <input
                  value={state.editingText}
                  onChange={(e) =>
                    dispatch({ type: "editingText", text: e.target.value })
                  } // TODO:看起来不是一个good practice，但是看起来统一
                  onKeyDown={(e) => pressKeyHandler(e, task)}
                />
              ) : (
                <label>
                  <input
                    type={"checkbox"}
                    onChange={() =>
                      dispatch({
                        type: "toggleChecked",
                        targetTask: task,
                      })
                    }
                    checked={task.checked}
                  />
                  <span>{task.text}</span>
                </label>
              )}
              <div className={"itemButton"}>
                {task.editing ? (
                  <button
                    onClick={() =>
                      dispatch({ type: "saveEdit", targetTask: task })
                    }
                  >
                    Save
                  </button>
                ) : (
                  <button onClick={() => editTask(task)}>Edit</button>
                )}
                <button onClick={() => removeTask(task)}>Delete</button>
              </div>
            </div>
          );
        })}
        {state.error && <p>{state.error}</p>}
      </div>
    </div>
  );
};

export default ToDoListUserReducer;
