import { useEffect, useState } from "react"
import axios from "axios";
import { checkTaskStatus, checkProjectStatus } from "../redux/methods";

const checkAllStatus = (projects) => {
    if (projects.length > 0) {
        projects.forEach((project) => {
            let tasks = project.attributes.tasks.data;
            let newStatus = checkProjectStatus(
                project.attributes.startDate,
                project.attributes.endDate,
                project.attributes.deadline,
                tasks
            )
            if (project.attributes.status !== newStatus) {
                let updateProject = {
                    data: {
                        ...project.attributes,
                        status: newStatus,
                    },
                };
                axios
                    .put(
                        `http://localhost:1337/api/projects/${project.id}`,
                        updateProject
                    )
                    .catch((err) => console.log(err));
            }

            if (tasks.length > 0) {
                tasks.forEach(task => {
                    let taskStatus = checkTaskStatus(task)
                    if (!task.attributes.isCompleted && task.attributes.status != taskStatus) {
                        let updateTask = {
                            data: {
                                ...task.attributes,
                                status: taskStatus === "Overdue" ? "In Progress" : taskStatus,
                            },
                        };
                        axios
                            .put(`http://localhost:1337/api/tasks/${task.id}`, updateTask)
                            .catch((err) => console.log(err));
                    }
                })
            }
        });
    }
};

export const updateDailyAll = () => {

};

// function surprise(checkAll) {
//     (function loop() {
//         var now = new Date();
//         if (
//             now.getDate() === 12 &&
//             now.getHours() === 12 &&
//             now.getMinutes() === 0
//         ) {
//             checkAll();
//         }
//         now = new Date(); // allow for time passing
//         var delay = 60000 - (now % 60000); // exact ms to next minute interval
//         setTimeout(loop, delay);
//     })();
// }


const useUpdate = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const updateData = () => {
            setLoading(true)
            axios
                .get("http://localhost:1337/api/projects?populate=*")
                .then((res) => {
                    var projects = res.data.data;
                    checkAllStatus(projects);
                })
                .then(() => {
                    axios.get("http://localhost:1337/api/projects")
                        .then((res) => {
                            dispatch(updateInfoList(res.data.data))
                            setLoading(false)
                        })
                })
                .catch((err) => {
                    console.log(err)
                    setLoading(false)
                });
        }

        var now = new Date();
        var interval = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0) - now;
        console.log(interval)
        if (interval < 0) {
            interval += 86400000; // it's after 10am, try 10am tomorrow.
        }
        setTimeout(() => { updateData() }, interval);

    }, [])

    return { loading, error }
}

export default useUpdate