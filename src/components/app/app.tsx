import { useState, useCallback } from "react";
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from "../../services/hooks";
import { getTodos, getTodosSortFunc } from "../../utils";
import TodoItem from "../todo-item/todo-item";
import styles from './app.module.scss';
import { TTodoStatus } from "../../utils/types";
import { todosActions } from "../../services/reducers/todos";
import AddForm from "../add-form/add-form";
import FilterForm from "../filter-form/filter-form";

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

  const onDragEnd = useCallback((result: DropResult) => {
    console.log(result);
    dispatch(todosActions.switchPosition({source: result.source.index, destination: result.destination?.index, sourceContainer: result.source.droppableId as TTodoStatus, targetContainer: result.destination?.droppableId as TTodoStatus }))
  }, []);


  return ( <><div className={styles.app}>
    <AddForm />
    <FilterForm filter={filter} sort={sort} setFilter={setFilter} setSort={setSort} />
  </div>
  <div className={styles.containers}>
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <div className={styles.container}>
          <h3 className={styles['container-title']}>Активные задачи</h3>
          <Droppable droppableId="active">
            {(provider) => <div ref={provider.innerRef} {...provider.droppableProps} className={styles.todos}>
              {filteredAndSortedActive.map((item, index) => {
                return <TodoItem key={item.id} todo={item} index={index} />;
              })}
              {provider.placeholder}
            </div>}
          </Droppable>
        </div>
        <div className={styles.container}>
        <h3 className={styles['container-title']}>Завершенные задачи</h3>
          <Droppable droppableId="done">
            {(provider) => <div ref={provider.innerRef} {...provider.droppableProps} className={styles.todos}>
              {filteredAndSortedDone.map((item, index) => {
                return <TodoItem key={item.id} todo={item} index={index} />;
              })}
              {provider.placeholder}
            </div>}
          </Droppable>
        </div>
      </DragDropContext>
    </div></> );
}

export default App;
