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
  const { active, done } = useSelector(getTodos);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  const filteredAndSortedActive = active
  .filter(item => item.name.startsWith(filter))
  .sort(getTodosSortFunc(sort));

  const filteredAndSortedDone = done
  .filter(item => item.name.startsWith(filter))
  .sort(getTodosSortFunc(sort));

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
    dispatch(todosActions.switchPosition({source: result.source.index, destination: result.destination?.index, sourceContainer: result.source.droppableId as TTodoStatus, targetContainer: result.destination?.droppableId as TTodoStatus }))
  }, []);


  return ( <><div className={styles.app}>
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
    </div>
  </div><div className={styles.containers}>
      <DragDropContext
        onBeforeDragStart={onBeforeDragStart}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragUpdate={onDragUpdate}
      >
        <Droppable droppableId="active">
          {(provider) => <div ref={provider.innerRef} {...provider.droppableProps} className={styles.todos}>
            {filteredAndSortedActive.map((item, index) => {
              return <TodoItem key={item.id} todo={item} index={index} />;
            })}
            {provider.placeholder}
          </div>}
        </Droppable>
        <Droppable droppableId="done">
          {(provider) => <div ref={provider.innerRef} {...provider.droppableProps} className={styles.todos}>
            {filteredAndSortedDone.map((item, index) => {
              return <TodoItem key={item.id} todo={item} index={index} />;
            })}
            {provider.placeholder}
          </div>}
        </Droppable>
      </DragDropContext>
    </div></> );
}

export default App;
