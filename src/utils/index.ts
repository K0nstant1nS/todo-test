import { RootState } from "../services/store"
import { TTodo } from "./types"

export const getTodos = (s: RootState) => {
  return s.todos
}


export const getTodosSortFunc = (sortString: string) => {
  const [param, direction] = sortString.split(" ");
  return (a: TTodo, b:TTodo) => {
  switch(param){
    case "created": {
      return direction === '+' && a.created > b.created ? 1 : -1;
    }
    case "name": {
      return direction === '+' && a.name > b.name ? 1 : -1;
    }
    case "priority": {
      return direction === '+' && Number(a.priority) > Number(b.priority) ? 1 : -1;
    }
    default: {
      return 1
    }
  }
}
}
