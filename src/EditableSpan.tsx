import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    setNewTitle: (title: string) => void
}

export const EditableSpan = React.memo ((props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>("")

    const onEditMode = () => {
        setEditMode(true)
        setInputValue(props.title)
    }
    const ofEditMode = () => {
        setEditMode(false)
        props.setNewTitle(inputValue)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }
    const onPressKeyAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            ofEditMode()
        }
    }

    return (         //OnBlur - событие когда инпут теряет фокус
        editMode                 //тут тернароное выражение
            ? <TextField
                style={{width: '130px'}}
                value={inputValue}
                onChange={onChangeHandler}
                onBlur={ofEditMode}
                autoFocus={true}
                onKeyPress={onPressKeyAddItem}
            />
            : <span onDoubleClick={onEditMode}>
                {props.title}
             </span>
    )
})