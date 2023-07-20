import axios from 'axios'

export const readProjects = (url) => axios.get(url)
export const createProject = (url, newProject) => axios.post(url, newProject)