import { useState } from 'react';
import {v4 as uuid} from 'uuid';
import styles from './add-form.module.scss';
import { useDispatch } from '../../services/hooks';
import { todosActions } from '../../services/reducers/todos';

const initialFormState = {
  name: '',
  text: '',
}

function AddForm() {
  const [data, setData] = useState(initialFormState);
  const dispatch = useDispatch();

  const setInputData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const inputName = e.target.name;
    setData({...data, [inputName]: e.target.value})
  };

  const cleanForm = () => {
    setData(initialFormState);
  };

  const addTodo = () => {
    if(data.name) {
      dispatch(todosActions.addTodo({...data, id: uuid(), created: new Date(), priority: "1", status: "active"}));
      cleanForm();
    }
  };
  return ( 
  <form className={styles.form}>
    <input placeholder='Название' name="name" className={styles.name} type="text" value={data.name} onChange={setInputData}/>
    <div className={styles.buttons}>
      <button onClick={cleanForm} type="button" className={styles.clean}>Очистить</button>
      <button onClick={addTodo} type="button" className={styles.add} disabled={!data.name}>Добавить</button>
    </div>
    <textarea placeholder='Описание' name="text" className={styles.text} value={data.text} onChange={setInputData}/>
  </form> 
  );
}

export default AddForm;
