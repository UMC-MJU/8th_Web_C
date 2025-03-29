import { TTodo } from "../types/todo";

interface TodoListProps {
  title: string;
  todos?: TTodo[];
  buttonLable: string;
  buttonColor: string;
  onClick: (todo: TTodo) => void;
}

const TodoList = ({
  title,
  todos,
  buttonLable,
  buttonColor,
  onClick,
}: TodoListProps): any => {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul id="todo-list" className="reder-container__list">
        {todos?.map((todo): any => (
          <li key={todo.id} className="render-container__item">
            <span className="render-container__item-text">{todo.text}</span>
            <button
              onClick={(): void => onClick(todo)}
              style={{
                backgroundColor: buttonColor,
              }}
              className="render-container__item-button"
            >
              {buttonLable}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
