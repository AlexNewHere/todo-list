import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {FullInput} from './Components/FullInput';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TasksStateType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todoLists, setTodolists] = useState<Array<TasksStateType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    });

    const editTodoList = (todolistId: string, newTitle: string) => {
        setTodolists(todoLists.map(el=>el.id=== todolistId ? {...el, title: newTitle} : el))
    }

    const addTodoList = (title: string) => {
        let newId = v1();
        setTodolists([{id: newId, title: title, filter: 'all'}, ...todoLists])
        setTasks({...tasks, [newId]: []})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todoLists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId];
    }

    function removeTask(todolistId: string, taskID: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskID)})
    }

    function addTask(todolistId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone} : el)})
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodolists(todoLists.map(el => (el.id === todolistId) ? {...el, filter: value} : el))
    }
    const editTask = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks( {...tasks, [todolistId]: tasks[todolistId].map(el=>el.id===taskId? {...el, title: newTitle}: el)})
    }

    return (

        <div className="App">
            <FullInput callback={addTodoList}/>
            {todoLists.map((el) => {

                let tasksForTodolist = tasks[el.id];

                if (el.filter === 'active') {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === 'completed') {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                }

                return (
                    <Todolist
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodolist={removeTodolist}
                        editTodoList={editTodoList}
                        editTask={editTask}
                    />
                )
            })
            }

        </div>
    );
}

export default App;
