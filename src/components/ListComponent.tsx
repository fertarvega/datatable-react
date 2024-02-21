import { atom, useAtom } from "jotai";
import { listToDo } from "../App";
import { DeleteListComponent } from "./DeleteListComponent";

export const ListComponent = () => {
    const [ toDoList ] = useAtom(listToDo);
    
    return (
        <>
            {toDoList.list.map((item: any) => {
                return (
                    <div key={item.id}>
                        <h4>{item.name}</h4>
                        <DeleteListComponent id={item.id}/>
                    </div>
                )
            })}
        </>
    )
}