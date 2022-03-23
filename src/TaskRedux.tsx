import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "./Todolist";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TasksStateType} from "./AppWithRedux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";


export type TasksPropsType = {
    todolistId: string
    taskId: string


}

export const TaskRedux = React.memo(({
                                    todolistId,
                                    taskId
}: TasksPropsType) => {

const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId]
    .filter(t => t.id === taskId)[0])

const dispatch  = useDispatch()




    const onClickRemoveTask = useCallback(() => {
        dispatch(removeTaskAC(taskId, todolistId))
    }, [ taskId, todolistId])

    const OnChangeCheckboxStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(taskId, (e.currentTarget.checked), todolistId))
    }, [ task.id, todolistId])

    const changeTile = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(taskId, todolistId, title))
    }, [ task.id, todolistId])


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