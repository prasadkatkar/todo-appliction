import { Todo } from "../constants"

const baseURL = "http://localhost:3000/api"

async function fetch_main(path:string){
    const res = await fetch (baseURL + path)


    if(!res.ok){
        throw new Error(`failed to fetch:${path}`)
    }

    const data = await res.json()
    console.log("data",data)
    return data
}

export async function getTodos():Promise<Array<Todo>>{
    return await fetch_main("/todos")
}
export async function getTodoById(id:string):Promise<Todo>{
    return await fetch_main("/todos/"+id)
}
