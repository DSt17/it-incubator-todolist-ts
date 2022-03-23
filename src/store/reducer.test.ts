import {ActionType, calculator,sum} from "./reducer";

test("sum", ()=>{
    // 1 Тестовые данные
    const num1 = 10
    const num2 = 12
    //2 выполнение тестируемого кода
    const result = sum(num1,num2)
    //3 Сравнение с ожидаемым результатом
    expect(result).toBe(22)
} )
test("sum of calculator", ()=>{
    // 1 Тестовые данные
    const num1 = 10
    const num2 = 12

    //2 выполнение тестируемого кода
    const action:ActionType = {type:"SUM", number: num2}
    const result = calculator(num1,action)

    //3 Сравнение с ожидаемым результатом
    expect(result).toBe(22)
} )
test("mult of calculator", ()=>{
    // 1 Тестовые данные
    const num1 = 10
    const num2 = 12

    //2 выполнение тестируемого кода
    const action:ActionType = {type:"MULT", number: num2}
    const result = calculator(num1,action)

    //3 Сравнение с ожидаемым результатом
    expect(result).toBe(120)
} )
test("sub of calculator", ()=>{
    // 1 Тестовые данные
    const num1 = 10
    const num2 = 12

    //2 выполнение тестируемого кода
    const action:ActionType = {type:"SUB", number: num2}
    const result = calculator(num1,action)

    //3 Сравнение с ожидаемым результатом
    expect(result).toBe(-2)
} )
test("div of calculator", ()=>{
    // 1 Тестовые данные
    const num1 = 10
    const num2 = 12

    //2 выполнение тестируемого кода
    const action:ActionType = {type:"DIV", number: num1}
    const result = calculator(num1,action)

    //3 Сравнение с ожидаемым результатом
    expect(result).toBe(1)
} )
test("exp of calculator", ()=>{
    const action:ActionType = {type:"EXP", number: 10}
    expect(calculator(10,action)).toBe(10000000000)
} )

test("sunSub", () => {
    let action:ActionType = {
        type:"SUMSUB",
        number:10
    }
    expect(calculator(100,action)).toBe(110)
})

