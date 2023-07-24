import { createSlice } from '@reduxjs/toolkit'

export const cacheSlice = createSlice({
    name: 'cache',
    initialState: { infoProjects: [], activeTasks: {}, updateStatus: false },
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
            state.infoProjects.push({
                ...newProject,
                isActive: true
            })
            activeProject.isActive = false
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
            state.infoProjects.map((project) => {
                project.id === id
                    ? (project.isActive = true)
                    : (project.isActive = false);
                return project;
            });
        },
        updateStatusNoti: (state) => {
            state.updateStatus = !state.updateStatus
        },
    },
})


export const { updateInfoList, addInfoProject, editInfoProject, deleteInfoProject, setProjectActive, updateActiveTasks, addTask, editTask, deleteTask, updateStatusNoti } = cacheSlice.actions

export default cacheSlice.reducer