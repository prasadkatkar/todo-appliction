export type Todo={
    id:number;
    title:string;
    description:string;
    completed:boolean;
}

export const fakeTodos:Array<Todo>=[{
    id:1,
    title:"todo 1",
    description:"description 1",
    completed:false,
},
{
    id:2,
    title:"todo 2",
    description:"description 2",
    completed:false,
},
{
    id:3,
    title:"todo 3",
    description:"description 3",
    completed:true,
},
{
    id:4,
    title:"todo 4",
    description:"description 4",
    completed:true,
}
]