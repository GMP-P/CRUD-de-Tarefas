import { Database } from "./database.js"
import { randomUUID } from "node:crypto"
import { buildRoutePath } from "./utils/build-route-path.js"
import { type } from "node:os"

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query
            const tasks = database.select('tasks', search ? {
                title: search,
                description: search,
            } : null)
            

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            if (req.body != null){
                const {title, description} = req.body
                if (title && description){
                    const now = new Date().toISOString()
                    const task = {
                    id: randomUUID(),
                    title,
                    description,
                    completed_at: null,
                    created_at: now,
                    updated_at: now
                    }
                    database.insert('tasks', task)
                
                    return res
                    .writeHead(201).end()
                }
                return res
                    .writeHead(400, { 'Content-Type': 'application/json' })
                    .end(JSON.stringify({
                        error: 'title and description are required'
                    }))
            }
            return res
            .writeHead(400, {'Content-Type' : 'application/json' })
            .end(JSON.stringify({
                error: 'Invalid JSON'
            }))
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {    
            const { id } =  req.params
            if (req.body != null){
                const { title, description} = req.body
                if (title != undefined || description != undefined){
                    const tasks = database.select('tasks')
                    const task = tasks.find(t => t.id === id)

                    if (task){
                        const now = new Date().toISOString()

                        const updatedTask = {
                            ...task,
                            title: title ?? task.title,
                            description: description ?? task.description,
                            updated_at: now
                        }
                        database.update('tasks', id, updatedTask)

                        return res.writeHead(204).end()
                    }
                    return res
                    .writeHead(404, {'Content-Type' : 'application/json' })
                    .end(JSON.stringify({
                        error: 'Task not found'
                    }))
                }
                return res
                .writeHead(400, {'Content-Type' : 'application/json' })
                .end(JSON.stringify({
                error: 'Nothing to update'
                }))
            }
            return res
            .writeHead(400, {'Content-Type' : 'application/json' })
            .end(JSON.stringify({
                error: 'Invalid JSON'
            }))
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } =  req.params
            const tasks = database.select('tasks')
            const task = tasks.find(t => t.id === id)
            if (task){
                database.delete('tasks', id)

                return res.writeHead(204).end()
            }
            return res
            .writeHead(404, {'Content-Type' : 'application/json' })
            .end(JSON.stringify({
                error: 'Task not found'
            }))
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) =>{
            const { id } =  req.params
            const tasks = database.select('tasks')
            const task = tasks.find(t => t.id === id)
            if (task){
                const now = new Date().toISOString()

                if(task.completed_at == null){
                    const updatedTask = {
                    ...task,
                    updated_at: now,
                    completed_at: now
                }
                database.update('tasks', id, updatedTask)

                return res.writeHead(204).end()
                }
                const updatedTask = {
                    ...task,
                    updated_at: now,
                    completed_at: null
                }
                database.update('tasks', id, updatedTask)

                return res.writeHead(204).end()
            }
            return res
            .writeHead(404, {'Content-Type' : 'application/json' })
            .end(JSON.stringify({
                error: 'Task not found'
            }))
        }
    }
    
]