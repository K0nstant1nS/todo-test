import { useState, useCallback, useMemo } from "react";
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
  const {active, done} = useSelector(getTodos);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  const filteredAndSortedActive = useMemo(() => active
  .filter(item => item.name.startsWith(filter))
  .sort(getTodosSortFunc(sort)), [active, filter, sort])

  const filteredAndSortedDone = useMemo(() => done
  .filter(item => item.name.startsWith(filter))
  .sort(getTodosSortFunc(sort)), [done, filter, sort])

  const filteredAndSortedTodos = {
    active: filteredAndSortedActive,
    done: filteredAndSortedDone
  }

  console.log(filteredAndSortedDone);

  const onDragEnd = useCallback((result: DropResult) => {
    // отмена если нет объекта-цели
    if(!result.destination) {
      return
    }
    // отмена если заданы параметры фильтрации или сортировки(дабы не влияло на стандартное состояние), срабатывает только перенос
    if((sort || filter) && result.destination.droppableId == result.source.droppableId) {
      return
    }
    const sourceTodo = filteredAndSortedTodos[result.source.droppableId as TTodoStatus][result.source.index];
    dispatch(todosActions.switchPosition({source: sourceTodo, destination: result.destination?.index, targetContainer: result.destination?.droppableId as TTodoStatus }))
  }, [filteredAndSortedActive, filteredAndSortedDone, done, active]);


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
