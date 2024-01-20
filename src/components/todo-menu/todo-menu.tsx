import { FC, useState } from 'react';
import styles from './todo-menu.module.scss'
import MenuImage from '../../images/more.svg';
import { useDispatch } from '../../services/hooks';
import { todosActions } from '../../services/reducers/todos';
import Menu from '../../ui/menu/menu';
import { TTodo, TTodoStatus } from '../../utils/types';

type TProps = {
  todo: TTodo
}

const TodoMenu: FC<TProps> = ({todo}) => {
  const [isOpened, toggleMenu] = useState(false);
  const dispatch = useDispatch();

  const removeTodo = () => {
    dispatch(todosActions.removeTodo(todo.id))
  };

  const changeTodoStatus = (status: TTodoStatus) => {
    dispatch(todosActions.changeTodo({...todo, status: status}))
  }

  const menuData = [{label: "Удалить", handler: removeTodo}, {label: "Выполнено", handler: () => changeTodoStatus("done")}];

  return ( 
  <div className={styles.menu} onClick={() => toggleMenu(!isOpened)}>
    <MenuImage className={styles.menu_icon}/>
    {isOpened && <div className={styles.menu_modal}><Menu options={menuData}/></div>}
  </div>
  );
}

export default TodoMenu;
