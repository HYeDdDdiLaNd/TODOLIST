import './App.css';
import Header from './components/Header';
import Edit from './components/Edit';
import List from './components/List';
import { useRef, useState, useReducer } from 'react';

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

//배열이나 객체로 된 복잡한 구조의 상태 관리는 useReducer를 사용하는게 일반적이고,
// 간단한 상태 관리는 useState를 사용한다.
function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE':
      return [action.data, ...state];

    case 'CHECKED':
      return state.map(
        (list) =>
          list.id === action.id ? { ...list, isChecked: action.checked } : list
        //...list는 spread의 우선순위
        //map의 return은 map에서 순회하는 각각의 요소 리턴을 의미함.
      );

    case 'DELETE':
      return state.filter((list) => list.id !== action.id);

    default:
      return state;
  }
} //reducer: 컴포넌트 바깥에서 상태 관리 가능.

function App() {
  const idCount = useRef(4);
  const [state, dispatch] = useReducer(reducer, mockTodoListData); // todo list 상태관리

  const onChangeChecked = (id, checked) => {
    dispatch({
      type: 'CHECKED',
      id: id,
      checked: checked,
    });
  };

  const onUpdateTodo = (addTodo) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id: `todo${idCount.current++}`,
        content: addTodo,
        date: new Date().toLocaleDateString(),
        isChecked: false,
      },
    });
  };

  const onRemoveTodo = (removeTodo) => {
    dispatch({
      type: 'DELETE',
      id: removeTodo,
    });
  };

  // const [lists, setList] = useState(mockTodoListData);
  // const onChangeChecked = (id, checked) => {
  //   setList(
  //     lists.map((list) => {
  //       if (list.id === id) {
  //         return {
  //           ...list, //spread의 우선순위
  //           isChecked: checked,
  //         };
  //       }
  //       return list; //map의 return은 map에서 순회하는 각각의 요소 리턴을 의미함.
  //     })
  //   );
  // };

  // const onUpdateTodo = (addTodo) => {
  //   setList([
  //     //배열.. 세팅 중요함...
  //     ...lists,
  //     {
  //       id: `todo${idCount.current++}`,
  //       content: addTodo,
  //       date: new Date().toLocaleDateString(),
  //       isChecked: false,
  //     },
  //   ]);
  // };

  // const onRemoveTodo = (removeTodo) => {
  //   setList(lists.filter((list) => list.id !== removeTodo));
  // };

  return (
    <div className="wrapper">
      <Header />
      <Edit onUpdateTodo={onUpdateTodo} />
      <List
        todoData={state}
        onChangeChecked={onChangeChecked}
        onRemoveTodo={onRemoveTodo}
      />
    </div>
  );
}

export default App;
