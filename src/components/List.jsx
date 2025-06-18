import { useState } from 'react';
import TodoItem from '../components/TodoItem';

const List = ({ todoData, onChangeChecked, onRemoveTodo }) => {
  const [search, setSearch] = useState('');
  const [completeTodo, setCompleteTodo] = useState(false);

  const onChangeSearched = (e) => {
    setSearch(e.target.value);
  };

  const onCheckingCompleteTodo = (e) => {
    setCompleteTodo(e.target.checked);
  };

  const todosFiltered = todoData.filter((todo) => {
    const searchMatch = todo.content
      .toLowerCase()
      .includes(search.toLowerCase()); //include는 '' 빈 문자열로 true 반환
    const completeTodoMatch = completeTodo ? todo.isChecked : true;

    return searchMatch && completeTodoMatch; //return값은 todo 개별요소의 판단이고, 모두 true여야 true를 반환
  });
  const completeTodoLength = todoData.filter((todo) => todo.isChecked).length;
  const incCompleteTodoLength = todoData.length - completeTodoLength;

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
      <div className="sort">
        <dl>
          <dt>완료된 할 일</dt>
          <dd>{completeTodoLength}개</dd>
        </dl>
        <dl>
          <dt>미완료된 할 일</dt>
          <dd>{incCompleteTodoLength}개</dd>
        </dl>
        <span>
          <input
            type="checkbox"
            id="checkbox"
            checked={completeTodo}
            onChange={onCheckingCompleteTodo}
          />
          <label htmlFor="checkbox">완료된 할 일</label>
        </span>
      </div>
      <ul className="todo-list">
        {todosFiltered.map((todo) => {
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
