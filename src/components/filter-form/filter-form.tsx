import { FC } from "react";
import styles from "./filter-form.module.scss";
import SearchIcon from "../../images/search.svg";

type TProps = {
  filter: string;
  sort: string;
  setFilter: (s: string) => void;
  setSort: (s: string) => void;
}

const FilterForm: FC<TProps> = ({filter, sort, setFilter, setSort}) => {
  return ( 
  <div className={styles.controls}>
    <div className={styles['input-container']}>
      <input className={styles['search-input']} placeholder="Поиск по названию" value={filter} onChange={(e) => setFilter(e.target.value)} />
      <div className={styles['search-icon']}>
        <SearchIcon />
      </div>
    </div>
    <select value={sort} onChange={(e) => setSort(e.target.value)}>
      <option value="">стандарт</option>
      <option value="created +">сначала старые</option>
      <option value="created -">сначала новые</option>
      <option value="priority +">приоритет воз.</option>
      <option value="priority -">приоритет уб.</option>
      <option value="name +">имя воз.</option>
      <option value="name -">имя уб.</option>
    </select>
  </div> );
}

export default FilterForm;
