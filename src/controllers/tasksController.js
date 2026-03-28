import * as taskService from '../services/taskService.js';

export const createTask = async (req,res, next)=>{
    try {
        const {title, description} = req.body;

        if(!title){
            return res.status(400).json({message:"Title is required"})
        }
        const task = await taskService.createTask({
            title,
            description,
            userId: Number(req.user.id),
        })
        res.status(201).json({
            status: "Success",
            data: task,
        })
    } catch (error) {
        next(error)
    }
};

export const updateTask = async (req,res,next) => {
        try {
            const taskId = Number(req.params.id);
            const updatedTask = await taskService.updateTask(taskId,req.body);
            res.status(200).json({
                message: "Task Updated",
                data: updatedTask
            })
        } catch (error) {
            next(error)
        }
}
export const getUserWithTask = async (req,res,next) => {
    try {
        const userId = Number(req.params.id)
        const userTask = await taskService.getUserWithTask(userId)
        if(!userId){
            return res.status(404).json({Message: "User not Found"})
        }
        const {password, email, ...safeUser} = userTask
        res.status(200).json({
            data: safeUser
        })
    } catch (error) {
        next(error)
    }
}

export const getMyTasks = async (req,res,next)=>{
    try {
        const tasks = await taskService.getTaskByUser(req.user.id)
        res.status(200).json(tasks)
    } catch (error) {
        next(error)
    }
}

export const getAllTasks = async (req,res,next) => {
    try {
        const all = await taskService.getAllTasks()
        res.status(200).json(all)
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req,res,next) => {
    try {
        await taskService.deleteTask(Number(req.params.id))
        res.status(200).json({message: "Task Deleted Successfully"})
    } catch (error) {
        next(error)
    }
}
