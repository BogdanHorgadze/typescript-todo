import React from 'react'
import { ITodo } from '../../interfaces'
import styles from "./List.module.css";
import classNames from 'classnames'

interface TodoListProps {
    data: ITodo[],
    onChekedChange(id: number): void,
    onRemoveHandler(id: number): void,
    showEditHandler(id: number): void,
    editHandler(id: number, value: string): void
}

const List: React.FC<TodoListProps> = ({ data, onChekedChange, onRemoveHandler, showEditHandler, editHandler }) => {
    return (
        <div>
            <ul>
                {data.map((item, i) => {
                    return (
                        <div key={i} className={classNames(styles.todo, { [styles.done]: item.checked })}>
                            {
                                item.edit
                                    ? <input type="text" onChange={(event: React.ChangeEvent<HTMLInputElement>) => editHandler(item.id, event.target.value)} defaultValue={item.value} />
                                    : <li>{item.value}</li>
                            }
                            <div>
                                <label>
                                    <input type="checkbox" checked={item.checked} onChange={() => onChekedChange(item.id)} />
                                    <span>Filled in</span>
                                </label>
                                {
                                    !item.checked
                                    ? <button onClick={() => showEditHandler(item.id)}>edit</button>
                                    : null
                                }
                                <span onClick={() => onRemoveHandler(item.id)} className={styles.delete}>⌫</span>
                            </div>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

export default List
