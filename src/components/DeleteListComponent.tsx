import { useAtom } from "jotai";
import { listToDo } from "../App";

export const DeleteListComponent = (id: any) => {
    const [ toDoList, setToDoList ] = useAtom(listToDo)

    const DeleteToDo = () => {
        const newList = toDoList.list.filter((item) => item.id !== id.id)

        setToDoList((prevList) => ({
            totalList: prevList.totalList,
            list: newList
        }))
    }

    return (
        <>
            <button onClick={DeleteToDo}>Delete</button>
        </>
    )
}