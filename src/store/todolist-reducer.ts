import {filterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type removeTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type addTodoListAT = {
    type: "ADD-TODOLIST"
    todoListID:string
    title: string

}
export type changeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string,
    title: string
}
export type changeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string,
    filter: filterValuesType
}


const initialState:Array<TodoListType> = []

export type ActionType = removeTodoListAT | addTodoListAT | changeTodoListTitleAT | changeTodoListFilterAT

export const todolistReducer = (state = initialState, action: ActionType): Array<TodoListType> => {

        switch (action.type) {
            case "REMOVE-TODOLIST":
                return state.filter(tl => tl.id !== action.id)
            case "ADD-TODOLIST":
                return [...state, {id: action.todoListID, title: action.title, filter: "all"}]
            case "CHANGE-TODOLIST-TITLE":
                return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
            case "CHANGE-TODOLIST-FILTER":
                return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
            default:
                return state

        }
    }

export const RemoveTodoListAC = (id: string): removeTodoListAT => {
    return {
        type: "REMOVE-TODOLIST",
        id: id
    }
}
export const AddTodoListAC = (title: string): addTodoListAT => {
    return {
        type: "ADD-TODOLIST",
        todoListID:v1(),
        title: title
    }
}
export const ChangeTodoListTitleAC = (id: string, title: string): changeTodoListTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        id: id,
        title: title
    }
}
export const ChangeTodoListFilterAC = (id: string, filter: filterValuesType): changeTodoListFilterAT => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id: id,
        filter: filter
    }
}