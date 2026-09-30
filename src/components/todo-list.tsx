import { useMemo, useState, useEffect } from "react";
// import { KeyboardEvent } from "react";
import { SquarePen, Trash2Icon, Check } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Toggle } from "./ui/toggle";

function TodoList() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  /* todos={todos} onRemove={handleRemoveTodo} */

  // Load TODOs from local storage on app startup
  useMemo(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      // eslint-disable-next-line react-hooks/set-state-in-render
      setTodos(storedTodos);
    }
  }, []);

  // Update local storage whenever TODOs change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleRemoveTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleAddTodo = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (task.trim() !== "") {
      setTodos([...todos, task]);
      setTask("");
    }
    return false;
  };
  return (
    <div id="todo-list">
      <form onSubmit={(e) => handleAddTodo(e)}>
        <Field>
          <FieldLabel htmlFor="new-todo-input" className="todo-label">
            Add Task
          </FieldLabel>

          <ButtonGroup>
            <Input
              type="text"
              id="new-todo-input"
              className="inline-block w-67 rounded-sm"
              name="new-todo-input"
              placeholder="Enter task description"
              autoComplete="off"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Button variant="outline" className="rounded-sm" type="submit">
              Add
            </Button>
          </ButtonGroup>
        </Field>
      </form>

      <div className="">
        <ButtonGroup className="float-right my-2">
          <Toggle
            size="sm"
            className="rounded-sm bg-white font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 aria-pressed:bg-blue-200"
            aria-label="Toggle all"
          >
            All
          </Toggle>
          <Toggle
            size="sm"
            className="rounded-sm  bg-white font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300"
            aria-label="Toggle active"
          >
            Active
          </Toggle>

          <Toggle
            size="sm"
            className="rounded-sm bg-white font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50"
            aria-label="Toggle completed"
          >
            Completed
          </Toggle>
        </ButtonGroup>
      </div>

      <ul role="list" className="todo-list my-2" aria-labelledby="list-heading">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="todo flex w-full my-1 inset-shadow-sm inset-shadow-indigo-200/40"
          >
            <Button className="complete px-0 py-0 my-0 mx-0 border-0 rounded-l-lg bg-green-500">
              <Check className="size-3" />
            </Button>
            <div className="inline-block w-2/3 h-6 text-align-left">{todo}</div>
            <ButtonGroup className="py-0 px-1 h-6 inline-block w-1/3 text-right rounded-r-none">
              <Button className="bg-green-500 px-1 h-6 border-0 rounded-l-sm">
                <SquarePen className="" />
              </Button>
              <Button
                className="bg-red-500 px-1 h-6 border-0 rounded-r-sm"
                onClick={() => handleRemoveTodo(index)}
              >
                <Trash2Icon className="" />
              </Button>
            </ButtonGroup>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
