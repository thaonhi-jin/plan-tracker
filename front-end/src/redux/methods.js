export const checkAllTasksCompleted = (tasks) => {
    let isCompleted = true;
    (tasks || []).forEach((task) => {
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

export const checkProjectStatus = (activeProject, activeTasks) => {
    if (checkAllTasksCompleted(activeTasks.tasks)) {
        return projectStatus[4];
    } else {
        let start = new Date(activeProject.attributes.startDate);
        let end = new Date(activeProject.attributes.endDate);
        let deadline = new Date(activeProject.attributes.deadline);
        let today = new Date();
        if (today < start) return projectStatus[0];
        else if (start <= today && today < end) return projectStatus[1];
        else if (end <= today && today <= deadline) return projectStatus[2];
        else if (deadline < today) return projectStatus[3];
    }
};

const taskStatus = ["Not Started", "In Progress", "Overdue", "Completed"]

export const checkTaskStatus = (task) => {
    let start = new Date(task.attributes.startDate);
    let end = new Date(task.attributes.endDate);
    let today = new Date();
    // ở đây chỉ check các trường hợp chưa completed
    if (today < start) return taskStatus[0]
    else if (start <= today && today <= end) return taskStatus[1]
    else if (end < today) return taskStatus[2]
}