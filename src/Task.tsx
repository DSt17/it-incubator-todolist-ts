import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "./Todolist";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";


export type TasksPropsType = {
    todolistId: string
    task: TaskType
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    removeTask: (id: string, todoListID: string) => void
}

export const Task = React.memo(({
                                    task,
                                    removeTask,
                                    todolistId,
                                    changeTaskTitle,
                                    changeStatus
                                }: TasksPropsType) => {

    console.log("TAsk")

    const onClickRemoveTask = useCallback(() => {
        removeTask(task.id, todolistId)
    }, [removeTask, task.id, todolistId])

    const OnChangeCheckboxStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(task.id, (e.currentTarget.checked), todolistId)
    }, [changeStatus, task.id, todolistId])

    const changeTile = useCallback((title: string) => {
        changeTaskTitle(task.id, title, todolistId)
    }, [changeTaskTitle, task.id, todolistId])


    return <ListItem
        disableGutters
        divider
        style={{
            padding: "0px",
            display: "flex",
            justifyContent: "space-between"
        }}
        className={task.isDone ? "opacity" : ""} key={task.id}>
        <Checkbox
            color={"primary"}
            checked={task.isDone}
            onChange={OnChangeCheckboxStatus}
        />
        <EditableSpan title={task.title} setNewTitle={changeTile}/>
        <IconButton onClick={onClickRemoveTask}>
            <Delete fontSize={'small'}/>
        </IconButton>
    </ListItem>
})