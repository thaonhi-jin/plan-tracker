import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { updateInfoList, setOpenDashboard } from './redux/cacheSlice';
import Sidebar from "./components/SideBar";
import Project from "./components/projects/Project";
import Dashboard from "./components/dashboard/Dashboard";
import axios from "axios";
import { checkTaskStatus, checkProjectStatus } from "./redux/methods";


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();
  const infoProjects = useSelector((state) => state.cache.infoProjects);
  const activeProject = infoProjects.find((project) => project.isActive);
  const openDashboard = useSelector((state) => state.cache.openDashboard)
  console.log("here1")

  useEffect(() => {
    // console.log("check active")
    if (!activeProject && infoProjects.length > 0) {
      // console.log("set open Dashboard")
      dispatch(setOpenDashboard(true));
    }
  })

  // check all data
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
            if (!task.attributes.isCompleted && task.attributes.status !== taskStatus) {
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

  // update all data
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
            console.log("fetch all projects")
            setLoading(false)
          })
          .catch((err) => {
            console.log(err)
            setLoading(false)
          })
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      });
  }

  useEffect(() => {
    updateData()
    var now = new Date();
    var interval = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0) - now;

    if (interval < 0) {
      interval += 86400000; // it's after 10am, try 10am tomorrow.
    }
    console.log(interval)
    setTimeout(() => {
      updateData()
      console.log("update everyday!")
    }, interval);
  }, [])


  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true)

  //     try {
  //       const res = await readData(url)
  //       dispatch(updateInfoList(res.data.data))
  //       console.log("fetch all projects")
  //       setLoading(false)
  //     } catch (error) {
  //       console.log(error)
  //       setLoading(false)
  //     }
  //   }

  //   fetchData();
  // }, [])

  if (loading) return <p>Loading...</p>
  return (
    <div className="App" style={{ paddingLeft: "250px", boxSizing: "border-box" }}>
      {/* {console.log("here")} */}
      {activeProject && <Project />}
      {openDashboard && <Dashboard />}
      <Sidebar />
    </div>
  );
}

export default App;
