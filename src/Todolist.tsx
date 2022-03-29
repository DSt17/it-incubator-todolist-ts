import React, {ChangeEvent, useCallback} from "react";
import {filterValuesType, TasksStateType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type todolistProsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (value: filterValuesType, todoListID: string) => void
    addTask: (TaskTitle: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    filter: filterValuesType
    id: string
    removeTodoList: (todoListID: string) => void
    changeTodolistTitle: (title: string, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
}

export const Todolist = React.memo((props: todolistProsType) => {

    const onAddNewTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const filteredAll = useCallback(() => props.changeFilter("all", props.id),[props.id,props.changeFilter])
    const filteredActive = useCallback(() => props.changeFilter("active", props.id),[props.id,props.changeFilter])
    const filteredCompleted = useCallback(() => props.changeFilter("completed", props.id),[props.id,props.changeFilter])

    const changeTodolistTitle =  useCallback ((title: string) => {
        props.changeTodolistTitle(title, props.id)
    },[ props.changeTodolistTitle])

    let taskForRenderTodoList: Array<TaskType> = props.tasks
    if (props.filter === "active") {
        taskForRenderTodoList = taskForRenderTodoList.filter(t => t.isDone !== true)
    }
    if (props.filter === "completed") {
        taskForRenderTodoList = taskForRenderTodoList.filter(t => t.isDone !== false)
    }


    return (
        <div className={"borderTodolistBlock"}>
            <Typography align={"center"}
                        variant={'h6'}
                        style={{fontWeight: "bold"}}>
                <EditableSpan title={props.title} setNewTitle={changeTodolistTitle}/>
                <IconButton onClick={() => props.removeTodoList(props.id)}>
                    <Delete/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={onAddNewTask}/>
            <List>
                {
                    taskForRenderTodoList.map(t => {
                        return <Task
                            key={t.id}
                            todolistId={props.id}
                            task={t}
                            changeStatus={props.changeStatus}
                            changeTaskTitle={props.changeTaskTitle}
                            removeTask={props.removeTask}
                        />
                    })
                }
            </List>
            <div style={{display: "flex", justifyContent: "space-around"}}>
                <Button
                    variant={'contained'}
                    size={'small'}
                    disableElevation
                    color={props.filter === "all" ? "secondary" : "primary"}
                    onClick={filteredAll}>All</Button>
                <Button
                    variant={'contained'}
                    size={'small'}
                    disableElevation
                    color={props.filter === "active" ? "secondary" : "primary"}
                    onClick={filteredActive}>Active</Button>
                <Button
                    variant={'contained'}
                    size={'small'}
                    disableElevation
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    onClick={filteredCompleted}>Completed
                </Button>

            </div>
        </div>

    )
})