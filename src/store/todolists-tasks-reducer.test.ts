import {TasksStateType, TodoListType} from "../App";
import {AddTodoListAC, todolistReducer} from "./todolist-reducer";
import {taskReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = AddTodoListAC("new todolist");

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoListID);
    expect(idFromTodolists).toBe(action.todoListID);
});
