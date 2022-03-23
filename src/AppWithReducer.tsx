import React, {useReducer, useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistReducer
} from "./store/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./store/tasks-reducer";

export type filterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: filterValuesType
}
export type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

function AppWithReducer() {
//BLL:
    const todoListID1 = v1()
    const todoListID2 = v1()

    //СОЗДАЕМ СУЩНОСТЬ ТУДУЛИСТОВ (структура данных в которых будем хранить наши тудулисты)
    const [todoLists, dispatchToTodoLists] = useReducer(todolistReducer, [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ])
    // useState списка тасок ---> ПОМЕНЯЛИ НА UseReducer
    const [tasks, dispatchToTasks] = useReducer(taskReducer, {
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React JS", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: "Meet", isDone: true},
            {id: v1(), title: "Bear", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: false}
        ]
    })


    //id таски для удал     //ключ массива()
    function removeTask(taskID: string, todoListID: string) {
        let action = removeTaskAC(taskID, todoListID)
        dispatchToTasks(action)
    }

    //тайтл новой задчи  //ключ массива()
    function addTask(TaskTitle: string, todoListID: string) {
        dispatchToTasks(addTaskAC(TaskTitle, todoListID))
    }

    //Функия для изменения isDone у таски ( //id таски для chenge  //БУЛЕВО ЧЕКБОКСА  //ключ массива)
    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        dispatchToTasks(changeTaskStatusAC(taskID, isDone, todoListID))
    }

//Создаем фунуцию для изменения тайтла у таски
    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        dispatchToTasks(changeTaskTitleAC(taskID, todoListID, title))
    }

    //Меняем настройки фильтра сущности тудулиста
    function changeFilter(filter: filterValuesType, todoListID: string) {
        dispatchToTodoLists(ChangeTodoListFilterAC(todoListID, filter))
    }

    //Создаем функцию для изменения тайтла
    function changeTodolistTitle(title: string, todoListID: string) {
        dispatchToTodoLists(ChangeTodoListTitleAC(todoListID, title))
    }

//----Функции удаляющие и добовляющие сущности тудулистов-----------
    function removeTodoList(todoListID: string) {
        let action = RemoveTodoListAC(todoListID)
        dispatchToTasks(action)
        dispatchToTodoLists(action)
    }

    const addTodoList = (title: string) => {
        let action = AddTodoListAC(title)
        dispatchToTasks(action)
        dispatchToTodoLists(action)
    }


//UI--------------------------------------------------------------------------------------------------------------------
    // СОЗДАЕМ ОТРИСОВКУ НАШИХ ТУДУЛИСТОВ, МАПАЕМ СУЩНОСТИ, ФИЛТРУЕМ ПО ФИЛЬТРУ, ДАННЫЕ ИЗ ОБЪЕКТА СУЩНОСТИ ПЕРЕДАЕМ В <Todolist ..../> И ПЕРЕДАЕМ НА ОТРИСТОВКУ НУЖНЫЙ МАССИВ

    const todoListComponents = todoLists.map(tl => {
        //ФИЛЬТРУЕМ СПИСОК ТАСК( ЗАДАЧ) ДЛЯ ОТРИСОВКИ
        let taskForRenderTodoList: Array<TaskType> = tasks[tl.id]  // ПО УМОЛЧАНИЮ ДОЛЖЕН ПОПАСТЬ МАССИВ ТАСОК (в tasks) ИМЕННО ЭТОГО todolist-а...
        if (tl.filter === "active") {     //...У ЭТОГО tl МЫ ПРОВЕРИМ ЗНАЧ.ФИЛЬТ. И ЕСЛИ ОН "active"...
            taskForRenderTodoList = tasks[tl.id].filter(t => t.isDone !== true)//... ТО МЫ МОЖЕМ ЕГО ОТФИЛЬТРОВАТЬ
        }
        if (tl.filter === "completed") {
            taskForRenderTodoList = tasks[tl.id].filter(t => t.isDone !== false)
        }
        return (
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: "20px"}}>
                    <Todolist
                        // key={tl.id} //ВЕШАЕТСЯ НА ВСЕ ЭЛЕМЕНТЫ СПИСКА. ЭТО ДЛЯ React         Берем из сущности тудулиста ВО ВРЕМЯ МАПА => ПЕРЕНЕСЛИ key внешнему элементу т.к. ретурнеттся теперь масси гридов а не тудулистов
                        id={tl.id} //  Берем из сущности тудулиста ДЛЯ ПОНИМАНИЯ С КАКОЙ СУЩН РАБОТАЕМ(УДАЛЯЕМ, ДОБАВЛЯЕМ И ТД) ВО ВРЕМЯ МАПА
                        title={tl.title}  // Берем из сущности тудулиста ВО ВРЕМЯ МАПА
                        tasks={taskForRenderTodoList} //Таски которые необходимототбразить в тудулисте согласно фильтра
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeTaskStatus}
                        filter={tl.filter}  // Берем из сущности тудулиста ВО ВРЕМЯ МАПА
                        removeTodoList={removeTodoList}
                        changeTodolistTitle={changeTodolistTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                </Paper>
            </Grid>
        )
    })


// ОТРИСОВЫВАЕМ НАШ ТУДУЛИСТ( В НАШЕМ СЛУЧАЕ МАССИВ ТУДУЛИСТОВ В ПРИМЕРЕ ИХ ИЗНАЧАЛЬНО 2  (СУЩНОСТИ) )
    return (
        <div className="App">
            <AppBar position={"sticky"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "27px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListComponents}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithReducer;
