import { useState, useContext } from 'react';
import { TodoDispatchContext } from '../App';

const Edit = () => {
  const { onUpdateTodo } = useContext(TodoDispatchContext);
  const [addTodo, setAddTodo] = useState(''); // 간단한 상태관리 useState
  const setAddTodoEvent = (e) => {
    setAddTodo(e.target.value);
  };
  const addTodoList = () => {
    if (addTodo === '') {
      return;
    }
    onUpdateTodo(addTodo);
    setAddTodo('');
  };
  return (
    <div className="add-list">
      <input type="text" value={addTodo} onChange={setAddTodoEvent} />
      <button type="button" className="add" onClick={addTodoList}>
        추가
      </button>
    </div>
  );
};

export default Edit;
