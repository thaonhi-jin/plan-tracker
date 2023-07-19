import { createSlice } from '@reduxjs/toolkit'
import data from '../data/data.json'

export const convertDate = (date) => {
    let d_arr = date.split("-");
    let newdate = d_arr[2] + '-' + d_arr[1] + '-' + d_arr[0];
    return newdate;
}
export const projectSlice = createSlice({
    name: 'projects',
    initialState: data.projects,
    reducers: {
        addProject: (state, action) => {
            const isActive = state.length > 0 ? false : true;
            const payload = action.payload;

            const project = {
                ...payload,
                isActive,
                tasks: [],
            };

            state.push(project);
        },
        editProject: (state, action) => {
            const payload = action.payload;
            let project = state.find((project) => project.isActive);
            project.title = payload.title
            project.description = payload.description
            project.deadlineTime = payload.deadlineTime
            project.deadlineDate = payload.deadlineDate
            project["start-date"] = payload["start-date"]
            project["end-date"] = payload["end-date"]

        },
        deleteProject: (state) => {
            const project = state.find((project) => project.isActive);
            state.splice(state.indexOf(project), 1);
        },
        setProjectActive: (state, action) => {
            state.map((project, index) => {
                index === action.payload.index
                    ? (project.isActive = true)
                    : (project.isActive = false);
                return project;
            });
        },
        addTask: (state, action) => {
            const payload = action.payload;
            const project = state.find((project) => project.isActive);
            const newTask = {
                ...payload.newTask,
                isCompleted: false,
                subtasks: [...payload.subtasks]
            }
            project.tasks.push(newTask)
        },
        editTask: (state, action) => {
            const payload = action.payload;
            // console.log(payload)
            const project = state.find((project) => project.isActive);
            const col = project.tasks.filter((task) => task.status === payload.taskStatus)
            const task = col.find((task, i) => i === payload.taskIndex); //taskIndex theo cột status
            task.name = payload.updateTask.name
            task["start-date"] = payload.updateTask["start-date"]
            task["end-date"] = payload.updateTask["end-date"]
            task.subtasks = payload.updateSubtasks
        },
        deleteTask: (state, action) => {
            const project = state.find((project) => project.isActive);
            // project.tasks.splice(project.tasks.indexOf(payload.task), 1)
            const selectedTask = JSON.stringify(action.payload)
            project.tasks = project.tasks.filter((task) => JSON.stringify(task) !== selectedTask)
        },
        setTaskCompleted: (state, action) => {
            // taskIndex thực theo tasks of project
            const index = action.payload
            const project = state.find((project) => project.isActive);
            project.tasks[index].isCompleted = !project.tasks[index].isCompleted

        },

        setTaskStatus: (state, action) => {
            const { index, newStatus } = action.payload
            const project = state.find((project) => project.isActive);
            project.tasks[index].status = newStatus

        },
        setClickTaskCompleted: (state, action) => {
            // set isCompleted tasks without subtask
            const payload = action.payload;
            const project = state.find((project) => project.isActive);
            const col = project.tasks.filter((task) => task.status === payload.taskStatus)
            const selectedTask = col.find((task, i) => i === payload.taskIndex); //taskIndex theo cột status
            selectedTask.isCompleted = !selectedTask.isCompleted
        },
        setSubtaskCompleted: (state, action) => {
            const payload = action.payload;
            const project = state.find((project) => project.isActive);
            const col = project.tasks.filter((task) => task.status === payload.statusTask)
            const task = col.find((task, i) => i === payload.taskIndex);
            const subtask = task.subtasks.find((sub, i) => i === payload.index);
            subtask.isCompleted = !subtask.isCompleted;
        },

    },
})


export const { addProject, editProject, deleteProject, addTask, editTask, deleteTask, setTaskCompleted, setTaskStatus, setClickTaskCompleted, setProjectActive, setSubtaskCompleted } = projectSlice.actions

export default projectSlice.reducer