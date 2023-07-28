
export const checkAllTasksCompleted = (tasks) => {
    if (tasks.length === 0) return false;
    let isCompleted = true;
    tasks.forEach((task) => {
        if (!task.attributes.isCompleted) isCompleted = false;
    });
    return isCompleted;
};

// check Project status
const projectStatus = [
    "Not started",
    "In Progress",
    "Deadline is coming",
    "It's overdue",
    "Completed",
];

export const checkProjectStatus = (startDate, endDate, deadline, tasks) => {
    if (checkAllTasksCompleted(tasks)) {
        return projectStatus[4];
    } else {
        let start = new Date(startDate);
        let end = new Date(endDate);
        let dl = new Date(deadline);
        let date = new Date().toISOString().slice(0, 10)
        let today = new Date(date);
        if (today < start) return projectStatus[0];
        else if (start <= today && today <= end) return projectStatus[1];
        else if (end < today && today <= dl) return projectStatus[2];
        else if (dl < today) return projectStatus[3];
    }
};

const taskStatus = ["Not Started", "In Progress", "Overdue", "Completed"];

export const checkTaskStatus = (task) => {
    let start = new Date(task.attributes.startDate);
    let end = new Date(task.attributes.endDate);
    let date = new Date().toISOString().slice(0, 10)
    let today = new Date(date);
    // ở đây chỉ check các trường hợp chưa completed
    if (today < start) return taskStatus[0];
    else if (start <= today && today <= end) return taskStatus[1];
    else if (end < today) return taskStatus[2];
};

// methods in Dashboard
export const ProjectsCount = (projects, status) => {
    if (projects.length === 0) return 0;
    let count = 0;
    projects.forEach((project) => {
        if (project.attributes.status === status) count++;
    })
    return count
}

export const daysleftCount = (date) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(date);
    const today = new Date().toISOString().slice(0, 10)
    const secondDate = new Date(today);

    return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

export const WarningProjectsFilter = (projects) => {
    if (projects.length === 0) return [];
    return projects.filter(project => project.attributes.status === "Deadline is coming")
}

export const EarlierToday = (date) => {
    const today = new Date().toISOString().slice(0, 10)
    const date1 = new Date(date)
    const date2 = new Date(today)
    return date1 < date2
}

export const LaterToday = (date) => {
    const today = new Date().toISOString().slice(0, 10)
    const date1 = new Date(date)
    const date2 = new Date(today)
    return date1 > date2
}
