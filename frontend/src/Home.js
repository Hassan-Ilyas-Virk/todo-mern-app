import React, { useEffect, useState } from 'react';
import Create from './Create';
import './App.css';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill, BsPencil, BsCheckLg } from 'react-icons/bs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [updatetask, setUpdatetask] = useState('');
    const [taskid, setTaskid] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const edit = (id) => {
        axios.put(`http://localhost:5000/edit/${id}`)
            .then(result => {
                const updatedTodos = todos.map(todo => {
                    if (todo._id === id) {
                        return { ...todo, done: !todo.done };
                    }
                    return todo;
                });
                setTodos(updatedTodos);
            })
            .catch(err => console.log(err));
    };

    const Update = (id, updatedTask) => {
        axios.put(`http://localhost:5000/update/${id}`, { task: updatedTask })
            .then(result => {
                const updatedTodos = todos.map(todo => {
                    if (todo._id === id) {
                        return { ...todo, task: updatedTask };
                    }
                    return todo;
                });
                setTodos(updatedTodos);
                setTaskid('');
                setUpdatetask('');
            })
            .catch(err => console.log(err));
    };

    const Hdelete = (id) => {
        if (window.confirm('Are you sure you want to delete this TODO item?')) {
            axios.delete(`http://localhost:5000/delete/${id}`)
                .then(result => {
                    const updatedTodos = todos.filter(todo => todo._id !== id);
                    setTodos(updatedTodos);
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <main>
            <Create />
            {
                todos.length === 0 ? <div className='task'>No tasks found</div> :
                    todos.map((todo) => (
                        <div className='task' key={todo._id}>
                            <div className='checkbox'>
                                {todo.done
                                    ? <BsFillCheckCircleFill className='icon' />
                                    : <BsCircleFill className='icon' onClick={() => edit(todo._id)} />}
                                {taskid === todo._id ? (
                                    <input
                                        type='text'
                                        value={updatetask}
                                        onChange={e => setUpdatetask(e.target.value)}
                                    />
                                ) : (
                                    <p className={todo.done ? 'through' : 'normal'}>
                                        {todo.task}
                                    </p>
                                )}
                            </div>
                            <div className='actions'>
                                <small className='timestamp'>
                                    Created {dayjs(todo.createdAt).fromNow()}
                                </small>
                                <span>
                                    {taskid === todo._id ? (
                                        <BsCheckLg
                                            className='icon'
                                            onClick={() => Update(todo._id, updatetask)}
                                        />
                                    ) : (
                                        <BsPencil
                                            className='icon'
                                            onClick={() => {
                                                setTaskid(todo._id);
                                                setUpdatetask(todo.task);
                                            }}
                                        />
                                    )}
                                    <BsFillTrashFill className='icon' onClick={() => Hdelete(todo._id)} />
                                </span>
                            </div>
                        </div>
                    ))
            }
        </main>
    );
};

export default Home;

