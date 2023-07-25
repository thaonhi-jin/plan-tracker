import axios from 'axios'
import { useEffect, useState } from "react"

export const url = "http://localhost:1337/api/projects"


export const readData = (url) => axios.get(url)

export const useFetch = (url) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try {
                const res = await readData(url)
                setData(res.data.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }

        fetchData();
    }, [url])

    return { loading, data }
}

export const addProject = (newProject) => {
    let data = {
        "data": {
            ...newProject
        }
    }

    axios.post("http://localhost:1337/api/projects", data)
        .catch(err => console.log(err))
}

export const addTask = (newTask) => {
    let data = {
        "data": {
            ...newTask,
            isCompleted: false
        }
    }

    return axios.post("http://localhost:1337/api/tasks", data)
}

