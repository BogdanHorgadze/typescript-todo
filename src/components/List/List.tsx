import React from 'react'
import { ITodo } from '../../interfaces'

interface TodoListProps {
    data: ITodo[],
    onChekedChange(id: number): void,
}

const List: React.FC<TodoListProps> = ({ data, onChekedChange }) => {
    console.log(data)
    return (
        <div>
            <ul>
                {data.map((item, i) => {
                    return (
                        <div key={i}>
                            <li>{i + 1} : {item.value}</li>
                            <input type="checkbox" checked={item.checked} onChange={() => onChekedChange(item.id)} />
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

export default List
