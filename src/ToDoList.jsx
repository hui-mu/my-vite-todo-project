import useToDos from "./useToDos.js";
const ToDoList = () => {
  const {
    taskInput,
    taskList,
    itemCount,
    editingText,
    error,

    addTask,
    toggleChecked,
    removeTask,
    editTask,
    editingTextHandler,
    saveTask,
    pressKeyHandler,
    enterTextHandler,
  } = useToDos();

  return (
    <div className='card'>
      <div className='header'>
        <h2>Todo</h2>
        <p>{itemCount} items left</p>
      </div>
      <div className='checkboxList'>
        <form onSubmit={addTask}>
          <input
            type={"text"}
            placeholder={"Add a task..."}
            value={taskInput}
            onChange={enterTextHandler} //TODO: 会不断更新过度渲染吗？
          />
          <button type={"submit"}> Add </button>
        </form>

        {taskList.map((task) => {
          console.log(task);
          return (
            <div key={task.id} className={"task"}>
              {task.editing ? (
                <input
                  value={editingText}
                  onChange={editingTextHandler} // TODO:看起来不是一个good practice，但是看起来统一
                  onKeyDown={(e) => pressKeyHandler(e, task)}
                />
              ) : (
                <label>
                  <input
                    type={"checkbox"}
                    onChange={() => toggleChecked(task)}
                    checked={task.checked}
                  />
                  <span>{task.text}</span>
                </label>
              )}
              <div className={"itemButton"}>
                {task.editing ? (
                  <button onClick={() => saveTask(task)}>Save</button>
                ) : (
                  <button onClick={() => editTask(task)}>Edit</button>
                )}
                <button onClick={() => removeTask(task)}>Delete</button>
              </div>
            </div>
          );
        })}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};
export default ToDoList;
