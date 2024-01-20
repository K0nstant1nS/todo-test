import { useState } from "react";
import { useSelector } from "../../services/hooks";
import { getTodos, getTodosSortFunc } from "../../utils";
import Form from "../form/form";
import TodoItem from "../todo-item/todo-item";
import styles from './app.module.scss';
import { TTodoStatus } from "../../utils/types";

function App() {
  const { data } = useSelector(getTodos);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [statusFilter, setStatusFilter] = useState<TTodoStatus | "">("");

  const filteredAndSorted = data
  .filter(item => item.name.startsWith(filter))
  .filter(item => !statusFilter || item.status === statusFilter)
  .sort(getTodosSortFunc(sort));

  const todos = filteredAndSorted.map((item) => {
    return <TodoItem key={item.id}  todo={item}/>
  })

  return ( <div className={styles.app}>
    <Form />
    <div className={styles.controls}>
      <input placeholder="Поиск по названию" value={filter} onChange={(e) => setFilter(e.target.value)} />
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">стандарт</option>
        <option value="created +">дата создания воз.</option>
        <option value="created -">дата создания уб.</option>
        <option value="priority +">приоритет воз.</option>
        <option value="priority -">приоритет уб.</option>
        <option value="name +">имя воз.</option>
        <option value="name -">имя уб.</option>
      </select>
      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as TTodoStatus | "")} className={styles.select_status}>
        <option value="">стандарт</option>
        <option value="active">активные</option>
        <option value="undone">просроченые</option>
        <option value="done">выполеные</option>
      </select>
    </div>
    {todos.length > 0 && 
      <div className={styles.todos}>
        {todos}
      </div>}
  </div> );
}

export default App;
