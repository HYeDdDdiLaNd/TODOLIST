import { useState } from 'react';

const TodoItem = ({
  id,
  content,
  date,
  isChecked,
  onChangeChecked,
  onRemoveTodo,
}) => {
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
export default TodoItem;
