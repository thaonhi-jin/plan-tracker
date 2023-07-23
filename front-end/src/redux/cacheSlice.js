import { createSlice } from '@reduxjs/toolkit'

export const cacheSlice = createSlice({
    name: 'cache',
    initialState: { infoProjects: [], activeTasks: {}, update: false },
    reducers: {
        updateInfoList: (state, action) => {
            let projects = action.payload
            state.infoProjects = (projects || []).map((project) => {
                return {
                    ...project,
                    isActive: false
                }
            })
        },
        updateActiveTasks: (state, action) => {
            const project = action.payload
            state.activeTasks = {
                projectID: project.id,
                tasks: project.attributes.tasks.data
            }
        },
        addNewInfo: (state, action) => {
            let newProject = action.payload
            state.infoProjects.push({
                id: newProject.id,
                title: newProject.attributes.title,
                isActive: true
            })
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
        setUpdateNoti: (state) => {
            state.update = !state.update
        }
    },
})


export const { updateInfoList, addNewInfo, setProjectActive, updateActiveTasks, setUpdateNoti } = cacheSlice.actions

export default cacheSlice.reducer