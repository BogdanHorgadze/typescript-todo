import React, { useRef, useState, useEffect } from 'react'
import { ITodo } from '../../interfaces'
import List from '../List/List'
import styles from './Main.module.css';

const Main: React.FC = () => {
    type Data = string | null
    
    const [todo, setTodo] = useState<ITodo[]>([])
    const ref = useRef<HTMLInputElement>(null)

    useEffect(()=> {
        const todo : Data = localStorage.getItem('todo')
        if(todo){
            setTodo(JSON.parse(todo))
        }
    },[])

    useEffect(()=> {
        localStorage.setItem('todo',JSON.stringify(todo))
    },[todo])

    const onPressHandler = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && ref.current!.value.length) {
            const data = {
                id: Date.now(),
                value: ref.current!.value,
                checked: false,
                edit: false
            }
            setTodo([...todo, data])
        }
    }

    const onAddHandler = () => {
        if (ref.current!.value.length) {
            const data = {
                id: Date.now(),
                value: ref.current!.value,
                checked: false,
                edit: false
            }
            setTodo([...todo, data])
        }
    }

    const onChekedChange = (id: number) => {
        setTodo(prev => prev.map(todo => {
            if (todo.id === id) {
                todo.checked = !todo.checked
            }
            return todo
        }))
    }

    const showEditHandler = (id: number) => {
        setTodo(prev => prev.map(todo => {
            if (todo.id === id) {
                todo.edit = !todo.edit
            }
            return todo
        }))
    }

    const onRemoveHandler = (id: number) => {
        setTodo(prev => prev.filter(item => item.id !== id))
    }

    const editHandler = (id: number, value: string) => {
        setTodo(prev => prev.map(todo => {
            if (todo.id === id) {
                todo.value = value
            }
            return todo
        }))
    }

    return (
        <div className={styles.container}>
            <input ref={ref} type="text" onKeyPress={onPressHandler} />
            <button onClick={onAddHandler}>send</button>
            <List data={todo}
                editHandler={editHandler}
                showEditHandler={showEditHandler}
                onRemoveHandler={onRemoveHandler}
                onChekedChange={onChekedChange} />
        </div>
    )
}

export default Main