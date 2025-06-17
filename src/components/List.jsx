import { useState } from 'react';
import TodoItem from '../components/TodoItem';
// import CompleteTodoItem from '../components/CompleteTodoItem';

const List = ({ todoData, onChangeChecked, onRemoveTodo }) => {
  const [search, setSearch] = useState('');
  const onChangeSearched = (e) => {
    setSearch(e.target.value);
  };

  const searchFiltering = () => {
    if (search === '') return todoData;
    return todoData.filter((data) => {
      return data.content.toLowerCase().includes(search.toLowerCase());
    });
  };

  const searchFiltered = searchFiltering();

  return (
    <div className="list">
      <h4>Todo List 🌱</h4>
      <input
        type="text"
        className="search"
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={onChangeSearched}
      />
      <ul className="todo-list">
        {searchFiltered.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              onChangeChecked={onChangeChecked}
              onRemoveTodo={onRemoveTodo}
            />
          );
        })}
      </ul>
    </div>
  );
};
export default List;
