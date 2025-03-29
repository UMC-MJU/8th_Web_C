import "./App.css";
import Todo from "./components/Todo";
import { TodoProvider } from "./context/TodoContext";

function App(): any {
  return (
    <TodoProvider>
      <Todo />
    </TodoProvider>
  );
}

export default App;
