import TodoItem from '../components/TodoItem';

const List = ({ todoData, onChangeChecked }) => {
  return (
    <div className="list">
      <h4>Todo List 🌱</h4>
      <input type="text" className="search" placeholder="검색어를 입력하세요" />
      <ul className="todo-list">
        {todoData.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              onChangeChecked={onChangeChecked}
            />
          );
        })}
      </ul>
    </div>
  );
};
export default List;
