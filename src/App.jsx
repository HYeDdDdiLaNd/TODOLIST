import './App.css';
import Header from './components/Header';
import Edit from './components/Edit';
import List from './components/List';
import { useRef, useState } from 'react';

function App() {
  const mockTodoListData = [
    {
      id: 'todo1',
      content: '빨래하기',
      date: new Date().toLocaleDateString(),
      isChecked: false,
    },
    {
      id: 'todo2',
      content: '운동하기',
      date: new Date().toLocaleDateString(),
      isChecked: false,
    },
    {
      id: 'todo3',
      content: 'react공부하기',
      date: new Date().toLocaleDateString(),
      isChecked: false,
    },
  ];

  // todo list 상태관리
  const [lists, setList] = useState(mockTodoListData);
  const idCount = useRef(4);
  const onChangeChecked = (id, checked) => {
    setList(
      lists.map((list) => {
        if (list.id === id) {
          return {
            ...list, //spread의 우선순위
            isChecked: checked,
          };
        }
        return list; //map의 return은 map에서 순회하는 각각의 요소 리턴을 의미함.
      })
    );
  };

  const onUpdateTodo = (addTodo) => {
    setList([
      //배열.. 세팅 중요함...
      ...lists,
      {
        id: `todo${idCount.current++}`,
        content: addTodo,
        date: new Date().toLocaleDateString(),
        isChecked: false,
      },
    ]);
  };

  const onRemoveTodo = (removeTodo) => {
    setList(lists.filter((list) => list.id !== removeTodo));
  };

  return (
    <div className="wrapper">
      <Header />
      <Edit onUpdateTodo={onUpdateTodo} />
      <List
        todoData={lists}
        onChangeChecked={onChangeChecked}
        onRemoveTodo={onRemoveTodo}
      />
    </div>
  );
}

/* **
  1. 목업 데이터 만들고 임시 리스트 세팅해보기 @
  2. 할 일 인풋 기능 추가 버튼 시 목업 데이터에 추가하기 
    2-1. 인풋 입력된 상태 관리하기 @
    2-2. 추가 버튼 하면 데이터에 추가되기 @
    2-3. 추가된 데이터가 그려지는지? @
    2-4. 추가하면 인풋 리셋 @

  3. 체크박스 수정하기 @
  4. 검색 시 리스트 필터 돌리기 @
    4-1. 대소문자 구분하지 않고 @

  5. 삭제 기능 추가히기 @
    5-1. 삭제 기능 @

  6. 완로된 할 일 체크하기
    6-1. 완료된 항목 / 미 완료된 항목 카운트하기

  7. useReducer / useMemo / react.memo 훅 활용하기
  8. 가능하다면 7에서 완료된 항목을 따로 리스트로 그리는 기능 추가해보기

  
*/
export default App;
