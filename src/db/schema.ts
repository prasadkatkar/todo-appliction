import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todosTable = sqliteTable("todos",{
    id:integer({
        mode:"number",
    }).primaryKey({
        autoIncrement:true
    }),
        title:text().notNull(),
        description:text(),
        completed:integer({
            mode:"boolean"
        }).default(false),
        created_at:integer({
            mode:"timestamp"
        }),
        updated_at:integer({
            mode:"timestamp"
        })
    
})