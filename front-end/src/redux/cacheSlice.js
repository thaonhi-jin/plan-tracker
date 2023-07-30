import { createSlice } from '@reduxjs/toolkit'

export const cacheSlice = createSlice({
    name: 'cache',
    initialState: { infoProjects: [], activeTasks: {}, openDashboard: false, allTasks: [] },
    reducers: {
        updateInfoList: (state, action) => {
            let projects = action.payload
            state.infoProjects = (projects || []).map((project) => {
                return {
                    ...project,
                    isActive: false,
                }
            })
        },
        addInfoProject: (state, action) => {
            let newProject = action.payload
            let activeProject = state.infoProjects.find((project) => project.isActive);
            activeProject.isActive = false
            state.infoProjects.push({
                ...newProject,
                isActive: false
            })

        },
        editInfoProject: (state, action) => {
            let updateProject = action.payload
            let activeProject = state.infoProjects.find((project) => project.isActive);
            activeProject.attributes = Object.assign(activeProject.attributes, updateProject.attributes);
        },
        deleteInfoProject: (state, action) => {
            let projectID = action.payload
            state.infoProjects = state.infoProjects.filter(project => project.id !== projectID)
            state.infoProjects[0].isActive = true
        },
        addTask: (state, action) => {
            let newTask = action.payload
            state.activeTasks.tasks.push(newTask)
        },
        editTask: (state, action) => {
            let updateTask = action.payload
            let selectedTask = state.activeTasks.tasks.find((task) => task.id === updateTask.id)
            selectedTask.attributes = Object.assign(selectedTask.attributes, updateTask.attributes)
        },
        deleteTask: (state, action) => {
            let taskID = action.payload
            state.activeTasks.tasks = state.activeTasks.tasks.filter(task => task.id !== taskID)
        },
        updateActiveTasks: (state, action) => {
            const project = action.payload
            state.activeTasks = {
                projectID: project.id,
                tasks: project.attributes.tasks.data
            }
        },
        setProjectActive: (state, action) => {
            let id = action.payload
            state.openDashboard = false
            state.infoProjects.map((project) => {
                project.id === id
                    ? (project.isActive = true)
                    : (project.isActive = false);
                return project;
            });
        },
        setOpenDashboard: (state, action) => {
            state.openDashboard = action.payload
        },
        updateAllTasks: (state, action) => {
            let tasks = action.payload
            state.allTasks = (tasks || []).map(task => {
                return {
                    id: task.id,
                    projectID: task.attributes.project.data.id,
                    attributes: {
                        name: task.attributes.name,
                        startDate: task.attributes.startDate,
                        endDate: task.attributes.endDate,
                        status: task.attributes.status,
                        isCompleted: task.attributes.isCompleted,
                    }

                }
            })
        },
        editTaskDashBoard: (state, action) => {
            let updateTask = action.payload
            let selectedTask = state.allTasks.find((task) => task.id === updateTask.id)
            selectedTask.attributes = Object.assign(selectedTask.attributes, updateTask.attributes)
        },
        editProjectDashBoard: (state, action) => {
            let updateProject = action.payload
            let selectedProject = state.infoProjects.find((project) => project.id === updateProject.id);
            selectedProject.attributes = Object.assign(selectedProject.attributes, updateProject.attributes);
        },
        deleteTaskDashBoard: (state, action) => {
            let taskID = action.payload
            state.allTasks = state.allTasks.filter(task => task.id !== taskID)
        }
    },
})


export const { updateInfoList, addInfoProject, editInfoProject, deleteInfoProject, setProjectActive, updateActiveTasks, addTask, editTask, deleteTask, setOpenDashboard, updateAllTasks, editTaskDashBoard, editProjectDashBoard, deleteTaskDashBoard } = cacheSlice.actions

export default cacheSlice.reducer