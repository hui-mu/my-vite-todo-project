const reducer = (state, action) => {
  switch (action.type) {
    //TODO: dispatch({type:"enterText", text:text})
    case "enterText": {
      return {
        ...state,
        taskInput: action.text,
      };
    }
    //TODO: dispatch({type:"addTask"})
    case "addTask": {
      if (
        state.taskInput === null ||
        state.taskInput === undefined ||
        state.taskInput.trim() === ""
      ) {
        return {
          ...state,
          error: "please enter something...",
        };
      }

      return {
        ...state,
        taskList: [
          {
            id: Date.now(),
            text: state.taskInput,
            checked: false,
            editing: false,
          }, ...state.taskList
        ],
        itemCount: state.itemCount + 1,
        taskInput: "",
        error: "",
      };
    }
    //TODO: dispatch({type:"toggleChecked", targetTask:task})
    case "toggleChecked": {
      return {
        ...state,
        taskList: state.taskList.map((task) => {
          if (task.id === action.targetTask.id)
            return { ...task, checked: !task.checked };
          return task;
        }),
      };
    }
    //TODO: dispatch({type:"removeTask", targetTask:task})
    case "removeTask": {
      return {
        ...state,
        itemCount: state.itemCount - 1,
        taskList: state.taskList.filter(
          (task) => action.targetTask.id !== task.id
        ),
      };
    }
    //TODO: dispatch({type:"editTask", targetTask:task})
    case "editTask": {
      return {
        ...state,
        editingText: action.targetTask.text,
        taskList: state.taskList.map((task) =>
          task.id === action.targetTask.id ? { ...task, editing: true } : task
        ),
      };
    }
    //TODO: dispatch({type:"editingText", text: text})
    case "editingText": {
      return {
        ...state,
        editingText: action.text,
      };
    }
    //TODO: dispatch({type:"saveEdit", targetTask:task})
    case "saveEdit": {
      if (
        state.editingText === null ||
        state.editingText === undefined ||
        state.editingText.trim() === ""
      ) {
        return {
          ...state,
          error: "please enter something...",
        };
      }
      return {
        ...state,
        taskList: state.taskList.map((task) =>
          task.id === action.targetTask.id
            ? { ...task, text: state.editingText, editing: false }
            : task
        ),
        editingText: null,
        error: "",
      };
    }
        //TODO: dispatch({type:"cancelEdit", targetTask:task})

    case "cancelEdit":
      {return {...state,
        taskList: state.taskList.map((task) =>
          task.id === action.targetTask.id ? { ...task, editing: false } : task
        ),
        editingText: null,
      }

      }
      throw new Error("unknown action type:" + action.type);
  }
};

export default reducer;
