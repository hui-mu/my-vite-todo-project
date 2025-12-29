import { useState } from "react";
const useToDos = () => {
  const [taskInput, setTaskInput] = useState(""); //TODO: undefined or null or empty string
  const [taskList, setTaskList] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [editingText, setEditingText] = useState(null); //TODO: undefined or null or empty string
  const [error, setError] = useState("");
  const addTask = (e) => {
    e.preventDefault(); //TODO:possible effect?
    if (
      taskInput === null ||
      taskInput === undefined ||
      taskInput.trim() === ""
    ) {
      setError("please enter something...");
      return;
    }

    setTaskList((prev) => [
      { id: Date.now(), text: taskInput, checked: false, editing: false },
      ...prev,
    ]);
    setItemCount(() => itemCount + 1); // TODO: 这个说是用了旧的state
    setTaskInput("");
    setError("");
  };

  const toggleChecked = (targetTask) => {
    setTaskList((prev) =>
      prev.map((task) => {
        if (task.id === targetTask.id)
          return { ...task, checked: !task.checked };
        return task;
      })
    );
  };

  const removeTask = (targetTask) => {
    if (targetTask.editing) return;
    const ok = window.confirm(`Delete the task "${targetTask.text}"?`);
    if (!ok) return; //TODO: window 弹窗，不如modal
    setItemCount(itemCount - 1);
    setTaskList((prev) => prev.filter((task) => targetTask.id !== task.id));
  };

  // An Edit button (switch to editable state,
  const editTask = (targetTask) => {
    // TODO: 光标不能自动focus在文本框内 ref + useEffect + editingTextId(这个状态我没有定义)
    if (targetTask.editing) return;
    setEditingText(targetTask.text);
    setTaskList((prev) =>
      prev.map((task) =>
        task.id === targetTask.id ? { ...task, editing: true } : task
      )
    );
  };

  const editingTextHandler = (e) => {
    setEditingText(e.target.value);
  };

  const saveEdit = (targetTask) => {
    if (
      editingText === null ||
      editingText === undefined ||
      editingText.trim() === ""
    ) {
      setError("please enter something...");
      return;
    }
    setTaskList((prev) =>
      prev.map((task) =>
        task.id === targetTask.id
          ? { ...task, text: editingText, editing: false }
          : task
      )
    );
    setEditingText(null);
    setError("");
    return;
  };
  const saveTask = (targetTask) => saveEdit(targetTask);

  const pressKeyHandler = (e, targetTask) => {
    // save with Enter, cancel with Esc

    if (e.key === "Enter") {
      saveEdit(targetTask);
    }
    if (e.key === "Escape") {
      setTaskList((prev) =>
        prev.map((task) =>
          task.id === targetTask.id ? { ...task, editing: false } : task
        )
      );
      setEditingText(null);

      return;
    }
    return;
  };

  const enterTextHandler = (e) => {
    setTaskInput(e.target.value);
  };

  return {
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
  };
};

export default useToDos;
