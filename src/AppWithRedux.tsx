import React, {useCallback, useReducer, useState} from 'react';
import './App.css';

import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
} from "./store/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TaskType, Todolist} from "./Todolist";

export type filterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: filterValuesType
}
export type TasksStateType = {
    [todoListID: string]: Array<TaskType>
}

export default AppWithRedux;

function AppWithRedux() {


    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()


    //id таски для удал     //ключ массива()
    const removeTask = useCallback((taskID: string, todoListID: string) => {
        let action = removeTaskAC(taskID, todoListID)
        dispatch(action)
    }, [dispatch])

    //тайтл новой задчи  //ключ массива()
    const addTask = useCallback((TaskTitle: string, todoListID: string) => {
        dispatch(addTaskAC(TaskTitle, todoListID))
    }, [dispatch])

    //Функия для изменения isDone у таски ( //id таски для chenge  //БУЛЕВО ЧЕКБОКСА  //ключ массива)
    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    }, [dispatch])

    //Создаем фунуцию для изменения тайтла у таски
    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, todoListID, title))
    }, [dispatch])

    //Меняем настройки фильтра сущности тудулиста
    const changeFilter = useCallback((filter: filterValuesType, todoListID: string) => {
        dispatch(ChangeTodoListFilterAC(todoListID, filter))
    }, [dispatch])

    //Создаем функцию для изменения тайтла
    const changeTodolistTitle = useCallback((title: string, todoListID: string) => {
        dispatch(ChangeTodoListTitleAC(todoListID, title))
    }, [dispatch])

    //----Функции удаляющие и добовляющие сущности тудулистов-----------
    const removeTodoList = useCallback((todoListID: string) => {
        let action = RemoveTodoListAC(todoListID)
        dispatch(action)
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        let action = AddTodoListAC(title)
        dispatch(action)
    }, [dispatch])


//UI--------------------------------------------------------------------------------------------------------------------
    // СОЗДАЕМ ОТРИСОВКУ НАШИХ ТУДУЛИСТОВ, МАПАЕМ СУЩНОСТИ, ФИЛТРУЕМ ПО ФИЛЬТРУ, ДАННЫЕ ИЗ ОБЪЕКТА СУЩНОСТИ ПЕРЕДАЕМ В <Todolist ..../> И ПЕРЕДАЕМ НА ОТРИСТОВКУ НУЖНЫЙ МАССИВ

    const todoListComponents = todolists.map(tl => {

        return (
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: "20px"}}>
                    <Todolist
                        // key={tl.id} //ВЕШАЕТСЯ НА ВСЕ ЭЛЕМЕНТЫ СПИСКА. ЭТО ДЛЯ React         Берем из сущности тудулиста ВО ВРЕМЯ МАПА => ПЕРЕНЕСЛИ key внешнему элементу т.к. ретурнеттся теперь масси гридов а не тудулистов
                        id={tl.id} //  Берем из сущности тудулиста ДЛЯ ПОНИМАНИЯ С КАКОЙ СУЩН РАБОТАЕМ(УДАЛЯЕМ, ДОБАВЛЯЕМ И ТД) ВО ВРЕМЯ МАПА !!! id нужен реакту для быстрой перерисовки и тд..
                        title={tl.title}  // Берем из сущности тудулиста ВО ВРЕМЯ МАПА
                        tasks={tasks[tl.id]} //Таски
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

