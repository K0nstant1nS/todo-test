import { RootState } from "../services/store"
import { TTodo } from "./types"

export const getTodos = (s: RootState) => {
  return s.todos
}


export const getTodosSortFunc = (sortString: string) => {
  return (a: TTodo, b:TTodo) => {
  switch(sortString){
    case "created+": {
      return a.created.getTime() > b.created.getTime() ? 1 : -1;
    }
    case "created-": {
      return a.created.getTime() > b.created.getTime() ? -1 : 1;
    }
    case "name+": {
      return a.name > b.name ? 1 : -1;
    }
    case "name-": {
      return a.name > b.name ? -1 : 1;
    }
    case "priority+": {
      return Number(a.priority) > Number(b.priority) ? 1 : -1;
    }
    case "priority-": {
      return Number(a.priority) > Number(b.priority) ? -1 : 1;
    }
    default: {
      return 1
    }
  }
}
}
