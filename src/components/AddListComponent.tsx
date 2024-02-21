import { useState } from 'react'
import { useAtom } from "jotai";
import { listToDo } from "../App";

export const AddListComponent = () => {
    const [newToDo, setNewToDo] = useState("")
    const [ toDoList, setList ] = useAtom(listToDo)

    const addToList = () => {
        setList((prevList) => ({
            totalList: prevList.totalList + 1,
            list: [
                ...prevList.list,
                {
                    id: prevList.totalList + 1,
                    name: newToDo,
                    description: newToDo,
                },
            ],
        }));
    }   

    return (
        <>
            <div>
                <input type="text" value={newToDo} onChange={(e) => setNewToDo(e.target.value)} />
                <button onClick={addToList}>Add To-Do</button>
            </div>
        </>
    )
}