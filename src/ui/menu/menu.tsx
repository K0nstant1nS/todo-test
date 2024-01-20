import { FC } from "react";
import styles from './menu.module.scss'
import { TMenuOption } from "../../utils/types";

type TProps = {
  options: TMenuOption[]
}

const Menu: FC<TProps> = ({options}) => {
  return ( 
  <div className={styles.menu}>
    {options.map((item, index) => {
      return <button key={index} type="button" onClick={item.handler} className={styles.option}>{item.label}</button>
    })}
  </div> );
}

export default Menu;
