import { FC } from "react";
import styles from './todo-item.module.scss';
import { TTodo } from "../../utils/types";
import TodoMenu from "../todo-menu/todo-menu";
import Chevron from "../../images/chevron.svg";
import { useDispatch } from "../../services/hooks";
import { todosActions } from "../../services/reducers/todos";

type TProps = {
  todo: TTodo
}

const TodoItem: FC<TProps> = ({todo}) => {

  const dispatch = useDispatch();

  const updateTodo = (field: string, prop: string) =>  {
    dispatch(todosActions.changeTodo({...todo, [field]: prop}))
  };

  const updatePriority = (value: string) => {
    if(Number(value) > 0 && Number(value) < 100) {
      updateTodo('priority', value);
    } else if(Number(value) > 100) {
      updateTodo('priority', "99");
    } else if(Number(value) < 0 || value === "") {
      updateTodo('priority', "1");
    }
  };

  const increasePriority = () => {
    updatePriority(String(+todo.priority + 1));
  };

  const decreasePriority = () => {
    updatePriority(String(+todo.priority - 1));
  };

  return ( <article className={styles.todo}>
    <div className={styles.priority}>
      <button onClick={decreasePriority} className={`${styles.priority_changer} ${styles.decrease}`}><Chevron/></button>
      <input className={styles.priority_input} value={todo.priority} onChange={(e) =>updatePriority(e.target.value)}/>
      <button onClick={increasePriority} className={`${styles.priority_changer} ${styles.increase}`}><Chevron/></button>
    </div>
    <div className = {`${styles.content} ${styles[todo.status]}`}>
      <div className={styles.header}>
        <input className={styles.name} value={todo.name} onChange={(e) => updateTodo("name", e.target.value)}/>
        {todo.date && <span className={styles.date}>до {todo.date.replace('T', " ")}</span>}
        <div className={styles.menu}>
          <TodoMenu todo={todo} />
        </div>
      </div>
      <p className={styles.text}>{todo.text}</p>
    </div>
  </article> );
}

export default TodoItem;
