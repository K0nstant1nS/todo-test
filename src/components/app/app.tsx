import { useState, useCallback } from "react";
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from "../../services/hooks";
import { getTodos, getTodosSortFunc } from "../../utils";
import Form from "../form/form";
import TodoItem from "../todo-item/todo-item";
import styles from './app.module.scss';
import { TTodoStatus } from "../../utils/types";
import { todosActions } from "../../services/reducers/todos";

function App() {
  const { active } = useSelector(getTodos);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [statusFilter, setStatusFilter] = useState<TTodoStatus | "">("");

  const filteredAndSorted = active
  .filter(item => item.name.startsWith(filter))
  .filter(item => !statusFilter || item.status === statusFilter)
  .sort(getTodosSortFunc(sort));

  const todos = filteredAndSorted.map((item, index) => {
    return <TodoItem key={item.id}  todo={item} index={index}/>
  })

  const onBeforeDragStart = useCallback(() => {
  }, []);

  const onDragStart = useCallback(() => {
    /*...*/
  }, []);
  const onDragUpdate = useCallback(() => {
    /*...*/
  }, []);
  const onDragEnd = useCallback((result: DropResult) => {
    console.log(result);
    dispatch(todosActions.switchPosition({source: result.source.index, destination: result.destination?.index, sourceContainer: 'active', targetContainer: 'active' }))
  }, []);


  return ( <div className={styles.app}>
    <Form />
    <div className={styles.controls}>
      <input placeholder="Поиск по названию" value={filter} onChange={(e) => setFilter(e.target.value)} />
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="">стандарт</option>
        <option value="created +">сначала старые</option>
        <option value="created -">сначала новые</option>
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
    <DragDropContext
      onBeforeDragStart={onBeforeDragStart} 
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragUpdate={onDragUpdate}
    >
      <Droppable droppableId="active">
        {(provider) => <div ref={provider.innerRef} {...provider.droppableProps} className={styles.todos}>
            {filteredAndSorted.map((item, index) => {
              return <TodoItem key={item.id}  todo={item} index={index}/>
            })}
            {provider.placeholder}
        </div>}
      </Droppable>
    </DragDropContext>}
  </div> );
}

export default App;
