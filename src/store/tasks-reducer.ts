import { TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodoListAT, removeTodoListAT} from "./todolist-reducer";

type removeTaskAT = {
    type: "REMOVETASK"
    id: string
    todolistId: string
}
type addTaskAT = {
    type: "ADDTASK"
    title: string
    todolistId: string
}
type changeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    idTask: string
    isDone: boolean
    todolistId: string
}
type changeTaskTitleAT = {
    type: "CHANGE_TASK_TITLE"
    id: string
    todolistId: string
    title: string
}


export type ActionType =
    addTaskAT
    | removeTaskAT
    | changeTaskStatusAT
    | changeTaskTitleAT
    | addTodoListAT
    | removeTodoListAT


const initialState:TasksStateType = {

}

export const taskReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVETASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)}
        }
        case "ADDTASK":
            return {...state,[action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]}
        case "CHANGE-TASK-STATUS":
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.idTask ? {...t, isDone: action.isDone} : t)}
        case "CHANGE_TASK_TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todoListID]: []}
        case "REMOVE-TODOLIST":
            // let {[action.id] : [], ...state1} = {...state}  Интерестный вариант удаления ретктуь state1
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        default:
            return state

    }
}

export const removeTaskAC = (id: string, todolistId: string): removeTaskAT => {
    return {
        type: "REMOVETASK",
        id: id,
        todolistId: todolistId
    }
}
export const addTaskAC = (title: string, todolistId: string): addTaskAT => {
    return {
        type: "ADDTASK",
        title: title,
        todolistId: todolistId
    }
}
export const changeTaskStatusAC = (idTask: string, isDone: boolean, todolistId: string): changeTaskStatusAT => {
    return {
        type: "CHANGE-TASK-STATUS",
        idTask,
        isDone,
        todolistId
    }
}
export const changeTaskTitleAC = (id: string, todolistId: string, title: string): changeTaskTitleAT => {
    return {
        type: "CHANGE_TASK_TITLE",
        id,
        todolistId,
        title
    }
}