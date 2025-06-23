import './App.css';
import Header from './components/Header';
import Edit from './components/Edit';
import List from './components/List';
import { useRef, useReducer, useCallback, createContext, useMemo } from 'react';

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

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function App() {
  const idCount = useRef(4);
  const [todoData, dispatch] = useReducer(reducer, mockTodoListData); // todo list 상태관리

  /* useReducer를 사용해서 외부에서 상태 관리 가능하게 한 로직 */
  // const onChangeChecked = (id, checked) => {
  //   dispatch({
  //     type: 'CHECKED',
  //     id: id,
  //     checked: checked,
  //   });
  // };

  // const onUpdateTodo = (addTodo) => {
  //   dispatch({
  //     type: 'UPDATE',
  //     data: {
  //       id: `todo${idCount.current++}`,
  //       content: addTodo,
  //       date: new Date().toLocaleDateString(),
  //       isChecked: false,
  //     },
  //   });
  // };

  // const onRemoveTodo = (removeTodo) => {
  //   dispatch({
  //     type: 'DELETE',
  //     id: removeTodo,
  //   });
  // };

  /* 기존 로직 */
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

  /* *useCallback 으로 함수 최적화
    최적화의 기준
    1. 기능 구현 먼저 > 이후 마지막에 최적화
    2. 사용자의 행동에 따라 개수가 많아지거나
    3. 함수를 많이 가지고 있는 컴포넌트 */

  const onChangeChecked = useCallback((id, checked) => {
    dispatch({
      type: 'CHECKED',
      id: id,
      checked: checked,
    });
  }, []); //빈 배열을 넣으면 최초 마운트 될때만 함수 생성. 함수 메모이제이션

  const onUpdateTodo = useCallback((addTodo) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id: `todo${idCount.current++}`,
        content: addTodo,
        date: new Date().toLocaleDateString(),
        isChecked: false,
      },
    });
  }, []); //빈 배열을 넣으면 최초 마운트 될때만 함수 생성. 함수 메모이제이션

  const onRemoveTodo = useCallback((removeTodo) => {
    dispatch({
      type: 'DELETE',
      id: removeTodo,
    });
  }, []); //빈 배열을 넣으면 최초 마운트 될때만 함수 생성. 함수 메모이제이션

  const memoization = useMemo(() => {
    return { onChangeChecked, onUpdateTodo, onRemoveTodo }; //함수 재생성 방지가 아님.(이건 useCallback으로 함.) 이 함수가 리렌더링될때마다 만들어내는 객체를 중복 생성 방지임.
  }, []);
  return (
    <div className="wrapper">
      <Header />
      <TodoStateContext.Provider value={todoData}>
        <TodoDispatchContext.Provider value={memoization}>
          <Edit />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
