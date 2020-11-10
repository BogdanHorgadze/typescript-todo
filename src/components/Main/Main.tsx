import React, { useRef, useState } from 'react'
import { ITodo } from '../../interfaces'
import List from '../List/List'

const Main: React.FC = () => {

    const [todo, setTodo] = useState<ITodo[]>([])
    const ref = useRef<HTMLInputElement>(null)

    const onPressHandler = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            const data = {
                id: Date.now(),
                value: ref.current!.value,
                checked: false
            }
            setTodo([...todo, data])
        }
    }

    const onAddHandler = () => {
        const data = {
            id: Date.now(),
            value: ref.current!.value,
            checked: false
        }
        setTodo([...todo, data])
    }

    const onChekedChange = (id: number) => {
        setTodo(prev => prev.map(todo => {
            if (todo.id === id) {
                todo.checked = !todo.checked
            }
            return todo
        }))
    }

    return (
        <div className='container'>
            <input ref={ref} type="text" onKeyPress={onPressHandler} />
            <button onClick={onAddHandler}>send</button>
            <List data={todo} onChekedChange={onChekedChange} />
        </div>
    )
}

export default Main