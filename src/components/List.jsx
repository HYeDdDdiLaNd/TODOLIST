import { useMemo, useState, useContext } from 'react';
import TodoItem from '../components/TodoItem';
import { TodoStateContext } from '../App';

const List = () => {
  const todoData = useContext(TodoStateContext);
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

  const { totalTodoLength, completeTodoLength, incCompleteTodoLength } =
    useMemo(() => {
      //딱 한번만 수행
      //3. 연산의 값을 반환해주기 때문에 그 값을 변수에 담아서 받을 수 있고, 구조 분해 할당도 가능하다.

      //1. 메모이제이션 하고 싶은 연산을 콜백으로 넣으면
      console.log('몇번 출력하냐');
      const totalTodoLength = todoData.length;
      const completeTodoLength = todoData.filter(
        (todo) => todo.isChecked
      ).length;
      const incCompleteTodoLength = totalTodoLength - completeTodoLength;

      return {
        totalTodoLength,
        completeTodoLength,
        incCompleteTodoLength, //2. 그 연산 값을 반화해준다.
      };
    }, [todoData]); //의존성 배열, 배열이 바뀌면 콜백을 실행, ; todoData가 바뀌면 실행.

  // const getAnalyzedData = () => {  이렇게 하면 리스트 내에서 검색창이 활성화 될 떄에도 불필요한 연산을 실행함. 그래서 useMemo 를 사용ㅇ하고
  //   const totalTodoLength = todoData.length;
  //   const completeTodoLength = todoData.filter((todo) => todo.isChecked).length;
  //   const incCompleteTodoLength = totalTodoLength - completeTodoLength;

  //   return {
  //     totalTodoLength,
  //     completeTodoLength,
  //     incCompleteTodoLength,
  //   };
  // };

  // const { totalTodoLength, completeTodoLength, incCompleteTodoLength } =
  //   getAnalyzedData();

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
          <dt>총 할 일</dt>
          <dd>{totalTodoLength}개</dd>
        </dl>
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
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </ul>
    </div>
  );
};
export default List;
