import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";
type AddItemFormPropsType = {
    addItem: (title: string) => void
}

//Создаем новую сущность
export const AddItemForm = React.memo ((props: AddItemFormPropsType) => {

    // Вынесли стили для input  в переменную
    const errorInputStyles = {border: "red 3px solid"}
    const errorStyle = {color: "red"}


    let [inputValue, setInputValue] = useState<string>("")
    let [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setError(false)
    }
    const AddItem = () => {
        if (inputValue.trim() !== "") {
            props.addItem(inputValue)
            setInputValue("")
        } else {
            setError(true)
            setInputValue("")
        }
    }
    const onPressKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (inputValue.trim() !== "") {
                props.addItem(inputValue)
                setInputValue("")
            } else {
                setError(true)
                setInputValue("")

            }
        }
    }

    const errorMessage = error && <div style={errorStyle}>Title is required!</div>

    return (
        <div>
            <TextField
                size={"small"}
                variant={"outlined"}
                value={inputValue}
                onChange={onChangeHandler}
                onKeyPress={onPressKeyHandler}
                label={'Title..'}
                error={error}
                helperText={errorMessage}
            />
            <IconButton onClick={AddItem} size={"small"} color={"primary"}>
                <AddBox fontSize={"large"}/>
            </IconButton>

            {/*{errorMessage}*/}
        </div>
    )
},)
