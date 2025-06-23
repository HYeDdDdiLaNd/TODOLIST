import { useState, memo, useContext } from 'react';
import { TodoDispatchContext } from '../App';

const TodoItem = ({ id, content, date, isChecked }) => {
  const { onChangeChecked, onRemoveTodo } = useContext(TodoDispatchContext);
  const [checked, setChecked] = useState(isChecked);
  const inputOnchange = (e) => {
    setChecked((e.target.checked = !checked));
    onChangeChecked(id, e.target.checked); //비동기라 이 시점에서 useState의 checked를 쓸 수 없음.
  };

  const onRemove = () => {
    onRemoveTodo(id);
  };
  return (
    <li>
      <span className="left">
        <input
          type="checkbox"
          name=""
          value={checked}
          onChange={inputOnchange}
          checked={checked}
          id={id}
        />
        <label htmlFor={id}>{content}</label>
      </span>
      <span className="right">
        <span className="date">{date}</span>
        <button type="button" onClick={onRemove}>
          삭제
        </button>
      </span>
    </li>
  );
};

//memo메서드는 얕은 비교를 함
//app 컴포넌트가 리렌더링되면 app 컴포넌트가 가지고 있는 함수(업데이트, 수정, 삭제)가 다시 생성됨.
//id, content, date, isChecked props가 변경되면 TodoItem 컴포넌트가 리렌더링 되어야하는데,
//업데이트, 수정, 삭제 함수까지는 재생성됨, 그러지 않아도 되는데...
// 그래서 아래와 같이 콜백으로 하거나
//useCallback 훅으로 함수 재생성을 방지함.

// export default memo(TodoItem, (prevProps, nextProps) => {
//   if (prevProps.id !== nextProps.id) return false;
//   if (prevProps.content !== nextProps.content) return false;
//   if (prevProps.date !== nextProps.date) return false;
//   if (prevProps.isChecked !== nextProps.isChecked) return false;

//   return true;
// });
export default TodoItem;
